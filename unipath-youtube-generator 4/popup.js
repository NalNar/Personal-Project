// Uses UNIPATH global
const { uid, secondsToHMS, escapeHtml } = UNIPATH;

const els = {
  videoBox: document.getElementById('videoBox'),
  courseSelect: document.getElementById('courseSelect'),
  newCourseTitle: document.getElementById('newCourseTitle'),
  newCourseDesc: document.getElementById('newCourseDesc'),
  moduleTitle: document.getElementById('moduleTitle'),
  lessonObjectives: document.getElementById('lessonObjectives'),
  addBtn: document.getElementById('addBtn'),
  manage: document.getElementById('manage')
};

let currentVideo = null;
let courses = {};

init();

async function init() {
  els.manage.addEventListener('click', openOptions);
  els.addBtn.addEventListener('click', addVideoToCourse);

  await loadCourses();
  await loadCurrentVideo();
  renderCourseSelect();
}

async function loadCourses() {
  const data = await chrome.storage.local.get(['unipath_courses']);
  courses = data.unipath_courses || {};
}

async function loadCurrentVideo() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  let resp = null;
  try { resp = await chrome.tabs.sendMessage(tab.id, { type: 'GET_VIDEO_METADATA' }); }
  catch (e) { resp = await chrome.runtime.sendMessage({ type: 'GET_RECENT_VIDEO' }); }
  currentVideo = resp?.video || null;
  renderVideoBox();
}

function renderVideoBox() {
  if (!currentVideo) {
    els.videoBox.innerHTML = '<div class="muted">Open a YouTube watch page to capture a video.</div>';
    return;
  }
  const d = secondsToHMS(currentVideo.durationSeconds || 0);
  els.videoBox.innerHTML = `
    <div class="videoRow">
      <div class="thumb" style="background-image:url(https://i.ytimg.com/vi/${currentVideo.videoId}/hqdefault.jpg)"></div>
      <div class="meta">
        <div class="vtitle">${escapeHtml(currentVideo.title || '')}</div>
        <div class="vsub">${escapeHtml(currentVideo.channel || '')}${d ? ' • ' + d : ''}</div>
        <a href="${currentVideo.url}" target="_blank">Open</a>
      </div>
    </div>`;
}

function renderCourseSelect() {
  els.courseSelect.innerHTML = '';
  const optNone = document.createElement('option'); optNone.value = ''; optNone.textContent = '— Select existing —';
  els.courseSelect.appendChild(optNone);
  Object.values(courses).forEach(c => {
    const o = document.createElement('option'); o.value = c.id; o.textContent = c.title;
    els.courseSelect.appendChild(o);
  });
}

async function addVideoToCourse() {
  if (!currentVideo) return;

  let course = null;
  const existingId = els.courseSelect.value;
  if (existingId) course = courses[existingId];
  else {
    const title = (els.newCourseTitle.value || '').trim();
    if (!title) { notify('Enter a new course title or select an existing course.'); return; }
    course = { id: uid('course'), title, description: (els.newCourseDesc.value || '').trim(), createdAt: Date.now(), modules: [] };
    courses[course.id] = course;
  }

  let modTitle = (els.moduleTitle.value || '').trim(); if (!modTitle) modTitle = 'Module 1';
  let module = course.modules.find(m => m.title.toLowerCase() === modTitle.toLowerCase());
  if (!module) { module = { id: uid('mod'), title: modTitle, lessons: [] }; course.modules.push(module); }

  const objectives = (els.lessonObjectives.value || '').split(/[\n,•-]+/).map(s => s.trim()).filter(Boolean);
  const lesson = {
    id: uid('lesson'),
    videoId: currentVideo.videoId,
    title: currentVideo.title,
    channel: currentVideo.channel,
    url: currentVideo.url,
    durationSeconds: currentVideo.durationSeconds,
    chapters: currentVideo.chapters || [],
    objectives
  };
  module.lessons.push(lesson);
  await chrome.storage.local.set({ unipath_courses: courses });

  notify('Added to course ✓');
  els.newCourseTitle.value = ''; els.newCourseDesc.value = ''; els.moduleTitle.value = ''; els.lessonObjectives.value = '';
  renderCourseSelect();
}

function openOptions(e){ e.preventDefault(); chrome.runtime.openOptionsPage(); }
function notify(msg){ els.addBtn.textContent = msg; setTimeout(() => (els.addBtn.textContent = 'Add Video'), 1400); }
