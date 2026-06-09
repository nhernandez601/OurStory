/* ============================================================
   OUR STORY — Character SVG Avatar Generator (Anime Art Style)
   Full anime-illustrated characters for Noe and the Player
   Noe: dark wavy black hair, blue rectangular glasses, full beard,
        warm olive/tan Latino skin, stocky build, red hoodie
   ============================================================ */

const Characters = (() => {

  /* ── Unique gradient ID counter ─────────────────────────── */
  let _id = 0;
  const uid = () => 'av' + (++_id) + '_';

  /* ── Color palettes ──────────────────────────────────────── */
  const skinTones = {
    s1: { base: '#FDDBB4', mid: '#F0C99A', shadow: '#E0A870', lip: '#D4876A' },
    s2: { base: '#E8B89A', mid: '#D4A07A', shadow: '#C9966A', lip: '#B5704A' },
    s3: { base: '#C87D4C', mid: '#B5683A', shadow: '#A0623A', lip: '#8B4A2A' },
    s4: { base: '#8D5524', mid: '#7A4418', shadow: '#6B3A18', lip: '#5A2E12' },
    s5: { base: '#4A2C17', mid: '#3D2210', shadow: '#331D0E', lip: '#2A1508' },
  };

  const hairColors = {
    hc1: '#1a1a1a', hc2: '#5C3317', hc3: '#D4A017',
    hc4: '#8B1A1A', hc5: '#4B0082',
  };

  /* ── Noe's outfit color palettes ─────────────────────────── */
  const outfitColors = {
    'red-hoodie':  { top: '#C0392B', shad: '#8B2020', lit: '#E74C3C', inner: '#D44030' },
    'dark-hoodie': { top: '#2C3E50', shad: '#1A252F', lit: '#3D5468', inner: '#364E63' },
    'casual':      { top: '#2980B9', shad: '#1A5276', lit: '#3498DB', inner: null },
    'dapper':      { top: '#1C2833', shad: '#0E1720', lit: '#2C3E50', inner: null },
  };

  /* ── Emotion table ───────────────────────────────────────── */
  const emotions = {
    neutral:   { eyeT: 'normal',  browT: 'normal',  mouth: 'M 82,235 Q 100,244 118,235' },
    happy:     { eyeT: 'happy',   browT: 'raised',  mouth: 'M 78,233 Q 100,248 122,233' },
    laughing:  { eyeT: 'laugh',   browT: 'raised',  mouth: 'M 78,232 Q 100,252 122,232' },
    thinking:  { eyeT: 'think',   browT: 'ponder',  mouth: 'M 83,236 Q 96,242 112,238' },
    nervous:   { eyeT: 'wide',    browT: 'worried', mouth: 'M 82,238 Q 100,235 118,238' },
    flustered: { eyeT: 'happy',   browT: 'raised',  mouth: 'M 82,237 Q 100,245 118,237' },
    serious:   { eyeT: 'narrow',  browT: 'serious', mouth: 'M 84,237 Q 100,240 116,237' },
    excited:   { eyeT: 'star',    browT: 'raised',  mouth: 'M 77,231 Q 100,252 123,231' },
  };

  /* ── Anime eye renderer ──────────────────────────────────── */
  // type: normal | happy | laugh | think | narrow | wide | star
  // scaleY multipliers: normal=1, happy=0.88, think=0.7, narrow=0.5, wide=1.15
  function animeEye(cx, cy, type, p, glassesOn) {
    const scaleMap = { normal: 1, happy: 0.88, laugh: 0, think: 0.7, narrow: 0.5, wide: 1.15, star: 1 };
    const sy = scaleMap[type] !== undefined ? scaleMap[type] : 1;
    const rx = 13, ry = 10;

    if (type === 'star') {
      return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="white"/>
              <text x="${cx}" y="${cy + 5}" text-anchor="middle" font-size="13" fill="#FFD700" font-family="serif">★</text>
              <path d="M ${cx - rx},${cy} Q ${cx},${cy - ry * 1.4} ${cx + rx},${cy}" stroke="#1a1a1a" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;
    }

    if (type === 'laugh') {
      // closed laugh arc
      return `<path d="M ${cx - rx},${cy} Q ${cx},${cy + ry * 1.3} ${cx + rx},${cy}" stroke="#1a1a1a" stroke-width="2.8" fill="none" stroke-linecap="round"/>
              <path d="M ${cx - rx},${cy} Q ${cx},${cy - ry * 0.5} ${cx + rx},${cy}" stroke="#1a1a1a" stroke-width="1.5" fill="rgba(255,255,255,0.4)" stroke-linecap="round"/>`;
    }

    const eyeRy = ry * sy;
    const irisR = 6.5 * (sy < 0.6 ? sy + 0.4 : sy > 1.1 ? 1 : sy);
    const pupilR = irisR * 0.5;

    return `<defs>
      <radialGradient id="${p}iris_${cx}" cx="50%" cy="40%" r="55%">
        <stop offset="0%" stop-color="#4A90D9"/>
        <stop offset="50%" stop-color="#1E3A8A"/>
        <stop offset="100%" stop-color="#0D1F5C"/>
      </radialGradient>
    </defs>
    <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${Math.max(eyeRy, 1)}" fill="white"/>
    <ellipse cx="${cx}" cy="${cy}" rx="${irisR}" ry="${Math.max(irisR * 0.95, 1)}" fill="url(#${p}iris_${cx})"/>
    <ellipse cx="${cx}" cy="${cy}" rx="${pupilR}" ry="${Math.max(pupilR * 0.95, 0.5)}" fill="#0D0D0D"/>
    <ellipse cx="${cx + 3}" cy="${cy - 2.5}" rx="${irisR * 0.38}" ry="${irisR * 0.28}" fill="rgba(255,255,255,0.92)"/>
    <circle cx="${cx - 2.5}" cy="${cy + 2}" r="${irisR * 0.18}" fill="rgba(255,255,255,0.75)"/>
    <path d="M ${cx - rx},${cy - eyeRy * 0.7} Q ${cx},${cy - eyeRy * 1.35} ${cx + rx},${cy - eyeRy * 0.7}" stroke="#1a1a1a" stroke-width="2.4" fill="none" stroke-linecap="round"/>
    <line x1="${cx - rx * 0.85}" y1="${cy + Math.max(eyeRy * 0.85, 0.8)}" x2="${cx + rx * 0.85}" y2="${cy + Math.max(eyeRy * 0.85, 0.8)}" stroke="#1a1a1a" stroke-width="1" opacity="0.6"/>`;
  }

  /* ── Anime brow renderer ─────────────────────────────────── */
  // browT: normal | raised | worried | serious | ponder
  // side: 'L' or 'R'
  function animeBrow(cx, cy, browT, side) {
    const base = `stroke="#1a1a1a" stroke-width="3.2" fill="none" stroke-linecap="round"`;
    if (browT === 'raised') {
      return `<path d="M ${cx-13},${cy-6} Q ${cx},${cy-13} ${cx+13},${cy-6}" ${base}/>`;
    }
    if (browT === 'worried') {
      // Inner corners (toward nose) go up — mirror by side
      // L: left end is outer, right end is inner → right end (toward nose) raised
      // R: left end is inner, right end is outer → left end (toward nose) raised
      if (side === 'L') {
        return `<path d="M ${cx-13},${cy-3} Q ${cx},${cy-9} ${cx+13},${cy-10}" ${base}/>`;
      } else {
        return `<path d="M ${cx-13},${cy-10} Q ${cx},${cy-9} ${cx+13},${cy-3}" ${base}/>`;
      }
    }
    if (browT === 'serious') {
      return `<path d="M ${cx-13},${cy-6} Q ${cx},${cy-5} ${cx+13},${cy-6}" ${base}/>`;
    }
    if (browT === 'ponder') {
      if (side === 'L') {
        return `<path d="M ${cx-13},${cy-7} Q ${cx},${cy-5} ${cx+13},${cy-7}" ${base}/>`;
      } else {
        return `<path d="M ${cx-13},${cy-5} Q ${cx},${cy-7} ${cx+13},${cy-5}" ${base}/>`;
      }
    }
    // normal
    return `<path d="M ${cx-13},${cy-6} Q ${cx},${cy-9} ${cx+13},${cy-6}" ${base}/>`;
  }

  /* ── Generate Noe SVG ────────────────────────────────────── */
  function noe(opts = {}) {
    const outfit  = opts.outfit  || 'red-hoodie';
    const hair    = opts.hair    || 'curly';
    const glasses = opts.glasses !== false;
    const emotion = opts.emotion || 'neutral';
    const colors  = outfitColors[outfit] || outfitColors['red-hoodie'];
    const emo     = emotions[emotion]    || emotions.neutral;
    const p       = uid(); // unique prefix for gradient IDs

    // Noe's skin — warm olive/tan Latino
    const skBase   = '#C47840';
    const skMid    = '#A8622E';
    const skShadow = '#8B4A20';
    const skLip    = '#7A3E22';

    // ── Skin radialGradient ──
    const skinGrad = `
      <radialGradient id="${p}sk" cx="45%" cy="38%" r="62%">
        <stop offset="0%"   stop-color="#D98B50"/>
        <stop offset="50%"  stop-color="${skBase}"/>
        <stop offset="100%" stop-color="${skShadow}"/>
      </radialGradient>`;

    // ── Hair layers ──
    let hairSvg = '';
    if (hair === 'neat') {
      hairSvg = `
        <ellipse cx="100" cy="144" rx="63" ry="32" fill="#1a1a1a"/>
        <path d="M 38,158 Q 100,126 162,158 Q 162,136 100,128 Q 38,136 38,158Z" fill="#1a1a1a"/>
        <path d="M 52,148 Q 100,135 148,148" stroke="#3a3a3a" stroke-width="2" fill="none" opacity="0.5"/>`;
    } else if (hair === 'wild') {
      hairSvg = `
        <ellipse cx="100" cy="140" rx="70" ry="40" fill="#1a1a1a"/>
        <path d="M 36,160 Q 28,118 44,108 Q 56,124 50,148Z" fill="#1a1a1a"/>
        <path d="M 164,160 Q 172,118 156,108 Q 144,124 150,148Z" fill="#1a1a1a"/>
        <path d="M 68,120 Q 72,98 84,110Z" fill="#1a1a1a"/>
        <path d="M 98,114 Q 102,94 114,106Z" fill="#1a1a1a"/>
        <path d="M 128,118 Q 138,102 148,113Z" fill="#1a1a1a"/>
        <path d="M 42,148 Q 48,132 60,138" stroke="#4a4a4a" stroke-width="1.5" fill="none" opacity="0.4"/>
        <path d="M 158,148 Q 152,132 140,138" stroke="#4a4a4a" stroke-width="1.5" fill="none" opacity="0.4"/>`;
    } else {
      // curly (default) — voluminous, messy, multiple directions
      hairSvg = `
        <ellipse cx="100" cy="144" rx="66" ry="36" fill="#1a1a1a"/>
        <circle cx="42"  cy="168" r="23" fill="#1a1a1a"/>
        <circle cx="158" cy="168" r="23" fill="#1a1a1a"/>
        <circle cx="62"  cy="136" r="20" fill="#1a1a1a"/>
        <circle cx="138" cy="136" r="20" fill="#1a1a1a"/>
        <circle cx="100" cy="128" r="21" fill="#1a1a1a"/>
        <path d="M 46,154 Q 52,138 66,145" stroke="#3a3a3a" stroke-width="2" fill="none" opacity="0.45"/>
        <path d="M 154,154 Q 148,138 134,145" stroke="#3a3a3a" stroke-width="2" fill="none" opacity="0.45"/>
        <path d="M 80,128 Q 88,114 100,122" stroke="#3a3a3a" stroke-width="2" fill="none" opacity="0.45"/>
        <path d="M 120,128 Q 112,114 100,122" stroke="#3a3a3a" stroke-width="2" fill="none" opacity="0.45"/>`;
    }

    // ── Glasses ──
    const glassesGroup = glasses ? `
      <rect x="55"  y="189" width="38" height="24" rx="4" ry="4" fill="rgba(135,206,235,0.12)" stroke="#1A56DB" stroke-width="3.2"/>
      <rect x="107" y="189" width="38" height="24" rx="4" ry="4" fill="rgba(135,206,235,0.12)" stroke="#1A56DB" stroke-width="3.2"/>
      <line x1="93"  y1="199" x2="107" y2="199" stroke="#1A56DB" stroke-width="2.5"/>
      <line x1="55"  y1="197" x2="36"  y2="200" stroke="#1A56DB" stroke-width="2.2"/>
      <line x1="145" y1="197" x2="164" y2="200" stroke="#1A56DB" stroke-width="2.2"/>` : '';

    // ── Body / outfit ──
    const isHoodie = outfit === 'red-hoodie' || outfit === 'dark-hoodie';
    const bodyGrad = `
      <radialGradient id="${p}body" cx="38%" cy="30%" r="65%">
        <stop offset="0%"   stop-color="${colors.lit}"/>
        <stop offset="50%"  stop-color="${colors.top}"/>
        <stop offset="100%" stop-color="${colors.shad}"/>
      </radialGradient>`;

    const shoulderEllipses = `
      <ellipse cx="22"  cy="310" rx="35" ry="30" fill="url(#${p}body)"/>
      <ellipse cx="178" cy="310" rx="35" ry="30" fill="url(#${p}body)"/>`;

    const torso = `<ellipse cx="100" cy="408" rx="106" ry="114" fill="url(#${p}body)"/>`;

    let outfitDetail = '';
    if (isHoodie) {
      const innerColor = colors.inner || colors.top;
      outfitDetail = `
        <!-- Hoodie chest panel / kangaroo pocket area -->
        <path d="M 54,280 Q 78,270 100,272 Q 122,270 146,280 L 152,308 Q 122,318 100,316 Q 78,318 48,308Z" fill="${innerColor}"/>
        <!-- Drawstrings -->
        <line x1="91"  y1="284" x2="86"  y2="408" stroke="${colors.shad}" stroke-width="3.5" stroke-linecap="round"/>
        <line x1="109" y1="284" x2="114" y2="408" stroke="${colors.shad}" stroke-width="3.5" stroke-linecap="round"/>
        <circle cx="86"  cy="408" r="5.5" fill="${colors.shad}"/>
        <circle cx="114" cy="408" r="5.5" fill="${colors.shad}"/>
        <!-- Kangaroo pocket -->
        <path d="M 72,360 Q 100,354 128,360 L 126,400 Q 100,408 74,400Z" fill="${colors.shad}" opacity="0.45"/>
        <path d="M 72,360 Q 100,354 128,360" stroke="${colors.shad}" stroke-width="2" fill="none"/>`;
    } else if (outfit === 'dapper') {
      outfitDetail = `
        <rect x="76" y="274" width="48" height="136" fill="#ECF0F1"/>
        <path d="M 76,274 L 58,295 L 76,332Z" fill="#C0392B"/>
        <path d="M 124,274 L 142,295 L 124,332Z" fill="#C0392B"/>
        <line x1="100" y1="296" x2="100" y2="408" stroke="#BDC3C7" stroke-width="1.5"/>
        <ellipse cx="100" cy="310" r="3" fill="${colors.shad}"/>
        <ellipse cx="100" cy="330" r="3" fill="${colors.shad}"/>`;
    } else {
      outfitDetail = `
        <rect x="80" y="276" width="40" height="136" fill="rgba(255,255,255,0.14)"/>`;
    }

    // ── Thinking hand (palm + 3 fingers) ──
    const thinkingHand = emotion === 'thinking'
      ? `<ellipse cx="72" cy="274" rx="23" ry="14" fill="url(#${p}sk)"/>
         <rect x="61" y="258" width="11" height="23" rx="5.5" fill="url(#${p}sk)"/>
         <rect x="74" y="256" width="11" height="23" rx="5.5" fill="url(#${p}sk)"/>
         <rect x="86" y="260" width="11" height="19" rx="5.5" fill="url(#${p}sk)"/>`
      : '';

    // ── Blush ──
    const blush = (emotion === 'flustered' || emotion === 'excited')
      ? `<ellipse cx="65"  cy="213" rx="14" ry="7" fill="rgba(255,100,100,0.28)"/>
         <ellipse cx="135" cy="213" rx="14" ry="7" fill="rgba(255,100,100,0.28)"/>`
      : '';

    // ── Sweat drop ──
    const sweat = emotion === 'nervous'
      ? `<path d="M 150,158 Q 153,148 156,158 Q 156,164 153,165 Q 150,164 150,158Z" fill="rgba(100,180,255,0.75)"/>`
      : '';

    // ── Open mouth fill ──
    const mouthFill = (emotion === 'laughing' || emotion === 'excited')
      ? `<path d="M 80,234 Q 100,252 120,234 Q 112,248 100,250 Q 88,248 80,234Z" fill="#7B1F1F"/>`
      : '';

    return `<svg viewBox="0 0 200 480" xmlns="http://www.w3.org/2000/svg">
  <defs>
    ${skinGrad}
    ${bodyGrad}
  </defs>
  <!-- Body torso + shoulders -->
  ${torso}
  ${shoulderEllipses}
  ${outfitDetail}
  <!-- Neck -->
  <rect x="88" y="252" width="24" height="28" rx="8" fill="url(#${p}sk)"/>
  <!-- Head -->
  <ellipse cx="100" cy="200" rx="64" ry="68" fill="url(#${p}sk)"/>
  <!-- Chin shadow -->
  <ellipse cx="100" cy="248" rx="28" ry="7" fill="${skShadow}" opacity="0.35"/>
  <!-- Ears -->
  <ellipse cx="37"  cy="204" rx="10" ry="15" fill="url(#${p}sk)"/>
  <ellipse cx="163" cy="204" rx="10" ry="15" fill="url(#${p}sk)"/>
  <ellipse cx="37"  cy="204" rx="6"  ry="9"  fill="${skShadow}" opacity="0.4"/>
  <ellipse cx="163" cy="204" rx="6"  ry="9"  fill="${skShadow}" opacity="0.4"/>
  <!-- Hair (behind face) -->
  ${hairSvg}
  <!-- Face highlight -->
  <ellipse cx="88" cy="183" rx="20" ry="25" fill="rgba(255,255,255,0.07)"/>
  <!-- Eyebrows -->
  ${animeBrow(74,  186, emo.browT, 'L')}
  ${animeBrow(126, 186, emo.browT, 'R')}
  <!-- Eyes -->
  ${animeEye(74,  201, emo.eyeT, p, glasses)}
  ${animeEye(126, 201, emo.eyeT, p, glasses)}
  <!-- Glasses (over eyes) -->
  ${glassesGroup}
  <!-- Nose -->
  <path d="M 96,211 Q 92,223 97,228 Q 100,231 103,228 Q 108,223 104,211" fill="${skShadow}" opacity="0.55"/>
  <!-- Beard area -->
  <ellipse cx="100" cy="238" rx="46" ry="23" fill="#231E13" opacity="0.88"/>
  <path d="M 55,225 Q 100,268 145,225 Q 128,260 100,263 Q 72,260 55,225Z" fill="#1A1608"/>
  <!-- Mustache -->
  <path d="M 76,224 Q 88,232 100,228 Q 112,232 124,224" fill="#1A1608"/>
  <!-- Beard highlight strands -->
  <path d="M 68,238 Q 75,252 80,260" stroke="#3a3020" stroke-width="1.2" fill="none" opacity="0.5"/>
  <path d="M 100,240 Q 100,256 100,265" stroke="#3a3020" stroke-width="1.2" fill="none" opacity="0.5"/>
  <path d="M 132,238 Q 125,252 120,260" stroke="#3a3020" stroke-width="1.2" fill="none" opacity="0.5"/>
  <!-- Open mouth fill -->
  ${mouthFill}
  <!-- Mouth -->
  <path d="${emo.mouth}" fill="none" stroke="${skLip}" stroke-width="2.5" stroke-linecap="round"/>
  <!-- Blush -->
  ${blush}
  <!-- Sweat drop -->
  ${sweat}
  <!-- Thinking hand -->
  ${thinkingHand}
</svg>`;
  }

  /* ── Generate Player SVG ─────────────────────────────────── */
  function player(opts = {}) {
    const skinKey  = opts.skin      || 's2';
    const hairKey  = opts.hairColor || 'hc1';
    const style    = opts.hairStyle || 'wave';
    const skin     = skinTones[skinKey]  || skinTones.s2;
    const hColor   = hairColors[hairKey] || '#1a1a1a';
    const p        = uid();

    const sk   = skin.base;
    const skSh = skin.shadow;
    const skLip = skin.lip;

    // Skin gradient
    const skinGrad = `
      <radialGradient id="${p}psk" cx="44%" cy="36%" r="60%">
        <stop offset="0%"   stop-color="${skin.mid}" stop-opacity="1"/>
        <stop offset="45%"  stop-color="${sk}"/>
        <stop offset="100%" stop-color="${skSh}"/>
      </radialGradient>`;

    // Iris gradient (blue)
    const irisGrad = `
      <radialGradient id="${p}iris" cx="50%" cy="40%" r="55%">
        <stop offset="0%"   stop-color="#74B3F0"/>
        <stop offset="55%"  stop-color="#2F78D4"/>
        <stop offset="100%" stop-color="#1040A0"/>
      </radialGradient>`;

    // Hair variations
    let hairGroup = '';
    if (style === 'short') {
      hairGroup = `
        <ellipse cx="100" cy="148" rx="62" ry="30" fill="${hColor}"/>
        <rect x="38" y="148" width="124" height="22" rx="2" fill="${hColor}"/>
        <path d="M 50,148 Q 100,138 150,148" stroke="${hColor}" stroke-width="2" fill="none" opacity="0.5"/>`;
    } else if (style === 'long') {
      hairGroup = `
        <ellipse cx="100" cy="140" rx="63" ry="36" fill="${hColor}"/>
        <path d="M 37,170 Q 28,260 36,380" stroke="${hColor}" stroke-width="15" fill="none" stroke-linecap="round"/>
        <path d="M 163,170 Q 172,260 164,380" stroke="${hColor}" stroke-width="15" fill="none" stroke-linecap="round"/>
        <path d="M 42,175 Q 34,265 40,375" stroke="${hColor}" stroke-width="6" fill="none" stroke-linecap="round" opacity="0.4"/>`;
    } else if (style === 'curly') {
      hairGroup = `
        <ellipse cx="100" cy="140" rx="66" ry="40" fill="${hColor}"/>
        <circle cx="42"  cy="165" r="23" fill="${hColor}"/>
        <circle cx="158" cy="165" r="23" fill="${hColor}"/>
        <circle cx="100" cy="128" r="21" fill="${hColor}"/>
        <path d="M 36,180 Q 28,240 38,340 Q 30,370 40,420" stroke="${hColor}" stroke-width="15" fill="none" stroke-linecap="round"/>
        <path d="M 164,180 Q 172,240 162,340 Q 170,370 160,420" stroke="${hColor}" stroke-width="15" fill="none" stroke-linecap="round"/>`;
    } else {
      // wave (default)
      hairGroup = `
        <ellipse cx="100" cy="142" rx="64" ry="35" fill="${hColor}"/>
        <path d="M 36,165 Q 46,218 36,286 Q 32,324 40,380" stroke="${hColor}" stroke-width="14" fill="none" stroke-linecap="round"/>
        <path d="M 164,165 Q 154,218 164,286 Q 168,324 160,380" stroke="${hColor}" stroke-width="14" fill="none" stroke-linecap="round"/>
        <path d="M 41,170 Q 50,222 40,288" stroke="${hColor}" stroke-width="5" fill="none" stroke-linecap="round" opacity="0.38"/>`;
    }

    return `<svg viewBox="0 0 200 480" xmlns="http://www.w3.org/2000/svg">
  <defs>
    ${skinGrad}
    ${irisGrad}
  </defs>
  <!-- Body / outfit (purple) -->
  <ellipse cx="100" cy="400" rx="84" ry="108" fill="#7D3C98"/>
  <ellipse cx="22"  cy="316" rx="30" ry="25" fill="#7D3C98"/>
  <ellipse cx="178" cy="316" rx="30" ry="25" fill="#7D3C98"/>
  <rect x="80" y="274" width="40" height="130" fill="rgba(255,255,255,0.15)"/>
  <!-- Neck -->
  <rect x="88" y="252" width="24" height="28" rx="8" fill="url(#${p}psk)"/>
  <!-- Head -->
  <ellipse cx="100" cy="200" rx="61" ry="67" fill="url(#${p}psk)"/>
  <!-- Chin shadow -->
  <ellipse cx="100" cy="247" rx="26" ry="6" fill="${skSh}" opacity="0.3"/>
  <!-- Ears -->
  <ellipse cx="40"  cy="203" rx="9"  ry="14" fill="url(#${p}psk)"/>
  <ellipse cx="160" cy="203" rx="9"  ry="14" fill="url(#${p}psk)"/>
  <ellipse cx="40"  cy="203" rx="5.5" ry="8.5" fill="${skSh}" opacity="0.35"/>
  <ellipse cx="160" cy="203" rx="5.5" ry="8.5" fill="${skSh}" opacity="0.35"/>
  <!-- Hair -->
  ${hairGroup}
  <!-- Face highlight -->
  <ellipse cx="88" cy="185" rx="18" ry="22" fill="rgba(255,255,255,0.09)"/>
  <!-- Eyebrows -->
  <path d="M 61,189 Q 74,183 87,189" stroke="${hColor}" stroke-width="2.6" fill="none" stroke-linecap="round"/>
  <path d="M 113,189 Q 126,183 139,189" stroke="${hColor}" stroke-width="2.6" fill="none" stroke-linecap="round"/>
  <!-- Eyes (large anime eyes with blue iris) -->
  <ellipse cx="74"  cy="201" rx="13" ry="10" fill="white"/>
  <ellipse cx="74"  cy="201" rx="7.5" ry="7.5" fill="url(#${p}iris)"/>
  <ellipse cx="74"  cy="201" rx="3.5" ry="3.5" fill="#0A0A1A"/>
  <ellipse cx="77"  cy="197" rx="2.8" ry="2.0" fill="rgba(255,255,255,0.92)"/>
  <circle  cx="71"  cy="204" r="1.2" fill="rgba(255,255,255,0.75)"/>
  <path d="M 61,194 Q 74,188 87,194" stroke="#1a1a1a" stroke-width="2.3" fill="none" stroke-linecap="round"/>
  <line x1="62" y1="209" x2="86" y2="209" stroke="#1a1a1a" stroke-width="1" opacity="0.55"/>
  <ellipse cx="126" cy="201" rx="13" ry="10" fill="white"/>
  <ellipse cx="126" cy="201" rx="7.5" ry="7.5" fill="url(#${p}iris)"/>
  <ellipse cx="126" cy="201" rx="3.5" ry="3.5" fill="#0A0A1A"/>
  <ellipse cx="129" cy="197" rx="2.8" ry="2.0" fill="rgba(255,255,255,0.92)"/>
  <circle  cx="123" cy="204" r="1.2" fill="rgba(255,255,255,0.75)"/>
  <path d="M 113,194 Q 126,188 139,194" stroke="#1a1a1a" stroke-width="2.3" fill="none" stroke-linecap="round"/>
  <line x1="114" y1="209" x2="138" y2="209" stroke="#1a1a1a" stroke-width="1" opacity="0.55"/>
  <!-- Nose -->
  <path d="M 97,211 Q 94,221 98,226 Q 100,228 102,226 Q 106,221 103,211" fill="${skSh}" opacity="0.48"/>
  <!-- Mouth -->
  <path d="M 85,235 Q 100,245 115,235" fill="none" stroke="${skLip}" stroke-width="2.5" stroke-linecap="round"/>
  <!-- Cheek blush -->
  <ellipse cx="60"  cy="215" rx="13" ry="7" fill="rgba(255,160,160,0.28)"/>
  <ellipse cx="140" cy="215" rx="13" ry="7" fill="rgba(255,160,160,0.28)"/>
</svg>`;
  }

  /* ── Tiny Noe avatar (80×80 circle, for chat / match UI) ─── */
  function tinyNoe(opts = {}) {
    const outfit  = opts.outfit  || 'red-hoodie';
    const glasses = opts.glasses !== false;
    const emotion = opts.emotion || 'neutral';
    const colors  = outfitColors[outfit] || outfitColors['red-hoodie'];
    const p       = uid();

    const blush = (emotion === 'flustered' || emotion === 'excited')
      ? `<ellipse cx="24" cy="40" rx="6" ry="3" fill="rgba(255,100,100,0.3)"/>
         <ellipse cx="56" cy="40" rx="6" ry="3" fill="rgba(255,100,100,0.3)"/>` : '';

    return `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="${p}tsk" cx="45%" cy="38%" r="60%">
      <stop offset="0%"   stop-color="#D98B50"/>
      <stop offset="55%"  stop-color="#C47840"/>
      <stop offset="100%" stop-color="#8B4A20"/>
    </radialGradient>
    <clipPath id="${p}clip"><circle cx="40" cy="40" r="40"/></clipPath>
  </defs>
  <circle cx="40" cy="40" r="40" fill="${colors.top}"/>
  <g clip-path="url(#${p}clip)">
    <!-- Body -->
    <ellipse cx="40" cy="72" rx="40" ry="28" fill="${colors.top}"/>
    <!-- Neck -->
    <rect x="34" y="54" width="12" height="14" rx="4" fill="url(#${p}tsk)"/>
    <!-- Head -->
    <ellipse cx="40" cy="37" rx="24" ry="26" fill="url(#${p}tsk)"/>
    <!-- Hair -->
    <ellipse cx="40" cy="22" rx="26" ry="16" fill="#1a1a1a"/>
    <circle  cx="16" cy="32" r="10" fill="#1a1a1a"/>
    <circle  cx="64" cy="32" r="10" fill="#1a1a1a"/>
    <circle  cx="40" cy="16" r="9"  fill="#1a1a1a"/>
    <!-- Eyes -->
    <ellipse cx="30" cy="37" rx="7" ry="5.5" fill="white"/>
    <ellipse cx="30" cy="37" rx="4" ry="4"   fill="#1040A0"/>
    <ellipse cx="30" cy="37" rx="2" ry="2"   fill="#0A0A0A"/>
    <ellipse cx="32" cy="35" rx="1.4" ry="1" fill="rgba(255,255,255,0.9)"/>
    <ellipse cx="50" cy="37" rx="7" ry="5.5" fill="white"/>
    <ellipse cx="50" cy="37" rx="4" ry="4"   fill="#1040A0"/>
    <ellipse cx="50" cy="37" rx="2" ry="2"   fill="#0A0A0A"/>
    <ellipse cx="52" cy="35" rx="1.4" ry="1" fill="rgba(255,255,255,0.9)"/>
    ${glasses ? `
    <rect x="22" y="32" width="16" height="11" rx="2.5" fill="rgba(135,206,235,0.1)" stroke="#1A56DB" stroke-width="2"/>
    <rect x="42" y="32" width="16" height="11" rx="2.5" fill="rgba(135,206,235,0.1)" stroke="#1A56DB" stroke-width="2"/>
    <line x1="38" y1="37" x2="42" y2="37" stroke="#1A56DB" stroke-width="1.5"/>
    <line x1="22" y1="36" x2="14" y2="38" stroke="#1A56DB" stroke-width="1.5"/>
    <line x1="58" y1="36" x2="66" y2="38" stroke="#1A56DB" stroke-width="1.5"/>` : ''}
    <!-- Beard -->
    <ellipse cx="40" cy="50" rx="19" ry="10" fill="#1A1608" opacity="0.85"/>
    <path d="M 22,44 Q 40,58 58,44 Q 50,56 40,58 Q 30,56 22,44Z" fill="#1A1608"/>
    <!-- Mouth -->
    <path d="M 32,48 Q 40,53 48,48" stroke="#7A3E22" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    ${blush}
  </g>
</svg>`;
  }

  /* ── Tiny Player avatar (80×80 circle) ──────────────────── */
  function tinyPlayer(opts = {}) {
    const skinKey = opts.skin      || 's2';
    const hairKey = opts.hairColor || 'hc1';
    const skin    = skinTones[skinKey] || skinTones.s2;
    const hc      = hairColors[hairKey] || '#1a1a1a';
    const p       = uid();

    return `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="${p}tpsk" cx="44%" cy="37%" r="58%">
      <stop offset="0%"   stop-color="${skin.mid}"/>
      <stop offset="50%"  stop-color="${skin.base}"/>
      <stop offset="100%" stop-color="${skin.shadow}"/>
    </radialGradient>
    <radialGradient id="${p}tiris" cx="50%" cy="40%" r="55%">
      <stop offset="0%"   stop-color="#74B3F0"/>
      <stop offset="60%"  stop-color="#2F78D4"/>
      <stop offset="100%" stop-color="#1040A0"/>
    </radialGradient>
    <clipPath id="${p}tclip"><circle cx="40" cy="40" r="40"/></clipPath>
  </defs>
  <circle cx="40" cy="40" r="40" fill="#7D3C98"/>
  <g clip-path="url(#${p}tclip)">
    <!-- Body -->
    <ellipse cx="40" cy="72" rx="38" ry="26" fill="#7D3C98"/>
    <!-- Neck -->
    <rect x="34" y="53" width="12" height="14" rx="4" fill="url(#${p}tpsk)"/>
    <!-- Head -->
    <ellipse cx="40" cy="36" rx="22" ry="25" fill="url(#${p}tpsk)"/>
    <!-- Hair -->
    <ellipse cx="40" cy="20" rx="24" ry="15" fill="${hc}"/>
    <path d="M 18,28 Q 16,55 20,74" stroke="${hc}" stroke-width="7" fill="none" stroke-linecap="round"/>
    <path d="M 62,28 Q 64,55 60,74" stroke="${hc}" stroke-width="7" fill="none" stroke-linecap="round"/>
    <!-- Eyes -->
    <ellipse cx="32" cy="37" rx="6.5" ry="5" fill="white"/>
    <ellipse cx="32" cy="37" rx="3.8" ry="3.8" fill="url(#${p}tiris)"/>
    <ellipse cx="32" cy="37" rx="1.8" ry="1.8" fill="#0A0A1A"/>
    <ellipse cx="34" cy="35" rx="1.3" ry="0.9" fill="rgba(255,255,255,0.9)"/>
    <ellipse cx="48" cy="37" rx="6.5" ry="5" fill="white"/>
    <ellipse cx="48" cy="37" rx="3.8" ry="3.8" fill="url(#${p}tiris)"/>
    <ellipse cx="48" cy="37" rx="1.8" ry="1.8" fill="#0A0A1A"/>
    <ellipse cx="50" cy="35" rx="1.3" ry="0.9" fill="rgba(255,255,255,0.9)"/>
    <!-- Eyebrows -->
    <path d="M 26,31 Q 32,27 38,31" stroke="${hc}" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M 42,31 Q 48,27 54,31" stroke="${hc}" stroke-width="2" fill="none" stroke-linecap="round"/>
    <!-- Mouth -->
    <path d="M 33,48 Q 40,53 47,48" stroke="${skin.lip}" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    <!-- Blush -->
    <ellipse cx="24" cy="42" rx="5.5" ry="3" fill="rgba(255,160,160,0.28)"/>
    <ellipse cx="56" cy="42" rx="5.5" ry="3" fill="rgba(255,160,160,0.28)"/>
  </g>
</svg>`;
  }

  return { noe, player, tinyNoe, tinyPlayer };
})();
