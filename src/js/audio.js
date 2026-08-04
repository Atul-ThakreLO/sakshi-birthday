// ── Audio Controller ──

let audio = null;
let isPlaying = false;
const toggle = document.getElementById('music-toggle');
const iconOn  = document.getElementById('music-icon-on');
const iconOff = document.getElementById('music-icon-off');

export function initAudio() {
  audio = document.getElementById('bg-music');
  if (!audio) return;

  audio.volume = 0.45;

  toggle?.addEventListener('click', () => {
    if (isPlaying) pauseMusic(); else playMusic();
  });

  // Attempt to play immediately
  playMusic();

  // Fallback: Autoplay is often blocked by browsers until the user interacts with the page.
  // We attach a one-time listener to start the music on the first click or keypress.
  const startOnInteraction = () => {
    if (!isPlaying) {
      playMusic();
    }
    document.removeEventListener('click', startOnInteraction);
    document.removeEventListener('keydown', startOnInteraction);
    document.removeEventListener('touchstart', startOnInteraction);
  };
  
  document.addEventListener('click', startOnInteraction);
  document.addEventListener('keydown', startOnInteraction);
  document.addEventListener('touchstart', startOnInteraction);
}

export function playMusic() {
  if (!audio) return;
  const promise = audio.play();
  if (promise !== undefined) {
    promise.then(() => {
      isPlaying = true;
      updateUI(true);
      if (navigator.vibrate) navigator.vibrate(30);
    }).catch(() => {});
  }
}

export function pauseMusic() {
  if (!audio) return;
  audio.pause();
  isPlaying = false;
  updateUI(false);
}

export function setVolume(v) {
  if (audio) audio.volume = Math.max(0, Math.min(1, v));
}

function updateUI(playing) {
  toggle?.classList.toggle('playing', playing);
  if (iconOn)  iconOn.classList.toggle('hidden', playing);
  if (iconOff) iconOff.classList.toggle('hidden', !playing);
}

export function isAudioPlaying() { return isPlaying; }
