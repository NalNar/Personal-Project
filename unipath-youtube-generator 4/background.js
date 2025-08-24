// MV3 service worker
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'unipath-add',
    title: 'Add this YouTube video to UniPath…',
    contexts: ['page', 'link'],
    documentUrlPatterns: ['https://www.youtube.com/watch*']
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === 'unipath-add' && tab?.id) {
    try {
      const resp = await chrome.tabs.sendMessage(tab.id, { type: 'GET_VIDEO_METADATA' });
      if (resp && resp.video) await saveRecentVideo(resp.video);
    } catch (e) {}
  }
});

async function saveRecentVideo(video) {
  const data = await chrome.storage.local.get(['unipath_recent']);
  const recent = data.unipath_recent || {};
  recent[video.videoId] = video;
  await chrome.storage.local.set({ unipath_recent: recent });
}

chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg?.type === 'GET_RECENT_VIDEO') {
    chrome.storage.local.get(['unipath_recent']).then(d => {
      const obj = d.unipath_recent || {};
      const last = Object.values(obj).pop() || null;
      sendResponse({ video: last });
    });
    return true;
  }
});
