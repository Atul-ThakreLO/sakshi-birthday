// ── Memory Lane ──
// Polaroid flip + Easter Egg (5-tap unlock)

let eggTaps = 0;
let eggTimer = null;

export function initMemoryLane() {
  // Polaroid flip on tap
  document.querySelectorAll('.polaroid').forEach(p => {
    p.addEventListener('click', () => p.classList.toggle('flipped'));
    p.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') p.classList.toggle('flipped');
    });
  });

  // Easter egg: 5 taps on polaroid-3
  const eggPhoto = document.getElementById('polaroid-3');
  eggPhoto?.addEventListener('click', handleEasterEgg);

  // Close Easter egg modal
  document.getElementById('easter-modal-close')?.addEventListener('click', closeEasterModal);
  document.getElementById('easter-modal')?.addEventListener('click', e => {
    if (e.target.id === 'easter-modal') closeEasterModal();
  });

  // GSAP stagger reveal on scroll into section
  animateTimelineEntries();
}

function handleEasterEgg(e) {
  e.stopPropagation(); // don't flip simultaneously

  eggTaps++;
  if (eggTimer) clearTimeout(eggTimer);

  // Visual feedback
  const el = document.getElementById('polaroid-3');
  if (el) {
    el.style.transform = `scale(${1 + eggTaps * 0.04}) rotate(${eggTaps % 2 === 0 ? -3 : 3}deg)`;
    setTimeout(() => { el.style.transform = ''; }, 300);
  }

  if (eggTaps >= 5) {
    eggTaps = 0;
    openEasterModal();
    if (navigator.vibrate) navigator.vibrate([50, 30, 50, 30, 100]);
    return;
  }

  eggTimer = setTimeout(() => { eggTaps = 0; }, 2500);
}

function openEasterModal() {
  document.getElementById('easter-modal')?.classList.remove('hidden');
}

function closeEasterModal() {
  document.getElementById('easter-modal')?.classList.add('hidden');
}

function animateTimelineEntries() {
  if (typeof gsap === 'undefined') return;

  gsap.utils.toArray('.timeline-entry').forEach((entry, i) => {
    gsap.fromTo(entry,
      { opacity: 0, x: entry.classList.contains('left') ? -40 : 40 },
      {
        opacity: 1, x: 0, duration: 0.6, delay: i * 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: entry,
          scroller: '#section-memory',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        }
      }
    );
  });
}
