// ── Navigation Engine ──
// Handles section transitions via swipe gestures, dot clicks, and nav arrow buttons

let currentSection = 0;
const TOTAL_SECTIONS = 9;
let isTransitioning = false;
let touchStartY = 0;
let touchStartX = 0;
const SWIPE_THRESHOLD = 60;

// Sections that have internal scroll — don't intercept vertical swipes unless at bounds
const SCROLL_SECTIONS = new Set([3, 4, 5, 6, 7, 8]);

export function initNavigation(onSectionChange) {
  setupDots(onSectionChange);
  // setupSwipe(onSectionChange); // Temporarily disabled touch swipe navigation
  setupButtons(onSectionChange);
  updateDots(0);
}

function setupDots(onSectionChange) {
  document.querySelectorAll('.dot').forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.dataset.section);
      if (idx !== currentSection) goToSection(idx, onSectionChange);
    });
  });
}

function setupButtons(onSectionChange) {
  document.getElementById('intro-cta')?.addEventListener('click', () => goToSection(1, onSectionChange));
  document.getElementById('swipe-hint-countdown')?.addEventListener('click', () => goToSection(2, onSectionChange));
  document.getElementById('view-credits-btn')?.addEventListener('click', () => goToSection(8, onSectionChange));

  // Up & Down Arrow buttons above and below dots
  document.getElementById('nav-btn-prev')?.addEventListener('click', () => {
    if (currentSection > 0) goToSection(currentSection - 1, onSectionChange);
  });
  document.getElementById('nav-btn-next')?.addEventListener('click', () => {
    if (currentSection < TOTAL_SECTIONS - 1) goToSection(currentSection + 1, onSectionChange);
  });
}

function setupSwipe(onSectionChange) {
  const app = document.getElementById('app');

  app.addEventListener('touchstart', e => {
    touchStartY = e.touches[0].clientY;
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  app.addEventListener('touchend', e => {
    if (isTransitioning) return;
    const dy = touchStartY - e.changedTouches[0].clientY;
    const dx = touchStartX - e.changedTouches[0].clientX;

    // Only intercept vertical swipes that are bigger than horizontal
    if (Math.abs(dy) < SWIPE_THRESHOLD || Math.abs(dy) < Math.abs(dx)) return;

    // Don't intercept if we're in a scrollable section that hasn't hit its bounds
    if (SCROLL_SECTIONS.has(currentSection)) {
      const section = document.querySelector(`.section[data-index="${currentSection}"]`);
      if (section) {
        const atTop = section.scrollTop <= 0;
        const atBottom = section.scrollTop + section.clientHeight >= section.scrollHeight - 10;
        if ((dy < 0 && !atTop) || (dy > 0 && !atBottom)) return;
      }
    }

    if (dy > 0 && currentSection < TOTAL_SECTIONS - 1) goToSection(currentSection + 1, onSectionChange);
    else if (dy < 0 && currentSection > 0) goToSection(currentSection - 1, onSectionChange);
  }, { passive: true });
}

export function goToSection(index, onSectionChange) {
  if (isTransitioning || index === currentSection) return;
  if (index < 0 || index >= TOTAL_SECTIONS) return;

  isTransitioning = true;

  const current = document.querySelector(`.section[data-index="${currentSection}"]`);
  const next    = document.querySelector(`.section[data-index="${index}"]`);

  if (current) {
    current.classList.add('exit-up');
    setTimeout(() => {
      current.classList.remove('active', 'exit-up');
      current.scrollTop = 0;
    }, 600);
  }

  if (next) {
    next.classList.add('active');
  }

  currentSection = index;
  updateDots(index);

  if (onSectionChange) onSectionChange(index);

  setTimeout(() => { isTransitioning = false; }, 700);
}

function updateDots(index) {
  document.querySelectorAll('.dot').forEach(dot => {
    dot.classList.toggle('active', parseInt(dot.dataset.section) === index);
  });

  const prevBtn = document.getElementById('nav-btn-prev');
  const nextBtn = document.getElementById('nav-btn-next');

  if (prevBtn) {
    prevBtn.style.opacity = index === 0 ? '0.35' : '1';
    prevBtn.style.pointerEvents = index === 0 ? 'none' : 'auto';
  }
  if (nextBtn) {
    nextBtn.style.opacity = index === TOTAL_SECTIONS - 1 ? '0.35' : '1';
    nextBtn.style.pointerEvents = index === TOTAL_SECTIONS - 1 ? 'none' : 'auto';
  }
}

export function getCurrentSection() { return currentSection; }
