// Shared helpers (loaded by content, popup, options, generator)
// MV3 note: content scripts are NOT ES modules; expose a global UNIPATH
(() => {
  function iso8601ToSeconds(iso) {
    if (!iso || typeof iso !== 'string') return null;
    const m = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!m) return null;
    const h = parseInt(m[1] || '0', 10);
    const mn = parseInt(m[2] || '0', 10);
    const s = parseInt(m[3] || '0', 10);
    return h * 3600 + mn * 60 + s;
  }

  function secondsToHMS(total) {
    if (typeof total !== 'number') return '';
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;
    return [h, m, s].map((v,i)=> i===0? String(v): String(v).padStart(2,'0')).join(':');
  }

  function slugify(str) {
    return String(str||'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'').slice(0,60);
  }

  function uid(prefix='id'){ return `${prefix}_${Math.random().toString(36).slice(2,10)}`; }

  function heuristicDifficulty(title){
    const t = String(title||'').toLowerCase();
    if (/intro|beginner|101|overview|fundamentals|crash course|basics/.test(t)) return 1;
    if (/intermediate|practice|project|example|walkthrough/.test(t)) return 2;
    if (/advanced|deep dive|masterclass|optimization|internals/.test(t)) return 3;
    return 2;
  }

  function sortForPath(videos){
    return [...videos].sort((a,b)=>{
      const d = heuristicDifficulty(a.title) - heuristicDifficulty(b.title);
      if (d) return d;
      const da = (a.durationSeconds||0)-(b.durationSeconds||0);
      if (da) return da;
      return String(a.title||'').localeCompare(String(b.title||''));
    });
  }

  function download(filename, text){
    const blob = new Blob([text], {type:'text/plain'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
  }

  function escapeHtml(s){
    return String(s||'').replace(/[&<>\"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;','\'':'&#39;'}[c]));
  }

  window.UNIPATH = {
    iso8601ToSeconds, secondsToHMS, slugify, uid,
    heuristicDifficulty, sortForPath, download, escapeHtml
  };
})();