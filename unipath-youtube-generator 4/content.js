// Content script: relies on UNIPATH global from utils.js
const { iso8601ToSeconds } = window.UNIPATH;

let lastVideoId = null;
let injectedButton = null;

init();

function init() {
  observeSpaNavigation();
  maybeInjectButton();
}

function observeSpaNavigation() {
  let prevUrl = location.href;
  setInterval(() => {
    if (location.href !== prevUrl) {
      prevUrl = location.href;
      onRouteChange();
    }
  }, 800);
  document.addEventListener('yt-navigate-finish', onRouteChange);
}

async function onRouteChange() {
  if (!/\/watch\?/.test(location.pathname + location.search)) return;
  await waitFor(() => document.querySelector('h1.title, h1.ytd-watch-metadata'));
  const video = extractVideoFromPage();
  if (video?.videoId && video.videoId !== lastVideoId) {
    lastVideoId = video.videoId;
    chrome.storage.local.set({ [`unipath_video_${video.videoId}`]: video });
  }
  maybeInjectButton();
}

function maybeInjectButton() {
  if (injectedButton || !/\/watch\?/.test(location.pathname + location.search)) return;
  injectedButton = document.createElement('button');
  injectedButton.textContent = '➕ Add to UniPath';
  Object.assign(injectedButton.style, {
    position: 'fixed', right: '16px', bottom: '16px', zIndex: 99999,
    padding: '10px 14px', borderRadius: '999px', border: 'none',
    background: '#2563eb', color: '#fff', fontWeight: 600, boxShadow: '0 6px 20px rgba(0,0,0,.25)',
    cursor: 'pointer'
  });
  injectedButton.addEventListener('click', async () => {
    const video = extractVideoFromPage();
    if (video) {
      const key = `unipath_video_${video.videoId}`;
      await chrome.storage.local.set({ [key]: video });
      injectedButton.textContent = 'Added ✓';
      setTimeout(() => (injectedButton.textContent = '➕ Add to UniPath'), 1500);
    }
  });
  document.body.appendChild(injectedButton);
}

chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg?.type === 'GET_VIDEO_METADATA') {
    const video = extractVideoFromPage();
    sendResponse({ video });
  }
});

function extractVideoFromPage() {
  const url = new URL(location.href);
  const videoId = url.searchParams.get('v');
  if (!videoId) return null;

  const titleEl = document.querySelector('h1.title yt-formatted-string, h1.ytd-watch-metadata yt-formatted-string');
  const title = titleEl ? titleEl.textContent.trim() : document.title.replace(/\s-\sYouTube.*/, '').trim();

  const channelEl = document.querySelector('#owner-name a, ytd-channel-name a');
  const channel = channelEl ? channelEl.textContent.trim() : null;

  let durationSeconds = null;
  let chapters = [];
  const ldNodes = [...document.querySelectorAll('script[type="application/ld+json"]')];
  for (const node of ldNodes) {
    try {
      const data = JSON.parse(node.textContent);
      const arr = Array.isArray(data) ? data : [data];
      for (const item of arr) {
        if (item['@type'] === 'VideoObject') {
          durationSeconds = iso8601ToSeconds(item.duration) || durationSeconds;
          const parts = item.hasPart || [];
          for (const p of parts) {
            if (p['@type'] === 'Clip' && typeof p.startOffset === 'number') {
              chapters.push({ title: p.name || `Part @${p.startOffset}s`, start: Math.floor(p.startOffset) });
            }
          }
        }
      }
    } catch (e) {}
  }

  if (!durationSeconds) {
    const meta = document.querySelector('meta[itemprop="duration"]');
    if (meta?.content) durationSeconds = iso8601ToSeconds(meta.content) || null;
  }

  const descEl = document.querySelector('#description ytd-text-inline-expander, #description');
  const description = descEl ? descEl.textContent.trim().slice(0, 400) : null;

  return { videoId, url: location.href, title, channel, durationSeconds, chapters, description };
}

function waitFor(predicate, timeoutMs = 10000, interval = 100) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const id = setInterval(() => {
      if (predicate()) { clearInterval(id); resolve(true); }
      else if (Date.now() - start > timeoutMs) { clearInterval(id); reject(new Error('timeout')); }
    }, interval);
  });
}
