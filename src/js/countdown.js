// ── Countdown Section ──

const BIRTHDAY = new Date('2026-08-08T00:00:00+05:30');

export function initCountdown() {
  tick();
  setInterval(tick, 1000);
}

function tick() {
  const now  = new Date();
  const diff = BIRTHDAY - now;

  if (diff <= 0) {
    showBirthdayMessage();
    return;
  }

  const days  = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins  = Math.floor((diff % 3600000) / 60000);
  const secs  = Math.floor((diff % 60000) / 1000);

  setVal('cd-days',  pad(days));
  setVal('cd-hours', pad(hours));
  setVal('cd-mins',  pad(mins));
  setVal('cd-secs',  pad(secs));
}

function setVal(id, val) {
  const el = document.getElementById(id);
  if (!el) return;
  if (el.textContent !== val) {
    el.style.animation = 'none';
    el.offsetHeight; // reflow
    el.style.animation = 'num-flip 0.4s ease';
    el.textContent = val;
  }
}

function pad(n) { return String(n).padStart(2, '0'); }

function showBirthdayMessage() {
  const timer = document.getElementById('countdown-timer');
  const msg   = document.getElementById('birthday-message');
  if (timer) timer.classList.add('hidden');
  if (msg)   msg.classList.remove('hidden');
}
