// ── Hall of Fame ──
import { burstModalConfetti } from './confetti.js';

const TROPHIES = [
  {
    category: '01 — House Boss 👑',
    title: 'Home Minister',
    speech: '"Because every house has a leader, and we all know who that is."',
    tags: ['House Boss', 'Her Rules', 'Family Manager'],
    imgSrc: '/assets/photos/raw/img3.jpeg',
  },
  {
    category: '02 — Food Sharer 🍟',
    title: 'Best Food Sharer',
    speech: '"No matter what she had, there was always a portion for me."',
    tags: ['Always Sharing', 'Never Selfish', 'Half for Me'],
    imgSrc: '/assets/photos/raw/img2.jpeg',
  },
  {
    category: '03 — Personal ATM 💸',
    title: 'No-Questions ATM',
    speech: `"Never once asked what it was for. Never once said no. Just silently handed over the cash whenever I needed it, with a look that said 'you better pay me back.' (She never asked for it back.)"`,
    tags: ['24/7 ATM', 'Always Funded', 'Zero Questions Asked'],
    imgSrc: '/assets/photos/raw/20250930_191507.jpg',
  },
  {
    category: '04 — Family Manager 🏠',
    title: 'Family Manager',
    speech: '"Keeping everyone in line, one instruction at a time."',
    tags: ['Problem Solver', 'Always Ready', 'Runs the House'],
    imgSrc: '/assets/photos/raw/20251027_200508.jpg',
  },
  {
    category: '05 — Always There ❤️',
    title: 'Always There Award',
    speech: '"For being there through the good days, bad days, and all the random ones."',
    tags: ['My Support', 'Always There', 'No Matter What'],
    imgSrc: '/assets/photos/raw/img1.jpeg',
  },
  {
    category: '06 — Forever Sister 🫶',
    title: 'Sister for Life',
    speech: `"Fights, laughs, chaos and everything in between — wouldn't have it any other way."`,
    tags: ['Built-in Bestie', 'Partner in Crime', 'Forever Us ❤️'],
    imgSrc: '/assets/photos/raw/20250930_193824.jpg',
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

  const catEl = document.getElementById('modal-category');
  if (catEl) catEl.textContent = t.category || '';

  document.getElementById('modal-award-title').textContent = t.title;
  document.getElementById('modal-speech').textContent = t.speech;

  const tagsContainer = document.getElementById('modal-tags');
  if (tagsContainer) {
    tagsContainer.innerHTML = (t.tags || [])
      .map(tag => `<span class="modal-tag">${tag}</span>`)
      .join('<span class="modal-tag-sep">·</span>');
  }

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
