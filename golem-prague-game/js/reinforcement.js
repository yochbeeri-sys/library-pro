/* ===========================================================
   חִזּוּקִים חִיּוּבִיִּים - קוֹנְפֶטִי, מִשְׁפְּטֵי עִדּוּד, צְלִיל עֲדִין
   =========================================================== */
const Reinforcement = (() => {
  let audioCtx = null;

  function playChime() {
    if (GameStorage.isMuted()) return;
    try {
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      const now = audioCtx.currentTime;
      const notes = [523.25, 659.25, 783.99]; // דו-מי-סול, צליל עליז קצר
      notes.forEach((freq, i) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;
        const start = now + i * 0.09;
        gain.gain.setValueAtTime(0, start);
        gain.gain.linearRampToValueAtTime(0.18, start + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.35);
        osc.connect(gain).connect(audioCtx.destination);
        osc.start(start);
        osc.stop(start + 0.4);
      });
    } catch (e) { /* Web Audio לא זמין - מתעלמים בשקט */ }
  }

  function randomFrom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  const CONFETTI_COLORS = ['#e2a020', '#7ab8d6', '#a9d6c5', '#d9772a', '#c0503a', '#f0e0b0'];
  const CONFETTI_SHAPES = ['circle', 'drop', 'star'];

  function shapeMarkup(shape, color) {
    if (shape === 'circle') return `<div style="width:100%;height:100%;border-radius:50%;background:${color}"></div>`;
    if (shape === 'drop') return `<div style="width:100%;height:100%;border-radius:70% 70% 70% 0;background:${color}"></div>`;
    return `<div style="width:100%;height:100%;background:${color};clip-path:polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)"></div>`;
  }

  function burstConfetti(container) {
    const pieceCount = 26;
    for (let i = 0; i < pieceCount; i++) {
      const el = document.createElement('div');
      el.className = 'confetti-piece';
      const size = 8 + Math.random() * 10;
      const left = Math.random() * 100;
      const delay = Math.random() * 0.25;
      const duration = 1.6 + Math.random() * 1.1;
      const rotate = Math.random() * 360;
      const color = randomFrom(CONFETTI_COLORS);
      const shape = randomFrom(CONFETTI_SHAPES);
      el.style.cssText = `left:${left}%;width:${size}px;height:${size}px;animation-delay:${delay}s;animation-duration:${duration}s;--rot:${rotate}deg;`;
      el.innerHTML = shapeMarkup(shape, color);
      container.appendChild(el);
      el.addEventListener('animationend', () => el.remove());
    }
  }

  function celebrate(container) {
    burstConfetti(container);
    playChime();
    return randomFrom(PRAISE_PHRASES);
  }

  function encourageRetry() {
    return randomFrom(TRY_AGAIN_PHRASES);
  }

  return { celebrate, encourageRetry, playChime };
})();
