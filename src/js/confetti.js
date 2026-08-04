// ── Confetti Engine ──
// Physics-based confetti for celebrations

export class ConfettiEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.pieces = [];
    this.running = false;
    this.raf = null;
  }

  burst(count = 120, fromY = 0) {
    if (!this.canvas) return;
    this.canvas.width = this.canvas.offsetWidth || window.innerWidth;
    this.canvas.height = this.canvas.offsetHeight || window.innerHeight;
    const W = this.canvas.width;

    const colors = ['#ff6b9d','#a855f7','#ffd700','#2dd4bf','#10b981','#fff','#e8a87c','#f472b6'];
    for (let i = 0; i < count; i++) {
      this.pieces.push({
        x: Math.random() * W,
        y: fromY || -10,
        w: Math.random() * 8 + 4,
        h: Math.random() * 12 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 6,
        vy: Math.random() * 5 + 2,
        gravity: 0.12,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.2,
        opacity: 1,
        fadeSpeed: Math.random() * 0.008 + 0.003,
        shape: Math.random() > 0.5 ? 'rect' : 'circle',
      });
    }

    if (!this.running) this.start();
  }

  start() {
    this.running = true;
    const loop = () => {
      if (!this.running || !this.canvas) return;
      const ctx = this.ctx;
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.pieces = this.pieces.filter(p => p.opacity > 0.01);

      this.pieces.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= 0.99;
        p.rotation += p.rotSpeed;
        p.opacity -= p.fadeSpeed;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.fillStyle = p.color;

        if (p.shape === 'rect') {
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });

      if (this.pieces.length > 0) {
        this.raf = requestAnimationFrame(loop);
      } else {
        this.running = false;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }
    };
    loop();
  }

  stop() {
    this.running = false;
    if (this.raf) cancelAnimationFrame(this.raf);
    if (this.canvas && this.ctx) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    this.pieces = [];
  }
}

// Modal confetti (small burst inside modal)
export function burstModalConfetti(canvasId) {
  const engine = new ConfettiEngine(canvasId);
  engine.burst(60, 0);
}
