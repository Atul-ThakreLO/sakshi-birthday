// ── Scratch Cards ──
// HTML5 Canvas touch/mouse scratch-off

const CARDS = [
  { canvasId: 'scratch-0', revealId: 'reveal-0' },
  { canvasId: 'scratch-1', revealId: 'reveal-1' },
  { canvasId: 'scratch-2', revealId: 'reveal-2' },
  { canvasId: 'scratch-3', revealId: 'reveal-3' },
];

export function initScratchCards() {
  CARDS.forEach(({ canvasId, revealId }) => {
    setupCard(canvasId, revealId);
  });
}

function setupCard(canvasId, revealId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  let isDrawing = false;
  let scratched = false;

  // Draw gold scratch layer
  drawScratchLayer(ctx, canvas.width, canvas.height);

  // Mouse
  canvas.addEventListener('mousedown', e => { isDrawing = true; scratch(e, canvas, ctx, revealId); });
  canvas.addEventListener('mousemove', e => { if (isDrawing) scratch(e, canvas, ctx, revealId); });
  canvas.addEventListener('mouseup', () => { isDrawing = false; });

  // Touch
  canvas.addEventListener('touchstart', e => { e.preventDefault(); isDrawing = true; scratch(e.touches[0], canvas, ctx, revealId); }, { passive: false });
  canvas.addEventListener('touchmove',  e => { e.preventDefault(); if (isDrawing) scratch(e.touches[0], canvas, ctx, revealId); }, { passive: false });
  canvas.addEventListener('touchend',   () => { isDrawing = false; });

  function scratch(e, canvas, ctx, revealId) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();

    // Check if > 55% scratched
    if (!scratched) {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      let transparent = 0;
      for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] < 128) transparent++;
      }
      const ratio = transparent / (pixels.length / 4);
      if (ratio > 0.55) {
        scratched = true;
        revealCard(canvas, revealId);
      }
    }
  }
}

function drawScratchLayer(ctx, w, h) {
  // Gold gradient background
  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0,   '#b8860b');
  grad.addColorStop(0.3, '#ffd700');
  grad.addColorStop(0.6, '#daa520');
  grad.addColorStop(1,   '#ffd700');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Glitter dots
  ctx.fillStyle = 'rgba(255,255,255,0.4)';
  for (let i = 0; i < 120; i++) {
    ctx.beginPath();
    ctx.arc(Math.random() * w, Math.random() * h, Math.random() * 1.5, 0, Math.PI * 2);
    ctx.fill();
  }

  // "Scratch Here!" text
  ctx.fillStyle = 'rgba(70,45,0,0.7)';
  ctx.font = 'bold 20px Caveat, cursive';
  ctx.textAlign = 'center';
  ctx.fillText('✨ Scratch Here! ✨', w / 2, h / 2 + 5);
}

function revealCard(canvas, revealId) {
  // Fade out canvas
  let opacity = 1;
  const fade = setInterval(() => {
    opacity -= 0.08;
    canvas.style.opacity = Math.max(0, opacity);
    if (opacity <= 0) {
      clearInterval(fade);
      canvas.style.display = 'none';
    }
  }, 30);

  if (navigator.vibrate) navigator.vibrate([40, 30, 80]);
}
