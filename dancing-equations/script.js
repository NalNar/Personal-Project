let player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '158',
    width: '280',
    videoId: 'dQw4w9WgXcQ'
  });
  animate();
}

document.getElementById('load-video').addEventListener('click', () => {
  const url = document.getElementById('video-url').value.trim();
  const id = extractVideoID(url);
  if (player && id) {
    player.loadVideoById(id);
  }
});

function extractVideoID(url) {
  let id = url;
  const vMatch = url.match(/[?&]v=([^&]+)/);
  const shortMatch = url.match(/youtu\.be\/([^?]+)/);
  if (vMatch) id = vMatch[1];
  if (shortMatch) id = shortMatch[1];
  return id;
}

const equations = Array.from(document.querySelectorAll('.equation'));
equations.forEach(eq => {
  eq.style.left = Math.random() * 80 + 'vw';
  eq.style.top = Math.random() * 80 + 'vh';
});

function animate() {
  const t = player ? player.getCurrentTime() : performance.now() / 1000;
  equations.forEach((eq, i) => {
    const offset = Math.sin(t * 2 + i) * 20;
    const rotate = Math.sin(t * 3 + i) * 30;
    eq.style.transform = `translateY(${offset}px) rotate(${rotate}deg)`;
  });
  requestAnimationFrame(animate);
}

if (!player) animate();
