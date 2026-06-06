/* ============================================================
   OUR STORY — Character SVG Avatar Generator
   Creates stylized cartoon avatars for Noe and the Player
   Based on Noe's real appearance: dark curly hair, blue rectangular
   glasses, full beard, warm brown skin, signature red hoodie
   ============================================================ */

const Characters = (() => {

  /* ── Color palettes ──────────────────────────────────── */
  const skinTones = {
    s1: { skin: '#FDDBB4', shadow: '#E8B89A', lip: '#D4876A' },
    s2: { skin: '#E8B89A', shadow: '#C9966A', lip: '#B5704A' },
    s3: { skin: '#C87D4C', shadow: '#A0623A', lip: '#8B4A2A' },
    s4: { skin: '#8D5524', shadow: '#6B3A18', lip: '#5A2E12' },
    s5: { skin: '#4A2C17', shadow: '#331D0E', lip: '#2A1508' },
  };
  const hairColors = {
    hc1: '#1a1a1a', hc2: '#5C3317', hc3: '#D4A017',
    hc4: '#8B1A1A', hc5: '#4B0082',
  };

  /* ── Noe's outfit colors ─────────────────────────────── */
  const outfitColors = {
    'red-hoodie':  { top: '#C0392B', topShadow: '#922B21', string: '#7B241C', inner: '#E74C3C' },
    'dark-hoodie': { top: '#2C3E50', topShadow: '#1A252F', string: '#17202A', inner: '#34495E' },
    'casual':      { top: '#2980B9', topShadow: '#1A5276', string: null,      inner: '#3498DB' },
    'dapper':      { top: '#1C2833', topShadow: '#0E1720', string: null,      inner: '#2C3E50' },
  };

  /* ── Noe's expression mouth/eye variants ─────────────── */
  const emotions = {
    neutral:  { mouth: 'M 82,235 Q 100,244 118,235', eyeL: 'normal', eyeR: 'normal', brow: 'normal' },
    happy:    { mouth: 'M 78,233 Q 100,248 122,233', eyeL: 'happy',  eyeR: 'happy',  brow: 'raised' },
    laughing: { mouth: 'M 78,232 Q 100,252 122,232', eyeL: 'laugh',  eyeR: 'laugh',  brow: 'raised' },
    thinking: { mouth: 'M 83,236 Q 96,242 112,238', eyeL: 'think',  eyeR: 'think',  brow: 'ponder' },
    nervous:  { mouth: 'M 82,238 Q 100,235 118,238', eyeL: 'wide',   eyeR: 'wide',   brow: 'worried' },
    flustered:{ mouth: 'M 82,237 Q 100,245 118,237', eyeL: 'happy',  eyeR: 'happy',  brow: 'raised' },
    serious:  { mouth: 'M 84,237 Q 100,240 116,237', eyeL: 'narrow', eyeR: 'narrow', brow: 'serious' },
    excited:  { mouth: 'M 77,231 Q 100,252 123,231', eyeL: 'star',   eyeR: 'star',   brow: 'raised' },
  };

  function makeEye(cx, cy, type, glasses) {
    const eyeW = glasses ? 14 : 13;
    const eyeH = glasses ? 9  : 10;
    const pupilR = type === 'laugh' ? 5 : type === 'think' ? 6 : 7;
    const scaleY = type === 'laugh' ? 0.4 : type === 'narrow' ? 0.5 : type === 'think' ? 0.8 : 1;
    const sclera = `<ellipse cx="${cx}" cy="${cy}" rx="${eyeW}" ry="${eyeH * scaleY}" fill="white"/>`;
    const iris = type === 'star'
      ? `<text x="${cx}" y="${cy + 5}" text-anchor="middle" font-size="12" fill="#3D2B1F">★</text>`
      : `<circle cx="${cx}" cy="${cy}" r="${pupilR * scaleY}" fill="#3D2B1F"/>
         <circle cx="${cx - 2}" cy="${cy - 2}" r="2" fill="white"/>`;
    return sclera + iris;
  }

  function makeBrow(cx, cy, side, type) {
    const flip = side === 'R' ? 1 : -1;
    if (type === 'raised')  return `<path d="M ${cx-12},${cy-4} Q ${cx},${cy-10} ${cx+12},${cy-4}" stroke="#1a1a1a" stroke-width="3" fill="none" stroke-linecap="round"/>`;
    if (type === 'worried') return `<path d="M ${cx-12},${cy-2} Q ${cx},${cy-8} ${cx+12},${cy-2}" stroke="#1a1a1a" stroke-width="3" fill="none" stroke-linecap="round" transform="rotate(${flip*5}, ${cx}, ${cy})"/>`;
    if (type === 'serious') return `<path d="M ${cx-12},${cy-6} Q ${cx},${cy-4} ${cx+12},${cy-6}" stroke="#1a1a1a" stroke-width="3" fill="none" stroke-linecap="round"/>`;
    if (type === 'ponder')  return `<path d="M ${cx-12},${cy-5} Q ${cx},${cy-3} ${cx+12},${cy-6}" stroke="#1a1a1a" stroke-width="3" fill="none" stroke-linecap="round"/>`;
    return `<path d="M ${cx-12},${cy-5} Q ${cx},${cy-7} ${cx+12},${cy-5}" stroke="#1a1a1a" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  }

  /* ── Generate Noe SVG ────────────────────────────────── */
  function noe(opts = {}) {
    const outfit = opts.outfit || 'red-hoodie';
    const hair   = opts.hair   || 'curly';
    const glasses= opts.glasses !== false;
    const emotion= opts.emotion || 'neutral';
    const colors = outfitColors[outfit] || outfitColors['red-hoodie'];
    const emo    = emotions[emotion]   || emotions.neutral;

    // Skin — Latino, warm brown
    const sk = '#B8693A', skShadow = '#9A5228', skLip = '#7A3E22';

    // Hair path based on style
    const hairTop = hair === 'neat'
      ? `<ellipse cx="100" cy="142" rx="62" ry="32" fill="#1a1a1a"/>
         <path d="M 40,155 Q 100,125 160,155 Q 160,135 100,128 Q 40,135 40,155Z" fill="#1a1a1a"/>`
      : hair === 'wild'
      ? `<ellipse cx="100" cy="140" rx="68" ry="38" fill="#1a1a1a"/>
         <path d="M 38,158 Q 30,120 45,110 Q 55,125 50,145Z" fill="#1a1a1a"/>
         <path d="M 162,158 Q 170,120 155,110 Q 145,125 150,145Z" fill="#1a1a1a"/>
         <path d="M 70,118 Q 75,100 85,108Z" fill="#1a1a1a"/>
         <path d="M 100,115 Q 105,96 115,106Z" fill="#1a1a1a"/>
         <path d="M 130,120 Q 140,104 148,114Z" fill="#1a1a1a"/>`
      : /* curly default */
        `<ellipse cx="100" cy="144" rx="65" ry="35" fill="#1a1a1a"/>
         <circle cx="42"  cy="168" r="22" fill="#1a1a1a"/>
         <circle cx="158" cy="168" r="22" fill="#1a1a1a"/>
         <circle cx="62"  cy="135" r="18" fill="#1a1a1a"/>
         <circle cx="138" cy="135" r="18" fill="#1a1a1a"/>
         <circle cx="100" cy="128" r="20" fill="#1a1a1a"/>`;

    // Glasses group
    const glassesGroup = glasses ? `
      <rect x="56" y="190" width="36" height="23" rx="4" fill="rgba(135,206,235,0.15)" stroke="#1A56DB" stroke-width="3.5"/>
      <rect x="108" y="190" width="36" height="23" rx="4" fill="rgba(135,206,235,0.15)" stroke="#1A56DB" stroke-width="3.5"/>
      <line x1="92" y1="200" x2="108" y2="200" stroke="#1A56DB" stroke-width="2.5"/>
      <line x1="56"  y1="198" x2="38"  y2="200" stroke="#1A56DB" stroke-width="2.5"/>
      <line x1="144" y1="198" x2="162" y2="200" stroke="#1A56DB" stroke-width="2.5"/>
    ` : '';

    // Outfit body — broader shoulders and fuller torso (195 lbs, stocky build)
    const isHoodie = outfit === 'red-hoodie' || outfit === 'dark-hoodie';
    const bodyShape = `
      <ellipse cx="100" cy="400" rx="100" ry="108" fill="${colors.top}"/>
      <!-- Broad shoulders -->
      <ellipse cx="30"  cy="310" rx="32" ry="26" fill="${colors.top}"/>
      <ellipse cx="170" cy="310" rx="32" ry="26" fill="${colors.top}"/>
      ${isHoodie ? `
        <path d="M 52,278 Q 76,270 100,272 Q 124,270 148,278 L 158,304 Q 124,316 100,314 Q 76,316 42,304Z" fill="${colors.inner}"/>
        <line x1="91"  y1="283" x2="86"  y2="405" stroke="${colors.topShadow}" stroke-width="4" stroke-linecap="round"/>
        <line x1="109" y1="283" x2="114" y2="405" stroke="${colors.topShadow}" stroke-width="4" stroke-linecap="round"/>
        <circle cx="100" cy="405" r="6" fill="${colors.topShadow}"/>
      ` : outfit === 'dapper' ? `
        <rect x="74" y="274" width="52" height="124" fill="#ECF0F1"/>
        <path d="M 74,274 L 58,292 L 74,324Z" fill="#E74C3C"/>
        <path d="M 126,274 L 142,292 L 126,324Z" fill="#E74C3C"/>
        <line x1="100" y1="292" x2="100" y2="394" stroke="#BDC3C7" stroke-width="1.5"/>
      ` : `
        <rect x="78" y="274" width="44" height="124" fill="rgba(255,255,255,0.15)"/>
      `}
    `;

    // Thinking hand pose (shifted left to match wider build)
    const thinkingHand = emotion === 'thinking'
      ? `<ellipse cx="72" cy="275" rx="22" ry="15" fill="${sk}"/>
         <rect x="62" y="261" width="10" height="22" rx="5" fill="${sk}"/>
         <rect x="74" y="259" width="10" height="22" rx="5" fill="${sk}"/>
         <rect x="85" y="263" width="10" height="18" rx="5" fill="${sk}"/>`
      : '';

    // Blush for flustered
    const blush = emotion === 'flustered'
      ? `<ellipse cx="66"  cy="212" rx="14" ry="8" fill="rgba(255,100,100,0.3)"/>
         <ellipse cx="134" cy="212" rx="14" ry="8" fill="rgba(255,100,100,0.3)"/>`
      : '';

    // Sweat drop for nervous
    const sweat = emotion === 'nervous'
      ? `<ellipse cx="152" cy="160" rx="5" ry="8" fill="rgba(100,180,255,0.7)"/>
         <path d="M 147,157 Q 152,148 157,157Z" fill="rgba(100,180,255,0.7)"/>`
      : '';

    return `<svg viewBox="0 0 200 500" xmlns="http://www.w3.org/2000/svg">
      <!-- Body -->
      ${bodyShape}
      <!-- Neck -->
      <rect x="88" y="252" width="24" height="28" rx="8" fill="${sk}"/>
      <!-- Head -->
      <ellipse cx="100" cy="200" rx="64" ry="68" fill="${sk}"/>
      <!-- Shadow under chin -->
      <ellipse cx="100" cy="248" rx="28" ry="8" fill="${skShadow}" opacity="0.4"/>
      <!-- Ears -->
      <ellipse cx="37"  cy="205" rx="10" ry="15" fill="${sk}"/>
      <ellipse cx="163" cy="205" rx="10" ry="15" fill="${sk}"/>
      <ellipse cx="37"  cy="205" rx="6"  ry="10" fill="${skShadow}"/>
      <ellipse cx="163" cy="205" rx="6"  ry="10" fill="${skShadow}"/>
      <!-- Hair back layer -->
      ${hairTop}
      <!-- Face highlight -->
      <ellipse cx="90" cy="185" rx="18" ry="22" fill="rgba(255,255,255,0.08)"/>
      <!-- Eyebrows (behind glasses) -->
      ${makeBrow(74, 186, 'L', emo.brow)}
      ${makeBrow(126, 186, 'R', emo.brow)}
      <!-- Eyes -->
      ${makeEye(74, 200, emo.eyeL, glasses)}
      ${makeEye(126, 200, emo.eyeR, glasses)}
      <!-- Glasses -->
      ${glassesGroup}
      <!-- Nose -->
      <path d="M 96,210 Q 93,222 97,228 Q 100,230 103,228 Q 107,222 104,210" fill="${skShadow}" opacity="0.6"/>
      <!-- Beard area -->
      <ellipse cx="100" cy="238" rx="45" ry="22" fill="#2C2416" opacity="0.9"/>
      <path d="M 56,226 Q 100,268 144,226 Q 128,258 100,262 Q 72,258 56,226Z" fill="#1E1A10"/>
      <!-- Mustache -->
      <path d="M 76,224 Q 88,230 100,227 Q 112,230 124,224" fill="#1E1A10"/>
      <!-- Mouth -->
      <path d="${emo.mouth}" fill="none" stroke="${skLip}" stroke-width="2.5" stroke-linecap="round"/>
      ${emotion === 'laughing' || emotion === 'excited'
        ? `<path d="M 80,234 Q 100,252 120,234 Q 112,246 100,248 Q 88,246 80,234Z" fill="#8B3A3A"/>`
        : ''}
      <!-- Blush -->
      ${blush}
      <!-- Sweat -->
      ${sweat}
      <!-- Thinking hand -->
      ${thinkingHand}
    </svg>`;
  }

  /* ── Generate Player SVG ─────────────────────────────── */
  function player(opts = {}) {
    const skinKey = opts.skin  || 's2';
    const hairKey = opts.hairColor || 'hc1';
    const style   = opts.hairStyle  || 'wave';
    const skin    = skinTones[skinKey]  || skinTones.s2;
    const hColor  = hairColors[hairKey] || '#1a1a1a';
    const sk = skin.skin, skSh = skin.shadow, skLip = skin.lip;

    const hairGroup = (() => {
      if (style === 'short')
        return `<ellipse cx="100" cy="148" rx="60" ry="28" fill="${hColor}"/>
                <rect x="40" y="148" width="120" height="20" rx="0" fill="${hColor}"/>`;
      if (style === 'long')
        return `<ellipse cx="100" cy="140" rx="62" ry="35" fill="${hColor}"/>
                <rect x="38" y="170" width="14" height="140" rx="7" fill="${hColor}"/>
                <rect x="148" y="170" width="14" height="140" rx="7" fill="${hColor}"/>`;
      if (style === 'curly')
        return `<ellipse cx="100" cy="140" rx="65" ry="38" fill="${hColor}"/>
                <circle cx="42" cy="165" r="22" fill="${hColor}"/>
                <circle cx="158" cy="165" r="22" fill="${hColor}"/>
                <circle cx="100" cy="128" r="20" fill="${hColor}"/>
                <path d="M 42,300 Q 30,350 40,400" stroke="${hColor}" stroke-width="14" fill="none" stroke-linecap="round"/>
                <path d="M 158,300 Q 170,350 160,400" stroke="${hColor}" stroke-width="14" fill="none" stroke-linecap="round"/>`;
      // wave (default)
      return `<ellipse cx="100" cy="142" rx="63" ry="34" fill="${hColor}"/>
              <path d="M 37,165 Q 50,210 40,280 Q 35,320 42,380" stroke="${hColor}" stroke-width="13" fill="none" stroke-linecap="round"/>
              <path d="M 163,165 Q 150,210 160,280 Q 165,320 158,380" stroke="${hColor}" stroke-width="13" fill="none" stroke-linecap="round"/>`;
    })();

    return `<svg viewBox="0 0 200 500" xmlns="http://www.w3.org/2000/svg">
      <!-- Body / outfit -->
      <ellipse cx="100" cy="395" rx="82" ry="105" fill="#9B59B6"/>
      <rect x="80" y="274" width="40" height="124" fill="rgba(255,255,255,0.18)"/>
      <!-- Neck -->
      <rect x="88" y="252" width="24" height="28" rx="8" fill="${sk}"/>
      <!-- Head -->
      <ellipse cx="100" cy="200" rx="60" ry="66" fill="${sk}"/>
      <!-- Ears -->
      <ellipse cx="41"  cy="204" rx="9" ry="14" fill="${sk}"/>
      <ellipse cx="159" cy="204" rx="9" ry="14" fill="${sk}"/>
      <!-- Hair (behind face for top layer) -->
      ${hairGroup}
      <!-- Face highlight -->
      <ellipse cx="90" cy="188" rx="16" ry="20" fill="rgba(255,255,255,0.10)"/>
      <!-- Eyes -->
      <ellipse cx="74" cy="200" rx="12" ry="9" fill="white"/>
      <circle cx="74" cy="200" r="7" fill="#2C2C2C"/>
      <circle cx="72" cy="198" r="2" fill="white"/>
      <ellipse cx="126" cy="200" rx="12" ry="9" fill="white"/>
      <circle cx="126" cy="200" r="7" fill="#2C2C2C"/>
      <circle cx="124" cy="198" r="2" fill="white"/>
      <!-- Eyebrows -->
      <path d="M 62,189 Q 74,184 86,189" stroke="${hColor}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <path d="M 114,189 Q 126,184 138,189" stroke="${hColor}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <!-- Nose -->
      <path d="M 97,210 Q 94,220 98,225 Q 100,227 102,225 Q 106,220 103,210" fill="${skSh}" opacity="0.5"/>
      <!-- Mouth -->
      <path d="M 85,234 Q 100,244 115,234" fill="none" stroke="${skLip}" stroke-width="2.5" stroke-linecap="round"/>
      <!-- Cheek blush -->
      <ellipse cx="60"  cy="214" rx="12" ry="7" fill="rgba(255,180,180,0.3)"/>
      <ellipse cx="140" cy="214" rx="12" ry="7" fill="rgba(255,180,180,0.3)"/>
    </svg>`;
  }

  /* ── Tiny circle avatar (for chat UI, match screen) ─── */
  function tinyNoe(opts = {}) {
    const outfit = opts.outfit || 'red-hoodie';
    const glasses= opts.glasses !== false;
    const colors = outfitColors[outfit] || outfitColors['red-hoodie'];
    return `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="40" r="40" fill="${colors.top}"/>
      <ellipse cx="40" cy="36" rx="22" ry="24" fill="#B8693A"/>
      <ellipse cx="40" cy="22" rx="24" ry="16" fill="#1a1a1a"/>
      <circle cx="18" cy="30" r="8" fill="#1a1a1a"/>
      <circle cx="62" cy="30" r="8" fill="#1a1a1a"/>
      <ellipse cx="30" cy="37" rx="7" ry="5" fill="white"/>
      <ellipse cx="50" cy="37" rx="7" ry="5" fill="white"/>
      <circle cx="30" cy="37" r="4" fill="#3D2B1F"/>
      <circle cx="50" cy="37" r="4" fill="#3D2B1F"/>
      ${glasses ? `
        <rect x="22" y="32" width="16" height="10" rx="2" fill="none" stroke="#1A56DB" stroke-width="2"/>
        <rect x="42" y="32" width="16" height="10" rx="2" fill="none" stroke="#1A56DB" stroke-width="2"/>
        <line x1="38" y1="37" x2="42" y2="37" stroke="#1A56DB" stroke-width="1.5"/>
      ` : ''}
      <path d="M 25,54 Q 40,62 55,54 Q 46,62 40,63 Q 34,62 25,54Z" fill="#1E1A10"/>
      <path d="M 28,52 Q 40,58 52,52" stroke="#8B4A2A" stroke-width="1.5" fill="none"/>
    </svg>`;
  }

  function tinyPlayer(opts = {}) {
    const skinKey = opts.skin || 's2';
    const hairKey = opts.hairColor || 'hc1';
    const sk = (skinTones[skinKey] || skinTones.s2).skin;
    const hc = hairColors[hairKey] || '#1a1a1a';
    return `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="40" r="40" fill="#9B59B6"/>
      <ellipse cx="40" cy="36" rx="20" ry="22" fill="${sk}"/>
      <ellipse cx="40" cy="22" rx="22" ry="14" fill="${hc}"/>
      <path d="M 20,30 Q 22,65 18,75" stroke="${hc}" stroke-width="6" fill="none" stroke-linecap="round"/>
      <path d="M 60,30 Q 58,65 62,75" stroke="${hc}" stroke-width="6" fill="none" stroke-linecap="round"/>
      <ellipse cx="32" cy="37" rx="6" ry="4.5" fill="white"/>
      <ellipse cx="48" cy="37" rx="6" ry="4.5" fill="white"/>
      <circle cx="32" cy="37" r="3" fill="#2C2C2C"/>
      <circle cx="48" cy="37" r="3" fill="#2C2C2C"/>
      <path d="M 32,50 Q 40,56 48,50" stroke="${(skinTones[skinKey]||skinTones.s2).lip}" stroke-width="1.5" fill="none"/>
    </svg>`;
  }

  return { noe, player, tinyNoe, tinyPlayer };
})();
