// ── Grand Finale ──
import { ConfettiEngine } from './confetti.js';
import { goToSection } from './navigation.js';

const LETTER = `Happy Birthday, Sakshi Di! 🎂

I tried to write something super serious and emotional, but you’d probably just laugh, say "Ashi gosth aahe tula vatte majak," and ask if I'm feeling okay. So let me keep it real.

Being the younger brother to two incredible sisters is the greatest privilege (and the most fun chaos) in the world. Having both of you means our home always has its boss, its laughter, and its nonstop energy. For me, both of you hold the exact same, irreplaceable place in my heart — loved equally, always.

Thank you for being our official Home Minister, for always sharing half your food no matter what, for being my 24/7 ATM with zero questions asked, and for the 3,420+ cups of chai that started all our best conversations.

Sure, my love language is being annoying, teasing you, waking up the entire house, and asking for expensive cars, phones and laptops... but beneath all the fights over the TV remote, you mean the absolute world to me.

Today is all about celebrating you! Wishing you infinite joy, success, health, and endless happiness.

Happy Birthday, Sakshi Di! ❤️

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
