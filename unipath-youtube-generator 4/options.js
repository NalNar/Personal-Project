// Uses UNIPATH and UNIPATH_GEN
const { uid, sortForPath, secondsToHMS, download, slugify } = UNIPATH;
const G = UNIPATH_GEN;

let courses = {};
const app = document.getElementById('app');

init();
async function init(){ await load(); render(); }
async function load(){ const data = await chrome.storage.local.get(['unipath_courses']); courses = data.unipath_courses || {}; }
async function save(){ await chrome.storage.local.set({ unipath_courses: courses }); }

function render(){
  app.innerHTML = '';

  // API key row
  const apiRow = el('section','card');
  const apiIn = el('input'); apiIn.placeholder = 'YouTube Data API key (optional, expands playlists)';
  G.getApiKey().then(k=> apiIn.value = k);
  const saveKey = el('button','btn','Save API Key'); saveKey.addEventListener('click', async ()=> { await G.saveApiKey(apiIn.value); saveKey.textContent='Saved ✓'; setTimeout(()=> saveKey.textContent='Save API Key', 1400); });
  apiRow.append(el('h3', null, 'YouTube API (optional)'), apiIn, saveKey);
  app.appendChild(apiRow);

  // Major picker
  const gen = el('section','card');
  gen.appendChild(el('h2', null, 'Generate by Major'));
  const majors = G.listMajors();
  const pick = el('select'); pick.size = 10; pick.style.width = '100%';
  majors.forEach(m => {
    const opt = el('option'); opt.value = m.name; opt.textContent = m.name; pick.appendChild(opt);
  });
  const row = el('div','row');
  const genBtn = el('button','btn primary','Generate Course from Selected Major');
  genBtn.addEventListener('click', ()=> doGenerate(pick.value));
  const exportAll = el('button','btn','Export All Courses (JSON)');
  exportAll.addEventListener('click', ()=> {
    const plain = JSON.stringify(courses, null, 2);
    download('unipath-courses.json', plain);
  });
  row.append(genBtn, exportAll);
  gen.appendChild(pick);
  gen.appendChild(row);
  gen.appendChild(el('div','muted','Tip: Hold Ctrl/⌘ to select, then click Generate.'));
  app.appendChild(gen);

  // Existing courses
  const keys = Object.keys(courses);
  if (!keys.length) {
    app.appendChild(el('div','muted','No courses yet. Generate one above or add videos from a YouTube watch page.'));
  } else {
    keys.forEach(id => app.appendChild(renderCourse(courses[id])));
  }
}

async function doGenerate(name){
  if (!name) return;
  const spinner = el('div','muted','Generating…'); app.insertBefore(spinner, app.children[2] || null);
  try {
    const draft = await G.generateForMajor(name);
    const id = uid('course');
    courses[id] = { id, title: draft.title, description: draft.description, createdAt: Date.now(), modules: draft.modules };
    await save(); render();
  } catch(e){
    alert('Generation failed. Try again or add an API key in Options.');
  } finally {
    spinner.remove();
  }
}

function renderCourse(course){
  const wrap = el('section','card');
  wrap.appendChild(el('h2',null,course.title));

  const desc = el('textarea'); desc.value = course.description || ''; desc.placeholder = 'Course description (optional)';
  desc.addEventListener('change', async ()=>{ course.description = desc.value; await save(); });
  wrap.appendChild(desc);

  const list = el('div','moduleList');
  course.modules.forEach((m, idx)=> list.appendChild(renderModule(course,m,idx)));
  wrap.appendChild(list);

  const addMod = el('button','btn','+ Add Module');
  addMod.addEventListener('click', async ()=>{ course.modules.push({ id: uid('mod'), title: `Module ${course.modules.length+1}`, lessons: [] }); await save(); render(); });

  const row = el('div','row');
  const auto = el('button','btn','Auto‑Arrange Lessons'); auto.addEventListener('click', async ()=>{ autoArrange(course); await save(); render(); });
  const expJ = el('button','btn','Export JSON'); expJ.addEventListener('click', ()=> exportJSON(course));
  const expM = el('button','btn primary','Export Markdown'); expM.addEventListener('click', ()=> exportMarkdown(course));
  row.append(addMod, auto, expJ, expM);
  wrap.appendChild(row);
  return wrap;
}

