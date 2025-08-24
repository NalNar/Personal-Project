// v0.5.0 Majors pick‑list + templates + combined majors support
(function(){
  const G = {};

  // ---- Templates by category ----
  // Each template has modules with query strings. The generator will search for playlists matching queries.
  const TEMPLATES = {
    cs: {
      title: "Computer Science (Undergraduate Path)",
      modules: [
        ["Intro to CS / Programming", ["CS50 full course", "intro to computer science course playlist", "programming fundamentals university lectures"]],
        ["Discrete Mathematics", ["discrete mathematics course playlist", "discrete math lectures university"]],
        ["Data Structures", ["data structures course playlist", "mit 6.006 playlist", "data structures full course"]],
        ["Algorithms", ["algorithms course playlist", "algorithm design lectures", "mit 6.046 playlist"]],
        ["Computer Systems", ["computer systems course playlist", "csapp lecture playlist", "intro to computer systems university"]],
        ["Operating Systems", ["operating systems course playlist", "os lectures university playlist", "mit 6.828 lectures playlist"]],
        ["Computer Networks", ["computer networks course playlist", "networking lectures university", "stanford cs144 playlist"]],
        ["Databases", ["databases course playlist", "database systems lectures", "cmu 15-445 playlist"]],
        ["Programming Languages / Compilers", ["programming languages course playlist", "compilers course playlist", "stanford compilers lectures"]],
        ["Software Engineering", ["software engineering course playlist", "se lectures university"]],
        ["Theory of Computation", ["theory of computation course playlist", "automata theory lectures", "computability course playlist"]],
        ["Artificial Intelligence", ["artificial intelligence course playlist", "ai lectures university", "mit 6.034 playlist"]],
        ["Machine Learning", ["machine learning course playlist", "ml lectures university", "cs229 playlist"]]
      ]
    },
    math: {
      title: "Mathematics (Undergraduate Path)",
      modules: [
        ["Calculus I (Single Variable)", ["calculus 1 course playlist", "single variable calculus full course"]],
        ["Calculus II (Integration & Series)", ["calculus 2 course playlist", "integral calculus series playlist"]],
        ["Calculus III (Multivariable)", ["multivariable calculus course playlist", "vector calculus full course"]],
        ["Linear Algebra", ["linear algebra course playlist", "mit 18.06 playlist", "intro linear algebra lectures"]],
        ["Differential Equations", ["differential equations course playlist", "ode course playlist"]],
        ["Discrete Mathematics", ["discrete mathematics course playlist", "discrete math lectures university"]],
        ["Real Analysis", ["real analysis course playlist", "advanced calculus rigorous playlist"]],
        ["Abstract Algebra", ["abstract algebra course playlist", "group theory ring theory lectures"]],
        ["Probability & Statistics", ["probability theory course playlist", "mathematical statistics course playlist"]],
        ["Numerical Analysis", ["numerical analysis course playlist", "scientific computing lectures"]],
        ["Topology (Intro)", ["topology course playlist", "point set topology lectures"]]
      ]
    },
    linguistics: {
      title: "Linguistics (Undergraduate Path)",
      modules: [
        ["Intro to Linguistics", ["intro to linguistics course playlist", "linguistics 101 lectures"]],
        ["Phonetics", ["phonetics course playlist", "speech sounds phonetics lectures"]],
        ["Phonology", ["phonology course playlist", "phonological theory lectures"]],
        ["Morphology", ["morphology course playlist", "word formation morphology lectures"]],
        ["Syntax", ["syntax course playlist", "generative syntax lectures"]],
        ["Semantics", ["semantics course playlist", "formal semantics lectures"]],
        ["Pragmatics", ["pragmatics course playlist", "language pragmatics lectures"]],
        ["Sociolinguistics", ["sociolinguistics course playlist", "language and society lectures"]],
        ["Psycholinguistics", ["psycholinguistics course playlist", "language processing lectures"]],
        ["Computational Linguistics", ["computational linguistics course playlist", "nlp lectures university"]]
      ]
    },
    biology: {
      title: "Biology (Undergraduate Path)",
      modules: [
        ["Intro Biology I (Cell & Molecular)", ["intro biology cell molecular course playlist", "cell biology university lectures"]],
        ["Intro Biology II (Organismal & Ecology)", ["intro biology organismal ecology course playlist", "biology 2 lectures"]],
        ["Genetics", ["genetics course playlist", "mendelian molecular genetics lectures"]],
        ["Biochemistry", ["biochemistry course playlist", "biochem lectures university"]],
        ["Cell Biology", ["cell biology course playlist", "molecular cell biology lectures"]],
        ["Microbiology", ["microbiology course playlist", "microbial biology lectures"]],
        ["Physiology", ["human physiology course playlist", "animal physiology lectures"]],
        ["Ecology", ["ecology course playlist", "ecosystems ecology lectures"]],
        ["Evolutionary Biology", ["evolutionary biology course playlist", "evolution lectures university"]],
        ["Developmental Biology", ["developmental biology course playlist", "embryology lectures"]]
      ]
    },
    chemistry: {
      title: "Chemistry (Undergraduate Path)",
      modules: [
        ["General Chemistry I", ["general chemistry 1 course playlist", "chemistry 101 lectures playlist"]],
        ["General Chemistry II", ["general chemistry 2 course playlist", "chem 102 lectures playlist"]],
        ["Organic Chemistry I", ["organic chemistry 1 course playlist", "ochem 1 lectures"]],
        ["Organic Chemistry II", ["organic chemistry 2 course playlist", "ochem 2 lectures"]],
        ["Physical Chemistry", ["physical chemistry course playlist", "thermodynamics kinetics quantum chemistry lectures"]],
        ["Analytical Chemistry", ["analytical chemistry course playlist", "instrumental analysis lectures"]],
        ["Inorganic Chemistry", ["inorganic chemistry course playlist", "coordination chemistry lectures"]],
        ["Biochemistry (Chem Track)", ["biochemistry course playlist", "biochem lectures university"]]
      ]
    },
    physics: {
      title: "Physics (Undergraduate Path)",
      modules: [
        ["Classical Mechanics", ["classical mechanics course playlist", "newtonian mechanics lectures", "mit 8.01 playlist"]],
        ["Electricity & Magnetism", ["electricity and magnetism course playlist", "mit 8.02 playlist"]],
        ["Waves & Optics", ["waves and optics course playlist"]],
        ["Thermodynamics & Statistical Physics", ["thermodynamics statistical mechanics course playlist"]],
        ["Modern Physics / Quantum", ["modern physics course playlist", "intro quantum mechanics course playlist"]],
        ["Advanced Lab / Experimental", ["advanced physics lab course playlist", "experimental physics lectures"]]
      ]
    },
    economics: {
      title: "Economics (Undergraduate Path)",
      modules: [
        ["Intro Microeconomics", ["microeconomics course playlist", "principles of microeconomics lectures"]],
        ["Intro Macroeconomics", ["macroeconomics course playlist", "principles of macroeconomics lectures"]],
        ["Statistics for Economists", ["statistics for economics course playlist", "intro statistics course playlist"]],
        ["Econometrics", ["econometrics course playlist", "intro econometrics lectures"]],
        ["Game Theory", ["game theory course playlist", "game theory economics lectures"]],
        ["International Economics", ["international economics course playlist", "trade macro international finance lectures"]],
        ["Development / Public / Labor (choose one)", ["development economics course playlist", "public economics course playlist", "labor economics course playlist"]]
      ]
    },
    psychology: {
      title: "Psychology (Undergraduate Path)",
      modules: [
        ["Intro to Psychology", ["introduction to psychology course playlist", "psychology 101 lectures"]],
        ["Research Methods", ["research methods in psychology course playlist"]],
        ["Statistics for Psychology", ["statistics for psychology course playlist"]],
        ["Biopsychology / Neuroscience", ["biopsychology course playlist", "behavioral neuroscience lectures"]],
        ["Cognitive Psychology", ["cognitive psychology course playlist"]],
        ["Developmental Psychology", ["developmental psychology course playlist"]],
        ["Social Psychology", ["social psychology course playlist"]],
        ["Clinical / Abnormal", ["abnormal psychology course playlist", "clinical psychology lectures"]]
      ]
    },
    sociology: {
      title: "Sociology (Undergraduate Path)",
      modules: [
        ["Intro to Sociology", ["intro to sociology course playlist", "sociology 101 lectures"]],
        ["Research Methods", ["sociological research methods course playlist"]],
        ["Social Theory", ["classical sociological theory course playlist", "modern sociological theory lectures"]],
        ["Stratification & Inequality", ["social stratification course playlist"]],
        ["Race, Class, Gender", ["race class gender sociology course playlist"]],
        ["Urban / Global Sociology", ["urban sociology course playlist", "global sociology lectures"]]
      ]
    },
    political_science: {
      title: "Politics / Political Science (Undergraduate Path)",
      modules: [
        ["Intro to Political Science", ["intro to political science course playlist"]],
        ["Comparative Politics", ["comparative politics course playlist"]],
        ["International Relations", ["international relations course playlist"]],
        ["Political Theory", ["political theory course playlist"]],
        ["American Politics (or your region)", ["american politics course playlist", "government and politics lectures"]],
        ["Public Policy / Methods", ["public policy analysis course playlist", "quantitative methods political science playlist"]]
      ]
    },
    philosophy: {
      title: "Philosophy (Undergraduate Path)",
      modules: [
        ["Intro to Philosophy", ["intro to philosophy course playlist"]],
        ["Ancient Philosophy", ["ancient philosophy course playlist", "plato aristotle lectures"]],
        ["Modern Philosophy", ["modern philosophy course playlist", "descartes hume kant lectures"]],
        ["Ethics", ["ethics course playlist", "moral philosophy lectures"]],
        ["Epistemology", ["epistemology course playlist"]],
        ["Metaphysics / Logic", ["metaphysics course playlist", "symbolic logic course playlist"]]
      ]
    },
    history: {
      title: "History (Undergraduate Path)",
      modules: [
        ["Historical Methods", ["historical methods course playlist", "how to do history lectures"]],
        ["Ancient / Classical", ["ancient history course playlist", "classical history lectures"]],
        ["Medieval / Renaissance", ["medieval history course playlist", "renaissance history lectures"]],
        ["Early Modern / Modern", ["modern history course playlist", "19th 20th century history lectures"]],
        ["Thematic / Regional", ["world history course playlist", "american history course playlist", "european history course playlist"]]
      ]
    },
    art_history: {
      title: "Art History (Undergraduate Path)",
      modules: [
        ["Foundations of Art History", ["intro to art history course playlist"]],
        ["Ancient to Medieval", ["ancient art history course playlist", "medieval art lectures"]],
        ["Renaissance to Baroque", ["renaissance art history playlist", "baroque art lectures"]],
        ["Modern & Contemporary", ["modern art history course playlist", "contemporary art lectures"]],
        ["Methods & Criticism", ["art criticism theory course playlist"]]
      ]
    },
    cinema: {
      title: "Cinema / Film Studies (Undergraduate Path)",
      modules: [
        ["Intro to Film Studies", ["intro to film studies course playlist"]],
        ["Film History", ["film history course playlist"]],
        ["Film Theory & Criticism", ["film theory course playlist"]],
        ["World Cinema", ["world cinema course playlist"]],
        ["Genre Studies", ["film genre studies course playlist"]]
      ]
    },
    music: {
      title: "Music (Undergraduate Path)",
      modules: [
        ["Music Theory I", ["music theory 1 course playlist"]],
        ["Music Theory II", ["music theory 2 course playlist"]],
        ["Music History", ["music history course playlist"]],
        ["Aural Skills / Ear Training", ["ear training course playlist", "aural skills lectures"]],
        ["Composition / Analysis", ["music composition course playlist", "music analysis playlist"]]
      ]
    },
    english: {
      title: "English (Undergraduate Path)",
      modules: [
        ["Intro to Literary Studies", ["intro to literary studies course playlist"]],
        ["Literary Theory & Criticism", ["literary theory course playlist"]],
        ["Shakespeare & Early Literature", ["shakespeare course playlist", "british literature survey playlist"]],
        ["American / World Literature", ["american literature survey playlist", "world literature course playlist"]],
        ["Writing Workshop / Rhetoric", ["academic writing rhetoric course playlist"]]
      ]
    },
    anthropology: {
      title: "Anthropology (Undergraduate Path)",
      modules: [
        ["Intro to Anthropology", ["intro to anthropology course playlist", "anthropology 101 lectures"]],
        ["Cultural Anthropology", ["cultural anthropology course playlist"]],
        ["Biological Anthropology", ["biological anthropology course playlist"]],
        ["Archaeology", ["archaeology course playlist"]],
        ["Linguistic Anthropology", ["linguistic anthropology course playlist"]],
        ["Methods / Ethnography", ["ethnographic methods course playlist"]]
      ]
    },
    classics: {
      title: "Classics / Classical Civilization (Undergraduate Path)",
      modules: [
        ["Intro to Classics", ["intro to classics course playlist", "classical civilization course playlist"]],
        ["Greek History & Literature", ["greek history course playlist", "greek literature lectures"]],
        ["Roman History & Literature", ["roman history course playlist", "roman literature lectures"]],
        ["Ancient Philosophy / Thought", ["ancient philosophy course playlist"]],
        ["Art & Archaeology of the Classical World", ["classical archaeology course playlist"]]
      ]
    },
    languages: {
      title: "Language & Linguistics (Undergraduate Path)",
      // For specific languages (French, German, Spanish, Italian, Russian, Hebrew)
      modules: [
        ["Language I (Beginner)", ["{lang} beginner course playlist", "{lang} 101 course playlist"]],
        ["Language II (Elementary)", ["{lang} elementary course playlist"]],
        ["Language III (Intermediate)", ["{lang} intermediate course playlist"]],
        ["Language IV (Advanced)", ["{lang} advanced course playlist"]],
        ["Linguistics / Literature", ["{lang} literature course playlist", "{lang} linguistics course playlist"]]
      ]
    },
    public_health: {
      title: "Global Public Health (Undergraduate Path)",
      modules: [
        ["Intro to Public Health", ["intro to public health course playlist"]],
        ["Epidemiology", ["epidemiology course playlist", "intro epidemiology lectures"]],
        ["Biostatistics", ["biostatistics course playlist"]],
        ["Health Policy & Management", ["health policy management course playlist"]],
        ["Global Health", ["global health course playlist"]]
      ]
    },
    data_science: {
      title: "Data Science (Undergraduate Path)",
      modules: [
        ["Programming for DS (Python/R)", ["python for data science course playlist", "r for data science course playlist"]],
        ["Linear Algebra for DS", ["linear algebra course playlist", "mit 18.06 playlist"]],
        ["Statistics & Probability", ["probability statistics course playlist"]],
        ["Machine Learning", ["machine learning course playlist", "intro ml playlist"]],
        ["Data Wrangling & Visualization", ["data wrangling course playlist", "data visualization course playlist"]]
      ]
    },
    engineering: {
      title: "Engineering (Undergraduate Core)",
      modules: [
        ["Math Core", ["engineering calculus course playlist", "multivariable calculus course playlist", "linear algebra course playlist"]],
        ["Physics Core", ["physics for engineers mechanics playlist", "electricity and magnetism engineers playlist"]],
        ["Statics & Dynamics", ["engineering statics course playlist", "engineering dynamics lectures"]],
        ["Materials / Circuits", ["materials science course playlist", "circuits course playlist"]],
        ["Thermodynamics / Fluids", ["engineering thermodynamics course playlist", "fluid mechanics course playlist"]]
      ]
    },
    environmental: {
      title: "Environmental Studies (Undergraduate Path)",
      modules: [
        ["Intro to Environmental Studies", ["intro to environmental studies course playlist"]],
        ["Ecology / Earth Systems", ["ecology course playlist", "earth systems course playlist"]],
        ["Environmental Policy & Justice", ["environmental policy course playlist", "environmental justice lectures"]],
        ["Sustainability / Energy", ["sustainable energy course playlist", "sustainability course playlist"]]
      ]
    },
    journalism: {
      title: "Journalism (Undergraduate Path)",
      modules: [
        ["Reporting & Writing", ["news reporting course playlist", "journalism writing course playlist"]],
        ["Media Law & Ethics", ["media law ethics course playlist"]],
        ["Editing & Multimedia", ["multimedia journalism course playlist"]],
        ["Data Journalism (optional)", ["data journalism course playlist"]]
      ]
    },
    ir: {
      title: "International Relations (Undergraduate Path)",
      modules: [
        ["Intro to IR", ["international relations course playlist"]],
        ["IR Theory", ["international relations theory course playlist"]],
        ["Security / Foreign Policy", ["security studies course playlist", "foreign policy analysis course playlist"]],
        ["International Political Economy", ["international political economy course playlist"]],
        ["Regional Studies (choose)", ["asian politics course playlist", "middle east politics playlist", "european politics course playlist"]]
      ]
    },
    public_policy: {
      title: "Public Policy (Undergraduate Path)",
      modules: [
        ["Intro to Public Policy", ["public policy analysis course playlist"]],
        ["Microeconomics for Policy", ["microeconomics public policy course playlist"]],
        ["Statistics / Program Evaluation", ["program evaluation course playlist", "policy statistics course playlist"]],
        ["Law & Institutions", ["public law course playlist", "constitutional law course playlist"]]
      ]
    },
    urban_arch: {
      title: "Urban Design & Architecture Studies (Undergraduate Path)",
      modules: [
        ["Intro to Architecture / Urbanism", ["intro to architecture course playlist", "urban studies course playlist"]],
        ["Architecture History", ["architecture history course playlist"]],
        ["Urban Planning & Design", ["urban planning course playlist", "urban design course playlist"]],
        ["GIS / Spatial Analysis (optional)", ["GIS course playlist", "geospatial analysis course playlist"]]
      ]
    },
    neuroscience: {
      title: "Neural Science (Undergraduate Path)",
      modules: [
        ["Cellular & Molecular Neuroscience", ["cellular molecular neuroscience course playlist"]],
        ["Systems Neuroscience", ["systems neuroscience course playlist"]],
        ["Cognitive Neuroscience", ["cognitive neuroscience course playlist"]],
        ["Computational Neuroscience (optional)", ["computational neuroscience course playlist"]]
      ]
    },
    g_studies: {
      title: "Gender & Sexuality Studies (Undergraduate Path)",
      modules: [
        ["Foundations & Theory", ["gender studies theory course playlist", "feminist theory course playlist"]],
        ["Social & Cultural Perspectives", ["gender and society course playlist"]],
        ["Global / Intersectional Perspectives", ["intersectionality course playlist"]]
      ]
    },
    american_studies: {
      title: "American Studies (Undergraduate Path)",
      modules: [
        ["Intro to American Studies", ["american studies course playlist"]],
        ["US History & Culture", ["american history course playlist", "american culture course"]],
        ["Race & Ethnicity", ["african american studies course playlist", "latino studies course playlist"]]
      ]
    },
    africana: {
      title: "Africana Studies (Undergraduate Path)",
      modules: [
        ["Intro to Africana Studies", ["africana studies course playlist", "african diaspora course playlist"]],
        ["History & Culture", ["african history course playlist"]],
        ["Literature & Arts", ["african literature course playlist", "black literature course playlist"]]
      ]
    }
  };

  // ---- Major pick‑list (from user) ----
  // Map each display name to one or more categories (combined majors produce merged modules)
  const MAJORS = [
    ["Africana Studies B.A.", ["africana"]],
    ["American Studies B.A.", ["american_studies"]],
    ["Anthropology B.A.", ["anthropology"]],
    ["Anthropology and Classical Civilization (major only) B.A.", ["anthropology","classics"]],
    ["Anthropology and Linguistics (major only) B.A.", ["anthropology","linguistics"]],
    ["Art History B.A.", ["art_history"]],
    ["Asian/Pacific/American Studies B.A.", ["american_studies"]],
    ["Biochemistry (major only) B.A.", ["chemistry","biology"]],
    ["Biology B.A., B.S.", ["biology"]],
    ["Chemistry B.A., B.S.", ["chemistry"]],
    ["Cinema Studies B.A.", ["cinema"]],
    ["Classical Civilization B.A.", ["classics"]],
    ["Classical Civilization and Hellenic Studies (major only) B.A.", ["classics"]],
    ["Classics B.A.", ["classics"]],
    ["Classics and Art History (major only) B.A.", ["classics","art_history"]],
    ["Comparative Literature B.A.", ["english"]],
    ["Computer Science B.A., B.S.", ["cs"]],
    ["Computer and Data Science (major only) B.A.", ["cs","data_science"]],
    ["Data Science B.A.", ["data_science"]],
    ["Data Science and Mathematics (major only) B.A.", ["data_science","math"]],
    ["Dramatic Literature, Theatre History, and Cinema B.A.", ["cinema","english"]],
    ["East Asian Studies B.A.", ["history"]],
    ["Economics B.A.", ["economics"]],
    ["Economics and Computer Science (major only) B.A.", ["economics","cs"]],
    ["Economics and Mathematics (major only) B.A.", ["economics","math"]],
    ["Engineering (major only) B.S.", ["engineering"]],
    ["English B.A.", ["english"]],
    ["Environmental Studies B.A.", ["environmental"]],
    ["European and Mediterranean Studies B.A.", ["history"]],
    ["French B.A.", ["languages:French"]],
    ["French and Linguistics (major only) B.A.", ["languages:French","linguistics"]],
    ["Gender and Sexuality Studies B.A.", ["g_studies"]],
    ["German B.A.", ["languages:German"]],
    ["German and Linguistics (major only) B.A.", ["languages:German","linguistics"]],
    ["Global Public Health (major only) B.A., B.S.", ["public_health"]],
    ["Hebrew and Judaic Studies B.A.", ["languages:Hebrew","history"]],
    ["Hellenic Studies B.A.", ["classics"]],
    ["History B.A.", ["history"]],
    ["International Relations (major only) B.A.", ["ir"]],
    ["Italian (major only) B.A.", ["languages:Italian"]],
    ["Italian and Linguistics B.A.", ["languages:Italian","linguistics"]],
    ["Journalism B.A.", ["journalism"]],
    ["Language and Mind (major only) B.A.", ["linguistics","psychology"]],
    ["Latin American and Caribbean Studies B.A.", ["history"]],
    ["Latino Studies B.A.", ["american_studies"]],
    ["Linguistics B.A.", ["linguistics"]],
    ["Mathematics B.A., B.S.", ["math"]],
    ["Mathematics and Computer Science B.A.", ["math","cs"]],
    ["Medieval and Renaissance Studies B.A.", ["history"]],
    ["Metropolitan Studies B.A.", ["urban_arch"]],
    ["Middle Eastern Studies B.A.", ["history"]],
    ["Music B.A.", ["music"]],
    ["Neural Science (major only) B.S.", ["neuroscience"]],
    ["Philosophy B.A.", ["philosophy"]],
    ["Physics B.A., B.S.", ["physics"]],
    ["Politics B.A.", ["political_science"]],
    ["Psychology B.A.", ["psychology"]],
    ["Public Policy B.A.", ["public_policy"]],
    ["Religious Studies B.A.", ["philosophy","history"]],
    ["Romance Languages (major only) B.A.", ["languages:French","languages:Spanish","languages:Italian","languages:Portuguese"]],
    ["Russian and Slavic Studies B.A.", ["languages:Russian","history"]],
    ["Social and Cultural Analysis B.A.", ["sociology"]],
    ["Sociology B.A.", ["sociology"]],
    ["Spanish and Linguistics (major only) B.A.", ["languages:Spanish","linguistics"]],
    ["Spanish and Portuguese B.A.", ["languages:Spanish","languages:Portuguese"]],
    ["Urban Design and Architecture Studies B.A.", ["urban_arch"]]
  ];

  // ---- Helper: build template for specific language ----
  function languageTemplate(languageName){
    const base = TEMPLATES.languages;
    return {
      title: `${languageName} Language & Literature (Undergraduate Path)`,
      modules: base.modules.map(([title, qs])=> [
        title.replace("Language", languageName),
        qs.map(q => q.replace(/\{lang\}/g, languageName))
      ])
    };
  }

  // ---- Search stack ----
  async function getKey(){ const d = await chrome.storage.local.get(["ytApiKey"]); return d.ytApiKey || null; }

  function pickBest(items){
    const score = (t, ch) => {
      t = String(t||'').toLowerCase();
      ch = String(ch||'').toLowerCase();
      let s = 0;
      if (/playlist/.test(t)) s+=2;
      if (/lecture|course|series|full/.test(t)) s+=2;
      if (/university|mit|stanford|harvard|cmu|berkeley|princeton|oxford|cambridge/.test(t+ ' ' + ch)) s+=2;
      s += Math.min(3, Math.floor((t.length||0)/20));
      return s;
    };
    return [...items].sort((a,b)=> (b.score||score(b.title,b.channel)) - (a.score||score(a.title,a.channel)))[0] || null;
  }

  async function searchAPI(q, max=5){
    const key = await getKey();
    if (!key) return null;
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=playlist&maxResults=${max}&q=${encodeURIComponent(q)}&key=${key}`;
    const r = await fetch(url); if (!r.ok) return null;
    const j = await r.json();
    const res = (j.items||[]).map(it=> ({
      type: "playlist",
      playlistId: it.id.playlistId,
      title: it.snippet.title,
      channel: it.snippet.channelTitle
    }));
    return res;
  }

  async function playlistItemsAPI(playlistId, max=200){
    const key = await getKey(); if (!key) return [];
    let results = [];
    let pageToken = "";
    while (results.length < max){
      const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${key}${pageToken?`&pageToken=${pageToken}`:''}`;
      const r = await fetch(url); if (!r.ok) break;
      const j = await r.json();
      (j.items||[]).forEach(it=>{
        const s = it.snippet;
        results.push({
          videoId: s.resourceId?.videoId,
          title: s.title,
          channel: s.videoOwnerChannelTitle || s.channelTitle,
          url: `https://www.youtube.com/watch?v=${s.resourceId?.videoId}&list=${playlistId}`
        });
      });
      pageToken = j.nextPageToken || ""; if (!pageToken) break;
    }
    return results;
  }

  async function searchHTML(q){
    try {
      const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`;
      const r = await fetch(url); if (!r.ok) return [];
      const text = await r.text();
      const plMatches = [...text.matchAll(/\"playlistId\":\"(PL[0-9A-Za-z_-]{10,})\"/g)].map(m=>({type:"playlist", playlistId:m[1]}));
      const vidMatches = [...text.matchAll(/\"videoId\":\"([0-9A-Za-z_-]{6,})\"/g)].map(m=>({type:"video", videoId:m[1]}));
      const seen = new Set(); const res = [];
      for (const m of [...plMatches, ...vidMatches]){
        const id = (m.playlistId||m.videoId);
        if (seen.has(id)) continue; seen.add(id);
        if (m.type === "playlist" && /^(WL|LL|RD)/.test(id)) continue;
        res.push(m);
        if (res.length>=10) break;
      }
      return res;
    } catch(e){ return []; }
  }

  async function buildModule(title, queries){
    let candidates = [];
    for (const q of queries){
      const viaAPI = await searchAPI(q, 5);
      if (viaAPI && viaAPI.length) candidates.push(...viaAPI);
      const viaHTML = await searchHTML(q + " course playlist");
      candidates.push(...viaHTML);
      if (candidates.length >= 8) break;
    }
    const normalized = candidates.map(c => ({...c, title: c.title || (c.type==="playlist" ? "Playlist" : "Video"), channel: c.channel || "" }));
    const best = pickBest(normalized);
    if (!best) return { title, lessons: [] };
    if (best.type === "playlist" && best.playlistId){
      const items = await playlistItemsAPI(best.playlistId, 150);
      if (items.length){ return { title, lessons: items }; }
      return { title, lessons: [{ id: UNIPATH.uid('lesson'), title: "(Open playlist)", url: `https://www.youtube.com/playlist?list=${best.playlistId}` }] };
    } else if (best.type === "video" && best.videoId){
      return { title, lessons: [ { id: UNIPATH.uid('lesson'), videoId: best.videoId, url: `https://www.youtube.com/watch?v=${best.videoId}`, title: "(Lecture)" } ] };
    }
    return { title, lessons: [] };
  }

  function templateByKey(key){
    if (key.startsWith("languages:")){
      const lang = key.split(":")[1];
      return languageTemplate(lang);
    }
    return TEMPLATES[key];
  }

  function mergeTemplates(keys){
    const modules = [];
    const seenTitles = new Set();
    for (const k of keys){
      const t = templateByKey(k);
      if (!t) continue;
      for (const [title, qs] of t.modules){
        const ktitle = `${title}`.toLowerCase();
        if (seenTitles.has(ktitle)) continue;
        seenTitles.add(ktitle);
        modules.push([title, qs]);
      }
    }
    const title = keys.map(k => (k.startsWith("languages:")? k.split(":")[1] : (TEMPLATES[k]?.title.split(" (")[0] || k))).join(" + ");
    return { title: `${title} (Combined Path)`, modules };
  }

  G.listMajors = function(){ return MAJORS.map(([name, keys]) => ({ name, keys })); };

  G.generateForMajor = async function(majorName){
    const entry = MAJORS.find(([name]) => name === majorName);
    if (!entry) throw new Error("Unknown major");
    const keys = entry[1];
    const preset = keys.length > 1 ? mergeTemplates(keys) : templateByKey(keys[0]);
    const modules = [];
    for (const [title, qs] of preset.modules){
      const built = await buildModule(title, qs);
      modules.push({ id: UNIPATH.uid('mod'), title: built.title, lessons: built.lessons.map(l => ({...l, id: UNIPATH.uid('lesson')})) });
    }
    return { title: preset.title, description: `Auto-generated undergraduate path for "${majorName}"`, modules };
  };

  G.saveApiKey = async function(key){ key = String(key||'').trim(); await chrome.storage.local.set({ ytApiKey: key }); return true; };
  G.getApiKey = async function(){ const d = await chrome.storage.local.get(["ytApiKey"]); return d.ytApiKey || ""; };

  window.UNIPATH_GEN = G;
})();