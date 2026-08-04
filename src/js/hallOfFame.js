// ── Hall of Fame ──
import { burstModalConfetti } from './confetti.js';

const TROPHIES = [
  {
    title: '🔒 Chief Secret Keeper',
    speech: '"In a world full of gossips, she stood firm. Not once did a single secret escape these lips. We hereby declare her the official vault of the family."',
    imgSrc: '/assets/photo_baby.png',
  },
  {
    title: '💸 No-Questions ATM',
    speech: `"Never once asked what it was for. Never once said no. Just silently handed over the cash with a look that said 'you better pay me back.' (She never asked for it back.)"`,
    imgSrc: '/assets/photo_school.png',
  },
  {
    title: '🍟 Midnight Snack Master',
    speech: '"Awarded for her unmatched ability to locate chips, chocolate, and leftover biryani at 2am with the precision of a trained professional. We salute her."',
    imgSrc: '/assets/photo_snack.png',
  },
  {
    title: '👗 Best Outfit Advisor',
    speech: `"One look. That's all she needs. One look and she'll tell you exactly what to change. She has never been wrong. Not once. This award is long overdue."`,
    imgSrc: '/assets/photo_trip.png',
  },
  {
    title: '✨ Certified Vibe Setter',
    speech: '"Walks into a room and it immediately gets 10x better. Scientists cannot explain it. We\'ve stopped trying. The vibe is simply immaculate. Always."',
    imgSrc: '/assets/photo_chai.png',
  },
  {
    title: '💜 Best Sister Award',
    speech: '"This one\'s not funny. This one\'s real. For being patient when I was annoying, kind when I was difficult, and wonderful every single day — this award is forever yours."',
    imgSrc: '/assets/photo_trip.png',
  },
];

export function initHallOfFame() {
  const cards = document.querySelectorAll('.trophy-card');
  cards.forEach((card, i) => {
    card.style.setProperty('--i', i);
    card.addEventListener('click', () => openModal(i));
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openModal(i); });
  });

  document.getElementById('modal-close')?.addEventListener('click', closeModal);
  document.getElementById('trophy-modal')?.addEventListener('click', e => {
    if (e.target.id === 'trophy-modal') closeModal();
  });
}

function openModal(index) {
  const t = TROPHIES[index];
  const modal = document.getElementById('trophy-modal');
  if (!modal) return;

  document.getElementById('modal-award-title').textContent = t.title;
  document.getElementById('modal-speech').textContent = t.speech;
  const photoSlot = document.getElementById('modal-photo');
  if (photoSlot) {
    photoSlot.innerHTML = `<img src="${t.imgSrc}" alt="${t.title}" style="width:100%;height:100%;object-fit:cover;border-radius:var(--radius-sm);" />`;
  }

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';

  if (navigator.vibrate) navigator.vibrate([30, 50, 30]);

  // Confetti burst
  setTimeout(() => burstModalConfetti('modal-confetti'), 200);
}

function closeModal() {
  const modal = document.getElementById('trophy-modal');
  modal?.classList.add('hidden');
  document.body.style.overflow = '';
}