function renderModule(course, mod, idx){
  const box = el('div','module');
  const head = el('div','row between');

  const title = el('input'); title.value = mod.title || `Module ${idx+1}`;
  title.addEventListener('change', async ()=>{ mod.title = title.value; await save(); });

  const up = el('button','btn sm','↑'); up.addEventListener('click', async ()=>{ if (idx<=0) return; const a=course.modules; [a[idx-1],a[idx]]=[a[idx],a[idx-1]]; await save(); render(); });
  const down = el('button','btn sm','↓'); down.addEventListener('click', async ()=>{ const a=course.modules; if (idx>=a.length-1) return; [a[idx+1],a[idx]]=[a[idx],a[idx+1]]; await save(); render(); });
  const del = el('button','btn sm danger','✕'); del.addEventListener('click', async ()=>{ course.modules = course.modules.filter(m => m.id!==mod.id); await save(); render(); });

  head.append(title, el('div'), up, down, del); box.appendChild(head);

  const lessons = el('div','lessonList'); mod.lessons.forEach((lesson,i)=> lessons.appendChild(renderLesson(course,mod,lesson,i)));
  box.appendChild(lessons);
  return box;
}

function renderLesson(course, mod, lesson, idx){
  const row = el('div','lesson');
  const left = el('div','lessonMeta');
  const thumb = el('div','thumb sm'); if (lesson.videoId) thumb.style.backgroundImage = `url(https://i.ytimg.com/vi/${lesson.videoId}/hqdefault.jpg)`;
  const title = el('a'); title.href = lesson.url || '#'; title.target = '_blank'; title.textContent = lesson.title || '(untitled)';
  const sub = el('div','muted'); const dur = secondsToHMS(lesson.durationSeconds || 0);
  sub.textContent = `${lesson.channel || ''}${dur ? ' • ' + dur : ''}`;
  left.append(thumb, el('div','stack', null, [title, sub]));

  const right = el('div','row');
  const up = el('button','btn sm','↑'); up.addEventListener('click', async ()=>{ if (idx<=0) return; const a=mod.lessons; [a[idx-1],a[idx]]=[a[idx],a[idx-1]]; await save(); render(); });
  const down = el('button','btn sm','↓'); down.addEventListener('click', async ()=>{ const a=mod.lessons; if (idx>=a.length-1) return; [a[idx+1],a[idx]]=[a[idx],a[idx+1]]; await save(); render(); });
  const del = el('button','btn sm danger','✕'); del.addEventListener('click', async ()=>{ mod.lessons = mod.lessons.filter(l=>l!==lesson); await save(); render(); });
  right.append(up, down, del);

  row.append(left, right);

  const objArea = el('textarea','obj'); objArea.placeholder = 'Learning objectives (one per line)';
  objArea.value = (lesson.objectives || []).join('\n');
  objArea.addEventListener('change', async ()=>{ lesson.objectives = objArea.value.split(/\n+/).map(s=>s.trim()).filter(Boolean); await save(); });
  row.appendChild(objArea);

  return row;
}

function autoArrange(course){
  const all=[]; course.modules.forEach(m=> m.lessons.forEach(l=> all.push({...l})));
  const sorted = sortForPath(all);
  const size = 5; const newMods = [];
  for (let i=0;i<sorted.length;i+=size) newMods.push({ id: uid('mod'), title: `Module ${newMods.length+1}`, lessons: sorted.slice(i,i+size) });
  course.modules = newMods;
}

function exportJSON(course){ const plain = JSON.stringify(course,null,2); download(`${slugify(course.title||'course')}.json`, plain); }
function exportMarkdown(course){
  const lines = [];
  lines.push(`# ${course.title || 'Course'}`);
  if (course.description) lines.push(`\n${course.description}\n`);
  course.modules.forEach((m, idx)=>{
    lines.push(`\n## Module ${idx+1}: ${m.title || ''}`);
    m.lessons.forEach((l, i)=>{
      const dur = secondsToHMS(l.durationSeconds || 0);
      lines.push(`\n**${idx+1}.${i+1} ${l.title}** ${dur?`(${dur})`:''}`);
      lines.push(`\nLink: ${l.url || ''}`);
      if (l.objectives?.length){ lines.push(`\nObjectives:`); l.objectives.forEach(o=> lines.push(`- ${o}`)); }
    });
  });
  download(`${slugify(course.title||'course')}.md`, lines.join('\n'));
}

function el(tag, cls, text, children){
  const x = document.createElement(tag);
  if (cls) x.className = cls;
  if (text) x.textContent = text;
  if (children) children.forEach(c=> x.appendChild(c));
  return x;
}
