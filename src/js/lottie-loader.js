// ── Lottie & SVG Animation Loader ──
// Renders rich local animated SVG visual assets without relying on fragile external Lottie CDNs

const SVG_ANIMATIONS = {
  cake: `
    <svg viewBox="0 0 100 100" style="width:100%;height:100%;filter:drop-shadow(0 6px 15px rgba(244,226,187,0.4));">
      <path d="M20 75 h60 v15 a5 5 0 0 1 -5 5 h-50 a5 5 0 0 1 -5 -5 z" fill="#E07A5F" />
      <path d="M25 55 h50 v20 h-50 z" fill="#F4E2BB" />
      <path d="M30 40 h40 v15 h-40 z" fill="#DDA15E" />
      <!-- Frosting drips -->
      <path d="M30 55 q5 8 10 0 q5 8 10 0 q5 8 10 0 q5 8 10 0" fill="none" stroke="#FFFDF9" stroke-width="4" stroke-linecap="round" />
      <!-- Candles -->
      <rect x="42" y="22" width="4" height="18" fill="#FFFDF9" rx="1"/>
      <rect x="54" y="22" width="4" height="18" fill="#FFFDF9" rx="1"/>
      <!-- Flames -->
      <ellipse cx="44" cy="17" rx="3" ry="5" fill="#F4E2BB" class="anim-glow">
        <animate attributeName="ry" values="5;7;5" dur="0.8s" repeatCount="indefinite"/>
      </ellipse>
      <ellipse cx="56" cy="17" rx="3" ry="5" fill="#F4E2BB" class="anim-glow">
        <animate attributeName="ry" values="5;7;5" dur="0.6s" repeatCount="indefinite"/>
      </ellipse>
    </svg>`,

  balloons: `
    <svg viewBox="0 0 100 100" style="width:100%;height:100%;opacity:0.85;">
      <g>
        <ellipse cx="35" cy="40" rx="16" ry="22" fill="#E07A5F" />
        <path d="M35 62 Q30 75 35 90" stroke="#FFFDF9" stroke-width="1.5" fill="none" opacity="0.6"/>
        <animateTransform attributeName="transform" type="translate" values="0 0; 0 -8; 0 0" dur="4s" repeatCount="indefinite"/>
      </g>
      <g>
        <ellipse cx="65" cy="35" rx="18" ry="24" fill="#F4E2BB" />
        <path d="M65 59 Q70 75 65 90" stroke="#FFFDF9" stroke-width="1.5" fill="none" opacity="0.6"/>
        <animateTransform attributeName="transform" type="translate" values="0 0; 0 -12; 0 0" dur="5s" repeatCount="indefinite"/>
      </g>
    </svg>`,

  trophy: `
    <svg viewBox="0 0 100 100" style="width:100%;height:100%;filter:drop-shadow(0 4px 15px rgba(244,226,187,0.3));">
      <path d="M30 25 h40 v25 q0 20 -20 20 q-20 0 -20 -20 z" fill="#F4E2BB" />
      <path d="M20 25 h10 v15 q0 10 10 10" fill="none" stroke="#F4E2BB" stroke-width="4" stroke-linecap="round"/>
      <path d="M80 25 h-10 v15 q0 10 -10 10" fill="none" stroke="#F4E2BB" stroke-width="4" stroke-linecap="round"/>
      <rect x="44" y="70" width="12" height="12" fill="#DDA15E"/>
      <rect x="30" y="82" width="40" height="10" rx="3" fill="#2B2328" stroke="#F4E2BB" stroke-width="1.5"/>
      <polygon points="50,28 53,35 60,35 55,39 57,46 50,42 43,46 45,39 40,35 47,35" fill="#E07A5F"/>
    </svg>`,

  heart: `
    <svg viewBox="0 0 100 100" style="width:100%;height:100%;filter:drop-shadow(0 4px 20px rgba(224,122,95,0.4));">
      <path d="M50 85 C20 55 10 35 30 20 C42 10 50 25 50 25 C50 25 58 10 70 20 C90 35 80 55 50 85 Z" fill="#E07A5F">
        <animateTransform attributeName="transform" type="scale" values="1; 1.08; 1" transform-origin="50 50" dur="1.5s" repeatCount="indefinite"/>
      </path>
    </svg>`,

  stars: `
    <svg viewBox="0 0 100 100" style="width:100%;height:100%;">
      <polygon points="50,10 62,38 92,38 68,56 77,85 50,67 23,85 32,56 8,38 38,38" fill="#F4E2BB">
        <animateTransform attributeName="transform" type="rotate" values="0 50 50; 360 50 50" dur="12s" repeatCount="indefinite"/>
      </polygon>
    </svg>`,

  sparkle: `
    <svg viewBox="0 0 100 100" style="width:100%;height:100%;">
      <path d="M50 10 Q50 50 90 50 Q50 50 50 90 Q50 50 10 50 Q50 50 50 10 Z" fill="#F4E2BB">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite"/>
      </path>
    </svg>`,

  confetti: `
    <svg viewBox="0 0 100 100" style="width:100%;height:100%;">
      <circle cx="20" cy="30" r="3" fill="#E07A5F"><animate attributeName="cy" values="10;90" dur="2s" repeatCount="indefinite"/></circle>
      <circle cx="50" cy="20" r="4" fill="#F4E2BB"><animate attributeName="cy" values="0;95" dur="2.5s" repeatCount="indefinite"/></circle>
      <circle cx="80" cy="40" r="3" fill="#81B29A"><animate attributeName="cy" values="20;100" dur="1.8s" repeatCount="indefinite"/></circle>
      <rect x="35" y="15" width="5" height="5" fill="#DDA15E"><animate attributeName="cy" values="5;90" dur="2.2s" repeatCount="indefinite"/></rect>
    </svg>`
};

const instances = {};

export function loadLottie(containerId, animKey) {
  const container = document.getElementById(containerId);
  if (!container) return null;

  const svgContent = SVG_ANIMATIONS[animKey] || SVG_ANIMATIONS.sparkle;
  container.innerHTML = svgContent;
  instances[containerId] = true;
  return true;
}

export function playLottie() {}
export function stopLottie() {}
export function playOnce(containerId, animKey) {
  loadLottie(containerId, animKey);
}
