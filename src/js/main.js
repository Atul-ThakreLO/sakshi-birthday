// ── main.js — Orchestrator ──
import { ParticleSystem }  from './particles.js';
import { initNavigation, goToSection } from './navigation.js';
import { initAudio, playMusic }        from './audio.js';
import { initCountdown }               from './countdown.js';
import { initWrapped, startWrapped, pauseWrapped } from './wrapped.js';
import { initHallOfFame }              from './hallOfFame.js';
import { initMemoryLane }              from './memoryLane.js';
import { initScratchCards }            from './scratchCards.js';
import { initQuiz }                    from './quiz.js';
import { initFinale, startFinale }     from './finale.js';
import { loadLottie }                  from './lottie-loader.js';

// ── Register GSAP Plugins ──
if (typeof gsap !== 'undefined') {
  if (typeof TextPlugin !== 'undefined')   gsap.registerPlugin(TextPlugin);
  if (typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);
}

// ── Init on DOM Ready ──
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initAudio();
  initCountdown();
  initHallOfFame();
  initMemoryLane();
  initScratchCards();
  initQuiz();
  initFinale();

  // Wrapped init deferred to first visit
  initNavigation(onSectionChange);
  initWrapped();

  // Lottie: Intro cake (load immediately)
  loadLottie('lottie-cake', 'cake');

  // Animate Sakshi letters in with GSAP
  animateSakshiName();

  // Konami Code Easter Egg
  setupKonami();

  // Prefers reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--transition-smooth', 'linear');
  }
});

// ── Particles on Intro ──
let particles = null;
function initParticles() {
  particles = new ParticleSystem('particles-canvas');
  particles.start();
}

// ── Section Change Handler ──
function onSectionChange(index) {
  if (index === 2) {
    playMusic();
    loadLottie('lottie-sparkle-wrap', 'sparkle');
    loadLottie('lottie-hearts-wrap',  'heart');
    if (typeof startWrapped === 'function') startWrapped();
  } else {
    if (typeof pauseWrapped === 'function') pauseWrapped();
  }

  switch (index) {
    case 1: // Countdown
      loadLottie('lottie-balloons-count', 'balloons');
      break;

    case 3: // Hall of Fame
      loadTrophyLotties();
      break;

    case 5: // Scratch cards
      // Already initialized
      break;

    case 6: // Quiz
      loadLottie('lottie-quiz-stars', 'stars');
      break;

    case 7: // Finale
      loadLottie('lottie-heart-finale', 'heart');
      startFinale();
      break;

    case 8: // Movie Credits Board
      loadLottie('lottie-credits-stars', 'stars');
      break;
  }
}

function loadTrophyLotties() {
  for (let i = 0; i < 6; i++) {
    loadLottie(`lottie-trophy-${i}`, 'trophy');
  }
}

// ── Animate Sakshi Name ──
function animateSakshiName() {
  const letters = document.querySelectorAll('.intro-sakshi .letter');
  if (!letters.length) return;

  // Use only blur/scale — avoid translateY which can push letters off-screen
  // Also avoid opacity on background-clip:text (Chrome bug)
  letters.forEach(l => {
    l.style.display = 'inline-block';
    l.style.filter = 'blur(8px)';
    l.style.transform = 'scale(0.9) translateZ(0)';
    l.style.willChange = 'filter, transform';
  });

  if (typeof gsap !== 'undefined') {
    gsap.to(letters, {
      filter: 'blur(0px)',
      scale: 1,
      duration: 0.7,
      stagger: 0.09,
      delay: 0.1,
      ease: 'power3.out',
      clearProps: 'willChange',
    });

    gsap.fromTo('.intro-for',
      { y: 12, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, delay: 0.7, ease: 'power2.out' }
    );
    gsap.fromTo('.intro-sparkle-row',
      { y: 8, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, delay: 0.9, ease: 'power2.out' }
    );
    gsap.fromTo('.intro-cta',
      { y: 6, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, delay: 1.1, ease: 'power2.out' }
    );
  } else {
    letters.forEach(l => {
      l.style.filter = 'none';
      l.style.transform = 'none';
    });
    ['.intro-for', '.intro-sparkle-row', '.intro-cta'].forEach(sel => {
      document.querySelectorAll(sel).forEach(el => { el.style.opacity = '1'; });
    });
  }
}

// ── Konami Code ──
const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let konamiIdx = 0;

function setupKonami() {
  document.addEventListener('keydown', e => {
    if (e.key === KONAMI[konamiIdx]) {
      konamiIdx++;
      if (konamiIdx === KONAMI.length) {
        konamiIdx = 0;
        triggerKonamiEgg();
      }
    } else {
      konamiIdx = 0;
    }
  });
}

function triggerKonamiEgg() {
  // Jump straight to finale with a dramatic entrance
  goToSection(7, onSectionChange);
  if (navigator.vibrate) navigator.vibrate([100, 50, 100, 50, 200]);
  alert('🎉 CHEAT CODE ACTIVATED! Skipping straight to the finale!');
}
