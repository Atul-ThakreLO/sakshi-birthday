// ── Birthday Quiz ──

const QUESTIONS = [
  {
    q: "What's the most common reason we argue?",
    options: ['Bathroom queue', 'Fighting over the TV remote', 'Snack theft', 'WiFi speed'],
    correct: 1,
  },
  {
    q: "What's the first thing I do after waking up?",
    options: ['Go for a 5km morning run 🏃', 'Quietly meditate in peace 🧘', 'Wake up other family members 📢', 'Drink green tea & do yoga 🍵'],
    correct: 2,
  },
  {
    q: "What is my ultimate obsession & favorite topic to talk about?",
    options: ['Daily soap serials 📺', 'Cars, cricket & tech (mobiles, laptops) 🚗🏏📱', 'Bollywood gossip 🎬', 'Horoscope predictions 🔮'],
    correct: 1,
  },
  {
    q: "Which signature dialogue do I say the most?",
    options: [
      '"Just 5 more minutes"',
      '"Ashi gosth aahe tula vatte majak"',
      '"I was just about to do that"',
      '"Not my fault honestly"',
    ],
    correct: 1,
  },
  {
    q: "What is my actual love language?",
    options: [
      'Sweet words of affirmation',
      'Being annoying, tap on forehead, teasing & asking for expensive gifts',
      'Doing all the chores silently',
      'Sending wholesome reels',
    ],
    correct: 1,
  },
];

let current = 0;
let score = 0;
let answered = false;

export function initQuiz() {
  renderQuestion(0);
  document.getElementById('quiz-retry')?.addEventListener('click', resetQuiz);
}

function renderQuestion(index) {
  const q = QUESTIONS[index];
  answered = false;

  const qEl   = document.getElementById('quiz-question');
  const numEl = document.getElementById('quiz-q-num');
  const progEl = document.getElementById('quiz-progress');
  const optEl = document.getElementById('quiz-options');

  if (qEl)   qEl.textContent = q.q;
  if (numEl) numEl.textContent = `Question ${index + 1} of ${QUESTIONS.length}`;
  if (progEl) progEl.style.width = `${((index) / QUESTIONS.length) * 100}%`;
  if (optEl) {
    optEl.innerHTML = '';
    q.options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option';
      btn.textContent = opt;
      btn.id = `quiz-opt-${i}`;
      btn.addEventListener('click', () => selectAnswer(i, index));
      optEl.appendChild(btn);
    });
  }
}

function selectAnswer(selected, qIndex) {
  if (answered) return;
  answered = true;

  const q = QUESTIONS[qIndex];
  const opts = document.querySelectorAll('.quiz-option');

  opts.forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.correct) btn.classList.add('correct');
    else if (i === selected && selected !== q.correct) btn.classList.add('wrong');
  });

  if (selected === q.correct) {
    score++;
    if (navigator.vibrate) navigator.vibrate(40);
  }

  setTimeout(() => {
    if (qIndex < QUESTIONS.length - 1) {
      current++;
      renderQuestion(current);
    } else {
      showResult();
    }
  }, 1000);
}

function showResult() {
  document.getElementById('quiz-card')?.classList.add('hidden');
  const result = document.getElementById('quiz-result');
  result?.classList.remove('hidden');

  document.getElementById('quiz-score-num').textContent = `${score}/${QUESTIONS.length}`;

  const titles = ['Stranger Danger 😬', 'Getting There 🙂', 'Solid Sibling 👍', 'Expert Level 🧠', 'Certified Legend 🏆'];
  const subs = [
    "We need to hang out more. A lot more.",
    "You know the basics. Room to grow.",
    "Not bad! You clearly pay attention.",
    "Okay, you really do know me!",
    "You passed with flying colours. Gold star. 💛",
  ];

  const idx = Math.min(score, 4);
  document.getElementById('quiz-score-title').textContent = titles[idx];
  document.getElementById('quiz-score-sub').textContent   = subs[idx];

  const progEl = document.getElementById('quiz-progress');
  if (progEl) progEl.style.width = '100%';
}

function resetQuiz() {
  current = 0;
  score = 0;
  document.getElementById('quiz-result')?.classList.add('hidden');
  document.getElementById('quiz-card')?.classList.remove('hidden');
  renderQuestion(0);
}
