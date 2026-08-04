// ── Grand Finale ──
import { ConfettiEngine } from './confetti.js';
import { goToSection } from './navigation.js';

const LETTER = `Happy Birthday, Sakshi Di! 🎂

I tried to write something super serious and emotional, but knowing you, you'd just roast me and ask if I'm feeling okay. So I'll keep it real.

Being your younger brother is the greatest privilege (and the most fun job) in the world. From stealing your snacks, borrowing money with zero intention of returning it, to bothering you 24/7 — thank you for being the best elder sister anyone could ask for.

You are the strongest, smartest, and sweetest Di in the world. Thank you for always protecting me, guiding me, and sharing 3,000+ cups of chai with me.

Today is all about celebrating you! I hope this year brings you infinite happiness, success, and endless free snacks (which I will probably steal).

Happy Birthday, Sakshi Di! 💜

With all my love & annoying brotherly affection,
Atul Thakre`;

let letterStarted = false;
let confettiEngine = null;

export function initFinale() {
  confettiEngine = new ConfettiEngine('finale-canvas');
}

export function startFinale() {
  if (letterStarted) return;
  letterStarted = true;

  // Resize finale canvas
  const canvas = document.getElementById('finale-canvas');
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  // Type letter with GSAP
  if (typeof gsap !== 'undefined' && gsap.registerPlugin) {
    gsap.registerPlugin(TextPlugin);
    gsap.to('#letter-text', {
      duration: LETTER.length * 0.02,
      text: { value: LETTER, delimiter: '' },
      ease: 'none',
      onComplete: () => {
        showCredits();
        triggerConfetti();
      }
    });
  } else {
    // Fallback typewriter
    typewriter(document.getElementById('letter-text'), LETTER, 25, () => {
      showCredits();
      triggerConfetti();
    });
  }

  triggerConfetti();
}

function typewriter(el, text, speed, onDone) {
  if (!el) return;
  let i = 0;
  el.textContent = '';
  const tick = () => {
    el.textContent += text[i++];
    if (i < text.length) setTimeout(tick, speed);
    else if (onDone) onDone();
  };
  tick();
}

function triggerConfetti() {
  if (!confettiEngine) return;
  confettiEngine.burst(150, 0);
  // Multiple bursts
  [1500, 3000, 5000].forEach(delay => {
    setTimeout(() => confettiEngine.burst(80), delay);
  });
}

function showCredits() {
  setTimeout(() => {
    // Reveal CTA button on letter card
    const ctaBtn = document.getElementById('view-credits-btn');
    if (ctaBtn) ctaBtn.classList.remove('hidden');

    // Auto navigate to Section 8 (Movie Credits)
    goToSection(8);
  }, 1200);
}
