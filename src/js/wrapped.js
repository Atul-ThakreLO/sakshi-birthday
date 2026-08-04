// ── Sister Wrapped — Story Slides ──

let currentSlide = 0;
const TOTAL_SLIDES = 6;
let autoTimer = null;
const AUTO_ADVANCE_MS = 5000;
let isWrappedActive = false;

export function initWrapped() {
  buildProgressBars();

  document.getElementById('wrap-next')?.addEventListener('click', () => {
    if (currentSlide < TOTAL_SLIDES - 1) renderSlide(currentSlide + 1, 'right');
  });
  document.getElementById('wrap-prev')?.addEventListener('click', () => {
    if (currentSlide > 0) renderSlide(currentSlide - 1, 'left');
  });

  // Touch swipe within section
  const container = document.getElementById('section-wrapped');
  let sx = 0;
  container?.addEventListener('touchstart', e => { sx = e.touches[0].clientX; }, { passive: true });
  container?.addEventListener('touchend', e => {
    const dx = sx - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 50) {
      if (dx > 0 && currentSlide < TOTAL_SLIDES - 1) renderSlide(currentSlide + 1, 'right');
      else if (dx < 0 && currentSlide > 0) renderSlide(currentSlide - 1, 'left');
    }
  }, { passive: true });
}

export function startWrapped() {
  isWrappedActive = true;
  currentSlide = 0;
  renderSlide(0, 'right');
}

export function pauseWrapped() {
  isWrappedActive = false;
  clearTimeout(autoTimer);
  autoTimer = null;
}

function buildProgressBars() {
  const wrap = document.getElementById('wrapped-progress-bars');
  if (!wrap) return;
  wrap.innerHTML = '';
  for (let i = 0; i < TOTAL_SLIDES; i++) {
    const bar = document.createElement('div');
    bar.className = 'prog-bar';
    bar.id = `prog-${i}`;
    const fill = document.createElement('div');
    fill.className = 'prog-fill';
    bar.appendChild(fill);
    wrap.appendChild(bar);
  }
}

function renderSlide(index, dir = 'right') {
  const slides = document.querySelectorAll('.wrapped-slide');
  slides.forEach((s, i) => {
    s.classList.remove('active', 'exit');
    if (i === index) {
      s.style.transform = dir === 'right' ? 'translateX(100%)' : 'translateX(-100%)';
      s.style.opacity = '0';
      s.offsetHeight;
      s.classList.add('active');
      s.style.transform = '';
      s.style.opacity = '';

      // Animate stat number if present
      const statEl = s.querySelector('.stat-number');
      if (statEl) animateCounter(statEl, parseInt(statEl.dataset.target));
    }
  });

  // Update progress bars
  document.querySelectorAll('.prog-bar').forEach((bar, i) => {
    const fill = bar.querySelector('.prog-fill');
    if (i < index) {
      bar.classList.add('done');
      if (fill) fill.style.width = '100%';
    } else if (i === index) {
      bar.classList.remove('done');
      if (fill) {
        fill.style.width = '0%';
        fill.style.transition = 'none';
        fill.offsetHeight;
        fill.style.transition = `width ${AUTO_ADVANCE_MS}ms linear`;
        fill.style.width = '100%';
      }
    } else {
      bar.classList.remove('done');
      if (fill) fill.style.width = '0%';
    }
  });

  currentSlide = index;
  if (isWrappedActive) {
    resetAutoAdvance();
  }
}

function resetAutoAdvance() {
  clearTimeout(autoTimer);
  if (!isWrappedActive) return;
  autoTimer = setTimeout(() => {
    if (isWrappedActive && currentSlide < TOTAL_SLIDES - 1) {
      renderSlide(currentSlide + 1, 'right');
    }
  }, AUTO_ADVANCE_MS);
}

function animateCounter(el, target) {
  if (!el || isNaN(target)) return;
  let start = 0;
  const duration = 1800;
  const step = timestamp => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target).toLocaleString();
    if (progress < 1) requestAnimationFrame(step);
    else {
      el.textContent = target.toLocaleString();
      el.style.animation = 'stat-pulse 0.4s ease';
    }
  };
  requestAnimationFrame(step);
}
