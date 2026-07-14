/* ===========================================================
   אִיּוּרֵי SVG בְּסִגְנוֹן צִבְעֵי מַיִם - נוֹצָרִים בְּקוֹד, בְּלִי טֶקְסְט מְרֻנְדָּר.
   כל פונקציה מחזירה מחרוזת SVG שמוזרקת ל-innerHTML.
   =========================================================== */
const Illustrations = (() => {

  // עֲטִיפָה מְשֻׁתֶּפֶת ליצירת <svg> עם viewBox
  function svgWrap(inner, vb = '0 0 300 200') {
    return `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">${inner}</svg>`;
  }

  // רקע שמיים רך בצבעי מים
  function sky(topColor, bottomColor) {
    return `
      <defs>
        <radialGradient id="skyGrad" cx="30%" cy="20%" r="90%">
          <stop offset="0%" stop-color="${topColor}" stop-opacity="0.55"/>
          <stop offset="100%" stop-color="${bottomColor}" stop-opacity="0.85"/>
        </radialGradient>
        <filter id="blurSoft"><feGaussianBlur stdDeviation="4"/></filter>
        <filter id="blurCloud"><feGaussianBlur stdDeviation="6"/></filter>
      </defs>
      <rect width="300" height="200" fill="url(#skyGrad)"/>
      <ellipse cx="60" cy="35" rx="34" ry="14" fill="#ffffff" opacity="0.55" filter="url(#blurCloud)"/>
      <ellipse cx="240" cy="55" rx="40" ry="16" fill="#ffffff" opacity="0.5" filter="url(#blurCloud)"/>
    `;
  }

  const scenes = {
    airport: () => svgWrap(`
      ${sky('#cfeaf5', '#9fd3ea')}
      <circle cx="255" cy="40" r="26" fill="#f6d27a" opacity="0.75" filter="url(#blurSoft)"/>
      <g transform="translate(150 115) rotate(-18)">
        <ellipse cx="0" cy="0" rx="95" ry="16" fill="#f5f2ea" stroke="#e2a020" stroke-width="2"/>
        <path d="M -95 0 L -125 -10 L -110 0 L -125 10 Z" fill="#f5f2ea" stroke="#e2a020" stroke-width="2"/>
        <path d="M -10 -6 L -45 -46 L -30 -46 L 5 -6 Z" fill="#cfeaf5" stroke="#e2a020" stroke-width="2"/>
        <path d="M -10 6 L -45 46 L -30 46 L 5 6 Z" fill="#cfeaf5" stroke="#e2a020" stroke-width="2"/>
        <circle cx="30" cy="-2" r="4" fill="#7ab8d6"/>
        <circle cx="50" cy="-2" r="4" fill="#7ab8d6"/>
        <circle cx="70" cy="-2" r="4" fill="#7ab8d6"/>
      </g>
      <rect x="0" y="178" width="300" height="22" fill="#e8e2d6" opacity="0.8"/>
    `),
    bridge: () => svgWrap(`
      ${sky('#f7e3b0', '#bcd9ec')}
      <g opacity="0.9">
        <rect x="8" y="60" width="26" height="60" fill="#d97a4f" opacity="0.8"/>
        <polygon points="4,60 21,38 38,60" fill="#c0503a" opacity="0.85"/>
        <rect x="266" y="55" width="26" height="65" fill="#d97a4f" opacity="0.8"/>
        <polygon points="262,55 279,30 296,55" fill="#c0503a" opacity="0.85"/>
      </g>
      <rect x="0" y="120" width="300" height="30" fill="#8fbfd6" opacity="0.7"/>
      <g fill="none" stroke="#e9cfa0" stroke-width="10" opacity="0.9">
        <path d="M20 122 Q 60 95 100 122"/>
        <path d="M100 122 Q 140 95 180 122"/>
        <path d="M180 122 Q 220 95 260 122"/>
      </g>
      <rect x="15" y="122" width="270" height="10" fill="#e9cfa0" opacity="0.9"/>
      <g opacity="0.85">
        <polygon points="120,116 128,116 132,108 140,116 148,116 148,120 120,120" fill="#c0503a"/>
        <polygon points="150,112 158,112 162,102 170,112 178,112 178,120 150,120" fill="#d9772a"/>
        <polygon points="180,116 188,116 192,106 200,116 208,116 208,120 180,120" fill="#c0503a"/>
      </g>
    `),
    'jewish-quarter': () => svgWrap(`
      ${sky('#e9e0c8', '#bcd9ec')}
      <g transform="translate(150 120)">
        <rect x="-60" y="-30" width="120" height="55" fill="#e8ddc4" opacity="0.85"/>
        <polygon points="-66,-30 66,-30 50,-55 -50,-55" fill="#c0503a" opacity="0.85"/>
        <polygon points="-50,-30 -38,-42 -26,-30" fill="#c0503a"/>
        <polygon points="-14,-30 -2,-42 10,-30" fill="#c0503a"/>
        <polygon points="22,-30 34,-42 46,-30" fill="#c0503a"/>
        <circle cx="0" cy="-8" r="16" fill="#f7f2e6" stroke="#e2a020" stroke-width="2"/>
        <circle cx="0" cy="-8" r="2" fill="#e2a020"/>
        <line x1="0" y1="-8" x2="0" y2="-17" stroke="#e2a020" stroke-width="1.5"/>
        <line x1="0" y1="-8" x2="7" y2="-4" stroke="#e2a020" stroke-width="1.5"/>
      </g>
      <path d="M0 170 Q 80 150 150 170 T 300 170 V200 H0 Z" fill="#8fbfd6" opacity="0.7"/>
      <g transform="translate(230 160)">
        <ellipse cx="0" cy="0" rx="14" ry="10" fill="#ffffff"/>
        <path d="M10 -4 Q 22 -8 18 2 Q 14 0 10 -4" fill="#e2751f"/>
        <circle cx="9" cy="-5" r="2" fill="#4a4038"/>
      </g>
    `),
    castle: () => svgWrap(`
      ${sky('#cfeaf5', '#a9d6c5')}
      <path d="M0 150 Q 150 120 300 150 V200 H0 Z" fill="#a9d6c5" opacity="0.8"/>
      <g transform="translate(150 105)">
        <rect x="-70" y="10" width="140" height="45" fill="#e6ddcb" opacity="0.9"/>
        <rect x="-80" y="-25" width="24" height="80" fill="#d8cdb6" opacity="0.9"/>
        <polygon points="-80,-25 -68,-48 -56,-25" fill="#c0503a"/>
        <rect x="56" y="-25" width="24" height="80" fill="#d8cdb6" opacity="0.9"/>
        <polygon points="56,-25 68,-48 80,-25" fill="#c0503a"/>
        <rect x="-14" y="-45" width="28" height="100" fill="#e6ddcb" opacity="0.95"/>
        <polygon points="-14,-45 0,-70 14,-45" fill="#c0503a"/>
        <rect x="-6" y="15" width="12" height="20" rx="6" fill="#8a6a4a"/>
      </g>
    `),
    museum: () => svgWrap(`
      ${sky('#f2e6c9', '#bcd9ec')}
      <g transform="translate(90 130)">
        <rect x="-40" y="-20" width="90" height="30" rx="6" fill="#3f6b8a"/>
        <circle cx="-25" cy="14" r="14" fill="#c0503a"/>
        <circle cx="15" cy="14" r="14" fill="#c0503a"/>
        <circle cx="-25" cy="14" r="5" fill="#f2e6c9"/>
        <circle cx="15" cy="14" r="5" fill="#f2e6c9"/>
        <rect x="45" y="-14" width="18" height="24" rx="3" fill="#3f6b8a"/>
      </g>
      <g transform="translate(210 70) rotate(-6)">
        <ellipse cx="0" cy="0" rx="46" ry="8" fill="#e8ddc4" stroke="#c0863f" stroke-width="2"/>
        <ellipse cx="0" cy="-16" rx="34" ry="7" fill="#e8ddc4" stroke="#c0863f" stroke-width="2"/>
        <line x1="-30" y1="-2" x2="-24" y2="-14" stroke="#c0863f" stroke-width="2"/>
        <line x1="10" y1="-2" x2="14" y2="-14" stroke="#c0863f" stroke-width="2"/>
      </g>
      <path d="M0 172 Q60 158 120 172 T240 172 T300 168 V200 H0 Z" fill="#a9d6c5" opacity="0.75"/>
    `)
  };

  function stageScene(key) {
    return scenes[key] ? scenes[key]() : scenes.airport();
  }

  // אייקון קטן לתפריט הבית - עיגול עם רקע נעים וסמל פשוט
  const icons = {
    airport: '✈️',
    bridge: '🌉',
    'jewish-quarter': '🕍',
    castle: '🏰',
    museum: '🦁'
  };
  function stageIcon(key) {
    return icons[key] || '⭐';
  }

  // דמות הגולם - "רובוט חימר" חייכן וחמוד
  function golem(mood = 'happy') {
    const armUp = mood === 'happy';
    return svgWrap(`
      <g transform="translate(150 150)">
        <ellipse cx="0" cy="70" rx="55" ry="10" fill="#c9a06a" opacity="0.25"/>
        <rect x="-45" y="-40" width="90" height="90" rx="26" fill="#c9855a"/>
        <rect x="-45" y="-40" width="90" height="90" rx="26" fill="url(#texGrad)" opacity="0.25"/>
        <defs>
          <linearGradient id="texGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#ffffff" stop-opacity="0.4"/>
            <stop offset="100%" stop-color="#7a4f30" stop-opacity="0.3"/>
          </linearGradient>
        </defs>
        <rect x="-70" y="-15" width="26" height="60" rx="13" fill="#c9855a" transform="rotate(${armUp ? -35 : -8} -57 15)"/>
        <rect x="44" y="-15" width="26" height="60" rx="13" fill="#c9855a" transform="rotate(${armUp ? 35 : 8} 57 15)"/>
        <rect x="-30" y="45" width="24" height="34" rx="10" fill="#a9683f"/>
        <rect x="6" y="45" width="24" height="34" rx="10" fill="#a9683f"/>
        <circle cx="-20" cy="-8" r="9" fill="#3a2a20"/>
        <circle cx="20" cy="-8" r="9" fill="#3a2a20"/>
        <circle cx="-17" cy="-11" r="3" fill="#fff"/>
        <circle cx="23" cy="-11" r="3" fill="#fff"/>
        <circle cx="-32" cy="8" r="7" fill="#e2884f" opacity="0.5"/>
        <circle cx="32" cy="8" r="7" fill="#e2884f" opacity="0.5"/>
        <path d="M -16 16 Q 0 28 16 16" stroke="#3a2a20" stroke-width="3" fill="none" stroke-linecap="round"/>
      </g>
    `, '30 50 240 240');
  }

  // דמות גלגל שיניים חמודה
  function gear(mood = 'happy') {
    const teeth = [];
    const n = 8;
    for (let i = 0; i < n; i++) {
      const a = (i / n) * 2 * Math.PI;
      const x = 150 + Math.cos(a) * 46;
      const y = 150 + Math.sin(a) * 46;
      teeth.push(`<rect x="${x - 8}" y="${y - 8}" width="16" height="16" rx="3" fill="#e2a020" transform="rotate(${(a * 180 / Math.PI)} ${x} ${y})"/>`);
    }
    return svgWrap(`
      <g>
        ${teeth.join('')}
        <circle cx="150" cy="150" r="42" fill="#f0b429"/>
        <circle cx="150" cy="150" r="42" fill="url(#gearShine)" opacity="0.3"/>
        <defs>
          <radialGradient id="gearShine" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#ffffff" stop-opacity="0.7"/>
            <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <circle cx="150" cy="150" r="15" fill="#fff8ec"/>
        <circle cx="140" cy="145" r="6" fill="#3a2a20"/>
        <circle cx="160" cy="145" r="6" fill="#3a2a20"/>
        <circle cx="138" cy="143" r="2" fill="#fff"/>
        <circle cx="158" cy="143" r="2" fill="#fff"/>
        <path d="M 140 158 Q 150 166 160 158" stroke="#3a2a20" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <circle cx="130" cy="153" r="4" fill="#e2751f" opacity="0.5"/>
        <circle cx="170" cy="153" r="4" fill="#e2751f" opacity="0.5"/>
      </g>
    `, '85 85 130 130');
  }

  // רקע נייר עדין (רעש עדין) - data URI לשימוש חוזר
  const paperNoise = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.045'/%3E%3C/svg%3E";

  return { stageScene, stageIcon, golem, gear, paperNoise };
})();
