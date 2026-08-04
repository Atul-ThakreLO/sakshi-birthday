// ── Particle System ──
// Ambient floating particles drawn on canvas

export class ParticleSystem {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.running = false;
    this.raf = null;
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.init();
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  init() {
    this.particles = [];
    const count = Math.floor((window.innerWidth * window.innerHeight) / 12000);
    const shapes = ['circle', 'star', 'heart'];
    for (let i = 0; i < Math.min(count, 40); i++) {
      this.particles.push(this.createParticle(shapes[i % shapes.length]));
    }
  }

  createParticle(shape) {
    return {
      x: Math.random() * (this.canvas?.width || window.innerWidth),
      y: Math.random() * (this.canvas?.height || window.innerHeight),
      size: Math.random() * 4 + 1.5,
      speedY: -(Math.random() * 0.4 + 0.1),
      speedX: (Math.random() - 0.5) * 0.2,
      opacity: Math.random() * 0.5 + 0.15,
      opacityDir: (Math.random() > 0.5 ? 1 : -1) * 0.003,
      color: this.randomColor(),
      shape: shape || 'circle',
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.02,
    };
  }

  randomColor() {
    const colors = ['#ff6b9d', '#a855f7', '#ffd700', '#2dd4bf', '#e8a87c', '#fff'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  drawStar(ctx, x, y, size, color, opacity) {
    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.fillStyle = color;
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
      const r = i === 0 ? size : size * 0.5;
      const method = i === 0 ? 'moveTo' : 'lineTo';
      ctx[method](x + r * Math.cos(angle), y + r * Math.sin(angle));
      ctx.lineTo(
        x + size * 0.4 * Math.cos(angle + (2 * Math.PI) / 10),
        y + size * 0.4 * Math.sin(angle + (2 * Math.PI) / 10)
      );
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  draw() {
    const ctx = this.ctx;
    const W = this.canvas.width, H = this.canvas.height;
    ctx.clearRect(0, 0, W, H);

    this.particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;
      p.opacity += p.opacityDir;
      p.rotation += p.rotSpeed;

      if (p.opacity <= 0.05 || p.opacity >= 0.7) p.opacityDir *= -1;
      if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W; }
      if (p.x < -10) p.x = W + 10;
      if (p.x > W + 10) p.x = -10;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;

      if (p.shape === 'circle') {
        ctx.beginPath();
        ctx.arc(0, 0, p.size, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.shape === 'star') {
        this.drawStar(ctx, 0, 0, p.size * 1.5, p.color, p.opacity);
      } else {
        // heart
        const s = p.size * 0.8;
        ctx.beginPath();
        ctx.moveTo(0, s * 0.5);
        ctx.bezierCurveTo(-s, -s * 0.2, -s * 1.5, s * 1, 0, s * 1.8);
        ctx.bezierCurveTo(s * 1.5, s * 1, s, -s * 0.2, 0, s * 0.5);
        ctx.fill();
      }
      ctx.restore();
    });
  }

  start() {
    if (this.running) return;
    this.running = true;
    const loop = () => {
      if (!this.running) return;
      this.draw();
      this.raf = requestAnimationFrame(loop);
    };
    loop();
  }

  stop() {
    this.running = false;
    if (this.raf) cancelAnimationFrame(this.raf);
  }
}
