/* ============================================================
   OUR STORY — Character SVG Avatar Generator (Anime Art Style)
   viewBox="0 0 200 480" for sprites, "0 0 80 80" for tiny
   ============================================================ */

const Characters = (() => {

  let _id = 0;
  const uid = () => 'av' + (++_id) + '_';

  /* ── Color tables ──────────────────────────────────────── */
  const skinTones = {
    s1: { base:'#FDDBB4', hi:'#FFF0DC', shadow:'#E0A870', lip:'#D4876A' },
    s2: { base:'#E8B89A', hi:'#F8D4BA', shadow:'#C9966A', lip:'#B5704A' },
    s3: { base:'#C87D4C', hi:'#E09A6A', shadow:'#A0623A', lip:'#8B4A2A' },
    s4: { base:'#8D5524', hi:'#AA7040', shadow:'#6B3A18', lip:'#5A2E12' },
    s5: { base:'#4A2C17', hi:'#6A4228', shadow:'#331D0E', lip:'#2A1508' },
  };
  const hairColors = {
    hc1:'#1a1a1a', hc2:'#5C3317', hc3:'#D4A017', hc4:'#8B1A1A', hc5:'#4B0082',
  };
  const noeSkin = { base:'#C47840', hi:'#D98B50', shadow:'#8B4A20', lip:'#7A3E22' };
  const outfitColors = {
    'red-hoodie':  { top:'#C0392B', shad:'#8B2020', lit:'#E74C3C', inner:'#D44030' },
    'dark-hoodie': { top:'#2C3E50', shad:'#1A252F', lit:'#3D5468', inner:'#364E63' },
    'casual':      { top:'#2980B9', shad:'#1A5276', lit:'#3498DB', inner:null },
    'dapper':      { top:'#1C2833', shad:'#0E1720', lit:'#2C3E50', inner:null },
  };

  /* ── Emotion table (head center cy=125) ────────────────── */
  const emotions = {
    neutral:   { eyeT:'normal',  browT:'normal',  mouth:'M 82,162 Q 100,171 118,162' },
    happy:     { eyeT:'happy',   browT:'raised',  mouth:'M 78,160 Q 100,175 122,160' },
    laughing:  { eyeT:'laugh',   browT:'raised',  mouth:'M 78,159 Q 100,178 122,159' },
    thinking:  { eyeT:'think',   browT:'ponder',  mouth:'M 83,163 Q 96,169 112,165' },
    nervous:   { eyeT:'wide',    browT:'worried', mouth:'M 82,165 Q 100,162 118,165' },
    flustered: { eyeT:'happy',   browT:'raised',  mouth:'M 82,164 Q 100,172 118,164' },
    serious:   { eyeT:'narrow',  browT:'serious', mouth:'M 84,164 Q 100,167 116,164' },
    excited:   { eyeT:'star',    browT:'raised',  mouth:'M 77,158 Q 100,178 123,158' },
  };

  /* ── Anime eye ──────────────────────────────────────────── */
  function animeEye(cx, cy, type, p, irisColor) {
    irisColor = irisColor || '#1040A0';
    const gId = p + 'e' + cx;
    const scaleMap = { normal:1, happy:0.85, laugh:0, think:0.65, narrow:0.45, wide:1.2, star:1 };
    const sy = scaleMap[type] !== undefined ? scaleMap[type] : 1;
    const rx = 13, ry = 10;

    if (type === 'star') {
      return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="white"/>
<text x="${cx}" y="${cy+5}" text-anchor="middle" font-size="13" fill="#FFD700">&#x2605;</text>
<path d="M${cx-rx},${cy} Q${cx},${cy-ry*1.4} ${cx+rx},${cy}" fill="#1a1a1a"/>`;
    }
    if (type === 'laugh') {
      return `<path d="M${cx-rx},${cy-2} Q${cx},${cy+ry*1.1} ${cx+rx},${cy-2}" stroke="#1a1a1a" stroke-width="2.8" fill="none" stroke-linecap="round"/>
<path d="M${cx-rx+1},${cy-2} Q${cx},${cy-ry*0.5} ${cx+rx-1},${cy-2}" stroke="#1a1a1a" stroke-width="1.4" fill="rgba(255,255,255,0.35)" stroke-linecap="round"/>`;
    }

    const eyeRy = Math.max(ry * sy, 1);
    const irisR = 6.8 * Math.min(sy + 0.05, 1.0);
    const pupilR = irisR * 0.48;

    return `<defs><radialGradient id="${gId}" cx="45%" cy="35%" r="58%">
  <stop offset="0%" stop-color="${brighten(irisColor,50)}"/>
  <stop offset="55%" stop-color="${irisColor}"/>
  <stop offset="100%" stop-color="${darken(irisColor,30)}"/>
</radialGradient></defs>
<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${eyeRy}" fill="white"/>
<ellipse cx="${cx}" cy="${cy}" rx="${irisR}" ry="${irisR}" fill="url(#${gId})"/>
<ellipse cx="${cx}" cy="${cy}" rx="${pupilR}" ry="${pupilR}" fill="#0D0D0D"/>
<ellipse cx="${cx+3}" cy="${cy-2.5}" rx="${irisR*0.40}" ry="${irisR*0.30}" fill="rgba(255,255,255,0.92)"/>
<circle cx="${cx-2.5}" cy="${cy+2}" r="${irisR*0.18}" fill="rgba(255,255,255,0.70)"/>
<path d="M${cx-rx},${cy-eyeRy*0.7} Q${cx},${cy-eyeRy*1.4} ${cx+rx},${cy-eyeRy*0.7}" fill="#1a1a1a"/>
<line x1="${cx-rx*0.82}" y1="${cy+eyeRy*0.88}" x2="${cx+rx*0.82}" y2="${cy+eyeRy*0.88}" stroke="#1a1a1a" stroke-width="1.1" opacity="0.6"/>`;
  }

  /* ── Anime brow ─────────────────────────────────────────── */
  function animeBrow(cx, cy, browT, side) {
    const a = `stroke="#1a1a1a" stroke-width="3.2" fill="none" stroke-linecap="round"`;
    if (browT === 'raised') return `<path d="M${cx-13},${cy-6} Q${cx},${cy-13} ${cx+13},${cy-6}" ${a}/>`;
    if (browT === 'worried') {
      if (side === 'L') return `<path d="M${cx-13},${cy-3} Q${cx},${cy-9} ${cx+13},${cy-11}" ${a}/>`;
      else              return `<path d="M${cx-13},${cy-11} Q${cx},${cy-9} ${cx+13},${cy-3}" ${a}/>`;
    }
    if (browT === 'serious') return `<path d="M${cx-13},${cy-7} Q${cx},${cy-6} ${cx+13},${cy-7}" ${a}/>`;
    if (browT === 'ponder') {
      if (side === 'L') return `<path d="M${cx-13},${cy-7} Q${cx},${cy-5} ${cx+13},${cy-8}" ${a}/>`;
      else              return `<path d="M${cx-13},${cy-8} Q${cx},${cy-5} ${cx+13},${cy-7}" ${a}/>`;
    }
    return `<path d="M${cx-13},${cy-6} Q${cx},${cy-9} ${cx+13},${cy-6}" ${a}/>`;
  }

  /* ── Color helpers ─────────────────────────────────────── */
  function hexToRgb(h) { return [parseInt(h.slice(1,3),16), parseInt(h.slice(3,5),16), parseInt(h.slice(5,7),16)]; }
  function toHex(r,g,b) { return '#'+[r,g,b].map(v => Math.max(0,Math.min(255,Math.round(v))).toString(16).padStart(2,'0')).join(''); }
  function brighten(h,a) { const [r,g,b] = hexToRgb(h); return toHex(r+a, g+a, b+a); }
  function darken(h,a)   { return brighten(h, -a); }

  /* ══════════════════════════════════════════════════════════
     NOE  (viewBox 0 0 200 480)
     Head center: (100, 125)   rx=62 ry=68  (head y=57–193)
     Eyes y=132  Brows y=115  Nose y=150  Mouth y=162
     Neck: y=188–222
     Shoulders at y=216 → body trapezoid to y=480
  ══════════════════════════════════════════════════════════ */
  function noe(opts) {
    opts = opts || {};
    const outfit  = opts.outfit  || 'red-hoodie';
    const hair    = opts.hair    || 'curly';
    const glasses = opts.glasses !== false;
    const emotion = opts.emotion || 'neutral';
    const colors  = outfitColors[outfit] || outfitColors['red-hoodie'];
    const emo     = emotions[emotion]    || emotions.neutral;
    const p       = uid();
    const sk      = noeSkin;

    const skinGrad = `<radialGradient id="${p}sk" cx="45%" cy="38%" r="62%">
  <stop offset="0%"   stop-color="${sk.hi}"/>
  <stop offset="50%"  stop-color="${sk.base}"/>
  <stop offset="100%" stop-color="${sk.shadow}"/>
</radialGradient>`;

    const bodyGrad = `<radialGradient id="${p}bd" cx="40%" cy="28%" r="68%">
  <stop offset="0%"   stop-color="${colors.lit}"/>
  <stop offset="55%"  stop-color="${colors.top}"/>
  <stop offset="100%" stop-color="${colors.shad}"/>
</radialGradient>`;

    /* ── Hair ── */
    const hc = '#1a1a1a', hhi = '#3a3a3a';
    let hairSvg = '';
    if (hair === 'neat') {
      hairSvg = `
<ellipse cx="100" cy="96" rx="62" ry="34" fill="${hc}"/>
<path d="M 38,110 Q 100,80 162,110 Q 160,90 100,84 Q 40,90 38,110Z" fill="${hc}"/>
<path d="M 52,102 Q 100,90 150,102" stroke="${hhi}" stroke-width="2" fill="none" opacity="0.5"/>`;
    } else if (hair === 'wild') {
      hairSvg = `
<ellipse cx="100" cy="94" rx="70" ry="42" fill="${hc}"/>
<path d="M 36,116 Q 26,74 44,62 Q 56,78 50,106Z" fill="${hc}"/>
<path d="M 164,116 Q 174,74 156,62 Q 144,78 150,106Z" fill="${hc}"/>
<path d="M 66,74 Q 70,52 82,66Z" fill="${hc}"/>
<path d="M 100,68 Q 104,48 116,62Z" fill="${hc}"/>
<path d="M 130,72 Q 140,58 150,70Z" fill="${hc}"/>
<path d="M 46,104 Q 52,88 64,94" stroke="${hhi}" stroke-width="1.5" fill="none" opacity="0.4"/>`;
    } else {
      /* curly default — voluminous, messy */
      hairSvg = `
<ellipse cx="100" cy="98" rx="66" ry="40" fill="${hc}"/>
<circle cx="42"  cy="120" r="23" fill="${hc}"/>
<circle cx="158" cy="120" r="23" fill="${hc}"/>
<circle cx="62"  cy="90"  r="20" fill="${hc}"/>
<circle cx="138" cy="90"  r="20" fill="${hc}"/>
<circle cx="100" cy="82"  r="21" fill="${hc}"/>
<path d="M 46,106 Q 52,90 66,98" stroke="${hhi}" stroke-width="2" fill="none" opacity="0.45"/>
<path d="M 154,106 Q 148,90 134,98" stroke="${hhi}" stroke-width="2" fill="none" opacity="0.45"/>
<path d="M 80,82 Q 88,68 100,76" stroke="${hhi}" stroke-width="2" fill="none" opacity="0.45"/>`;
    }

    /* ── Glasses ── */
    const glassesGroup = glasses ? `
<rect x="55"  y="122" width="38" height="24" rx="4" fill="rgba(135,206,235,0.12)" stroke="#1A56DB" stroke-width="3.2"/>
<rect x="107" y="122" width="38" height="24" rx="4" fill="rgba(135,206,235,0.12)" stroke="#1A56DB" stroke-width="3.2"/>
<line x1="93"  y1="134" x2="107" y2="134" stroke="#1A56DB" stroke-width="2.5"/>
<line x1="55"  y1="130" x2="36"  y2="133" stroke="#1A56DB" stroke-width="2.2"/>
<line x1="145" y1="130" x2="164" y2="133" stroke="#1A56DB" stroke-width="2.2"/>` : '';

    /* ── Body: shoulder caps + trapezoid torso (NOT a blob ellipse) ── */
    const isHoodie = outfit === 'red-hoodie' || outfit === 'dark-hoodie';
    const innerColor = colors.inner || colors.top;

    let outfitDetail = '';
    if (isHoodie) {
      outfitDetail = `
<!-- Hoodie chest panel -->
<path d="M 60,222 Q 78,216 100,218 Q 122,216 140,222 L 146,246 Q 122,254 100,252 Q 78,254 54,246Z" fill="${innerColor}"/>
<!-- Drawstrings -->
<line x1="92"  y1="226" x2="86"  y2="400" stroke="${colors.shad}" stroke-width="3.5" stroke-linecap="round"/>
<line x1="108" y1="226" x2="114" y2="400" stroke="${colors.shad}" stroke-width="3.5" stroke-linecap="round"/>
<circle cx="86"  cy="402" r="5.5" fill="${colors.shad}"/>
<circle cx="114" cy="402" r="5.5" fill="${colors.shad}"/>
<!-- Kangaroo pocket -->
<path d="M 64,340 Q 100,332 136,340 L 134,390 Q 100,400 66,390Z" fill="${colors.shad}" opacity="0.45"/>
<path d="M 64,340 Q 100,332 136,340" stroke="${colors.shad}" stroke-width="2" fill="none"/>
<!-- Side shading -->
<path d="M 44,218 Q 28,270 16,380 L 0,480" stroke="${colors.shad}" stroke-width="22" fill="none" opacity="0.25" stroke-linecap="round"/>
<path d="M 156,218 Q 172,270 184,380 L 200,480" stroke="${colors.shad}" stroke-width="22" fill="none" opacity="0.25" stroke-linecap="round"/>`;
    } else if (outfit === 'dapper') {
      outfitDetail = `
<!-- Dress shirt -->
<rect x="78" y="216" width="44" height="264" fill="#ECF0F1"/>
<!-- Lapels -->
<path d="M 78,216 L 58,242 L 78,282Z" fill="#C0392B"/>
<path d="M 122,216 L 142,242 L 122,282Z" fill="#C0392B"/>
<!-- Button line -->
<line x1="100" y1="242" x2="100" y2="480" stroke="#BDC3C7" stroke-width="1.5"/>
<circle cx="100" cy="282" r="3" fill="${colors.shad}"/>
<circle cx="100" cy="304" r="3" fill="${colors.shad}"/>`;
    } else {
      outfitDetail = `<rect x="80" y="220" width="40" height="260" fill="rgba(255,255,255,0.14)"/>`;
    }

    /* ── Emotion extras ── */
    const thinkingHand = emotion === 'thinking'
      ? `<ellipse cx="72" cy="206" rx="23" ry="14" fill="url(#${p}sk)"/>
<rect x="61" y="190" width="11" height="23" rx="5.5" fill="url(#${p}sk)"/>
<rect x="74" y="188" width="11" height="23" rx="5.5" fill="url(#${p}sk)"/>
<rect x="86" y="192" width="11" height="19" rx="5.5" fill="url(#${p}sk)"/>` : '';

    const blush = (emotion === 'flustered' || emotion === 'excited')
      ? `<ellipse cx="65"  cy="147" rx="14" ry="7" fill="rgba(255,100,100,0.28)"/>
<ellipse cx="135" cy="147" rx="14" ry="7" fill="rgba(255,100,100,0.28)"/>` : '';

    const sweat = emotion === 'nervous'
      ? `<path d="M 150,90 Q 153,80 156,90 Q 156,96 153,97 Q 150,96 150,90Z" fill="rgba(100,180,255,0.75)"/>` : '';

    const mouthFill = (emotion === 'laughing' || emotion === 'excited')
      ? `<path d="M 80,161 Q 100,178 120,161 Q 112,175 100,177 Q 88,175 80,161Z" fill="#7B1F1F"/>` : '';

    return `<svg viewBox="0 0 200 480" xmlns="http://www.w3.org/2000/svg">
<defs>${skinGrad}${bodyGrad}</defs>
<!-- ── Shoulder caps (stocky broad) ── -->
<ellipse cx="16"  cy="234" rx="34" ry="30" fill="url(#${p}bd)"/>
<ellipse cx="184" cy="234" rx="34" ry="30" fill="url(#${p}bd)"/>
<!-- ── Torso: trapezoid widens from shoulder-width to screen edges ── -->
<path d="M 46,218 Q 100,208 154,218 L 200,480 L 0,480Z" fill="url(#${p}bd)"/>
${outfitDetail}
<!-- ── Neck ── -->
<rect x="88" y="188" width="24" height="34" rx="10" fill="url(#${p}sk)"/>
<!-- ── Head ── -->
<ellipse cx="100" cy="125" rx="62" ry="68" fill="url(#${p}sk)"/>
<!-- ── Chin shadow ── -->
<ellipse cx="100" cy="187" rx="26" ry="7" fill="${sk.shadow}" opacity="0.35"/>
<!-- ── Ears ── -->
<ellipse cx="39"  cy="130" rx="10" ry="15" fill="url(#${p}sk)"/>
<ellipse cx="161" cy="130" rx="10" ry="15" fill="url(#${p}sk)"/>
<ellipse cx="39"  cy="130" rx="6"  ry="9"  fill="${sk.shadow}" opacity="0.4"/>
<ellipse cx="161" cy="130" rx="6"  ry="9"  fill="${sk.shadow}" opacity="0.4"/>
<!-- ── Hair (drawn over head) ── -->
${hairSvg}
<!-- ── Face highlight ── -->
<ellipse cx="88" cy="110" rx="20" ry="26" fill="rgba(255,255,255,0.07)"/>
<!-- ── Eyebrows ── -->
${animeBrow(74,  115, emo.browT, 'L')}
${animeBrow(126, 115, emo.browT, 'R')}
<!-- ── Eyes ── -->
${animeEye(74,  132, emo.eyeT, p, '#2C1A0E')}
${animeEye(126, 132, emo.eyeT, p, '#2C1A0E')}
<!-- ── Glasses ── -->
${glassesGroup}
<!-- ── Nose ── -->
<path d="M 96,145 Q 92,157 97,162 Q 100,165 103,162 Q 108,157 104,145" fill="${sk.shadow}" opacity="0.55"/>
<!-- ── Beard ── -->
<ellipse cx="100" cy="172" rx="46" ry="23" fill="#231E13" opacity="0.88"/>
<path d="M 55,159 Q 100,202 145,159 Q 128,194 100,197 Q 72,194 55,159Z" fill="#1A1608"/>
<!-- ── Mustache ── -->
<path d="M 76,158 Q 88,166 100,162 Q 112,166 124,158" fill="#1A1608"/>
<!-- ── Beard texture ── -->
<path d="M 68,172 Q 75,186 80,194" stroke="#3a3020" stroke-width="1.2" fill="none" opacity="0.5"/>
<path d="M 100,174 Q 100,190 100,199" stroke="#3a3020" stroke-width="1.2" fill="none" opacity="0.5"/>
<path d="M 132,172 Q 125,186 120,194" stroke="#3a3020" stroke-width="1.2" fill="none" opacity="0.5"/>
${mouthFill}
<!-- ── Mouth ── -->
<path d="${emo.mouth}" fill="none" stroke="${sk.lip}" stroke-width="2.5" stroke-linecap="round"/>
${blush}${sweat}${thinkingHand}
</svg>`;
  }

  /* ══════════════════════════════════════════════════════════
     PLAYER  (viewBox 0 0 200 480)
     Head center: (100, 118)  rx=58 ry=64  (head y=54–182)
     Eyes y=124  Brows y=108  Nose y=140  Mouth y=155
     Neck: y=180–212
     Shoulders at y=208
  ══════════════════════════════════════════════════════════ */
  function player(opts) {
    opts = opts || {};
    const skinKey = opts.skin      || 's2';
    const hairKey = opts.hairColor || 'hc1';
    const style   = opts.hairStyle || 'wave';
    const skin    = skinTones[skinKey] || skinTones.s2;
    const hColor  = hairColors[hairKey] || '#1a1a1a';
    const p       = uid();
    const hhi     = brighten(hColor, 44);

    const skinGrad = `<radialGradient id="${p}psk" cx="44%" cy="36%" r="60%">
  <stop offset="0%"   stop-color="${skin.hi}"/>
  <stop offset="45%"  stop-color="${skin.base}"/>
  <stop offset="100%" stop-color="${skin.shadow}"/>
</radialGradient>`;

    const irisColor = '#2980B9';

    /* ── Hair ── */
    let hairGroup = '';
    if (style === 'short') {
      hairGroup = `
<ellipse cx="100" cy="76" rx="62" ry="30" fill="${hColor}"/>
<rect x="38" y="76" width="124" height="20" rx="2" fill="${hColor}"/>
<path d="M 50,76 Q 100,66 150,76" stroke="${hhi}" stroke-width="2" fill="none" opacity="0.5"/>`;
    } else if (style === 'long') {
      hairGroup = `
<ellipse cx="100" cy="72" rx="62" ry="36" fill="${hColor}"/>
<path d="M 38,100 Q 28,200 36,330 Q 30,390 36,450" stroke="${hColor}" stroke-width="15" fill="none" stroke-linecap="round"/>
<path d="M 162,100 Q 172,200 164,330 Q 170,390 164,450" stroke="${hColor}" stroke-width="15" fill="none" stroke-linecap="round"/>
<path d="M 44,104 Q 36,202 42,320" stroke="${hhi}" stroke-width="5" fill="none" stroke-linecap="round" opacity="0.42"/>`;
    } else if (style === 'curly') {
      hairGroup = `
<ellipse cx="100" cy="74" rx="64" ry="40" fill="${hColor}"/>
<circle cx="42"  cy="98"  r="22" fill="${hColor}"/>
<circle cx="158" cy="98"  r="22" fill="${hColor}"/>
<circle cx="100" cy="62"  r="20" fill="${hColor}"/>
<path d="M 36,114 Q 26,210 38,360 Q 30,410 38,470" stroke="${hColor}" stroke-width="16" fill="none" stroke-linecap="round"/>
<path d="M 164,114 Q 174,210 162,360 Q 170,410 162,470" stroke="${hColor}" stroke-width="16" fill="none" stroke-linecap="round"/>
<path d="M 52,86 Q 74,72 100,70" stroke="${hhi}" stroke-width="2.5" fill="none" opacity="0.5"/>`;
    } else {
      /* wave (default) */
      hairGroup = `
<ellipse cx="100" cy="74" rx="62" ry="36" fill="${hColor}"/>
<path d="M 38,98 Q 46,194 36,284 Q 32,342 38,430" stroke="${hColor}" stroke-width="14" fill="none" stroke-linecap="round"/>
<path d="M 162,98 Q 154,194 164,284 Q 168,342 162,430" stroke="${hColor}" stroke-width="14" fill="none" stroke-linecap="round"/>
<path d="M 44,102 Q 52,196 42,284" stroke="${hhi}" stroke-width="5" fill="none" stroke-linecap="round" opacity="0.40"/>
<path d="M 156,102 Q 148,196 158,284" stroke="${hhi}" stroke-width="5" fill="none" stroke-linecap="round" opacity="0.40"/>`;
    }

    return `<svg viewBox="0 0 200 480" xmlns="http://www.w3.org/2000/svg">
<defs>${skinGrad}</defs>
<!-- ── Shoulder caps ── -->
<ellipse cx="18"  cy="224" rx="30" ry="26" fill="#7D3C98"/>
<ellipse cx="182" cy="224" rx="30" ry="26" fill="#7D3C98"/>
<!-- ── Torso: trapezoid (NOT a blob) ── -->
<path d="M 46,210 Q 100,200 154,210 L 200,480 L 0,480Z" fill="#7D3C98"/>
<!-- ── Shirt highlight stripe ── -->
<rect x="84" y="212" width="32" height="268" fill="rgba(255,255,255,0.13)"/>
<!-- ── Collar V ── -->
<path d="M 82,208 L 100,228 L 118,208" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<!-- ── Neck ── -->
<rect x="88" y="180" width="24" height="34" rx="10" fill="url(#${p}psk)"/>
<!-- ── Head ── -->
<ellipse cx="100" cy="118" rx="58" ry="64" fill="url(#${p}psk)"/>
<!-- ── Chin shadow ── -->
<ellipse cx="100" cy="178" rx="24" ry="6" fill="${skin.shadow}" opacity="0.3"/>
<!-- ── Ears ── -->
<ellipse cx="43"  cy="122" rx="9"  ry="14" fill="url(#${p}psk)"/>
<ellipse cx="157" cy="122" rx="9"  ry="14" fill="url(#${p}psk)"/>
<ellipse cx="43"  cy="122" rx="5.5" ry="8.5" fill="${skin.shadow}" opacity="0.35"/>
<ellipse cx="157" cy="122" rx="5.5" ry="8.5" fill="${skin.shadow}" opacity="0.35"/>
<!-- ── Hair ── -->
${hairGroup}
<!-- ── Face highlight ── -->
<ellipse cx="88" cy="104" rx="17" ry="22" fill="rgba(255,255,255,0.09)"/>
<!-- ── Eyebrows ── -->
<path d="M 61,108 Q 74,102 87,108" stroke="${hColor}" stroke-width="2.6" fill="none" stroke-linecap="round"/>
<path d="M 113,108 Q 126,102 139,108" stroke="${hColor}" stroke-width="2.6" fill="none" stroke-linecap="round"/>
<!-- ── Eyes (large anime with blue iris) ── -->
${animeEye(74,  124, 'normal', p, irisColor)}
${animeEye(126, 124, 'normal', p, irisColor)}
<!-- ── Nose ── -->
<path d="M 97,136 Q 94,147 98,152 Q 100,154 102,152 Q 106,147 103,136" fill="${skin.shadow}" opacity="0.48"/>
<!-- ── Mouth ── -->
<path d="M 85,162 Q 100,172 115,162" fill="none" stroke="${skin.lip}" stroke-width="2.5" stroke-linecap="round"/>
<!-- ── Cheek blush ── -->
<ellipse cx="58"  cy="132" rx="13" ry="7" fill="rgba(255,160,160,0.28)"/>
<ellipse cx="142" cy="132" rx="13" ry="7" fill="rgba(255,160,160,0.28)"/>
</svg>`;
  }

  /* ══════════════════════════════════════════════════════════
     TINY NOE  (viewBox 0 0 80 80, circle crop)
  ══════════════════════════════════════════════════════════ */
  function tinyNoe(opts) {
    opts = opts || {};
    const outfit  = opts.outfit  || 'red-hoodie';
    const glasses = opts.glasses !== false;
    const emotion = opts.emotion || 'neutral';
    const colors  = outfitColors[outfit] || outfitColors['red-hoodie'];
    const p       = uid();
    const sk      = noeSkin;

    const blush = (emotion === 'flustered' || emotion === 'excited')
      ? `<ellipse cx="24" cy="40" rx="6" ry="3" fill="rgba(255,100,100,0.3)"/>
<ellipse cx="56" cy="40" rx="6" ry="3" fill="rgba(255,100,100,0.3)"/>` : '';

    return `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
<defs>
  <radialGradient id="${p}tsk" cx="45%" cy="38%" r="60%">
    <stop offset="0%"   stop-color="${sk.hi}"/>
    <stop offset="55%"  stop-color="${sk.base}"/>
    <stop offset="100%" stop-color="${sk.shadow}"/>
  </radialGradient>
  <clipPath id="${p}clip"><circle cx="40" cy="40" r="40"/></clipPath>
</defs>
<circle cx="40" cy="40" r="40" fill="${colors.top}"/>
<g clip-path="url(#${p}clip)">
  <ellipse cx="40" cy="72" rx="40" ry="28" fill="${colors.top}"/>
  <rect x="34" y="54" width="12" height="14" rx="4" fill="url(#${p}tsk)"/>
  <ellipse cx="40" cy="37" rx="24" ry="26" fill="url(#${p}tsk)"/>
  <ellipse cx="40" cy="22" rx="26" ry="16" fill="#1a1a1a"/>
  <circle  cx="16" cy="32" r="10" fill="#1a1a1a"/>
  <circle  cx="64" cy="32" r="10" fill="#1a1a1a"/>
  <circle  cx="40" cy="16" r="9"  fill="#1a1a1a"/>
  <ellipse cx="30" cy="37" rx="7" ry="5.5" fill="white"/>
  <ellipse cx="30" cy="37" rx="4" ry="4"   fill="#1040A0"/>
  <ellipse cx="30" cy="37" rx="2" ry="2"   fill="#0A0A0A"/>
  <ellipse cx="32" cy="35" rx="1.4" ry="1" fill="rgba(255,255,255,0.9)"/>
  <ellipse cx="50" cy="37" rx="7" ry="5.5" fill="white"/>
  <ellipse cx="50" cy="37" rx="4" ry="4"   fill="#1040A0"/>
  <ellipse cx="50" cy="37" rx="2" ry="2"   fill="#0A0A0A"/>
  <ellipse cx="52" cy="35" rx="1.4" ry="1" fill="rgba(255,255,255,0.9)"/>
  ${glasses ? `<rect x="22" y="32" width="16" height="11" rx="2.5" fill="rgba(135,206,235,0.1)" stroke="#1A56DB" stroke-width="2"/>
  <rect x="42" y="32" width="16" height="11" rx="2.5" fill="rgba(135,206,235,0.1)" stroke="#1A56DB" stroke-width="2"/>
  <line x1="38" y1="37" x2="42" y2="37" stroke="#1A56DB" stroke-width="1.5"/>
  <line x1="22" y1="36" x2="14" y2="38" stroke="#1A56DB" stroke-width="1.5"/>
  <line x1="58" y1="36" x2="66" y2="38" stroke="#1A56DB" stroke-width="1.5"/>` : ''}
  <ellipse cx="40" cy="50" rx="19" ry="10" fill="#1A1608" opacity="0.85"/>
  <path d="M 22,44 Q 40,58 58,44 Q 50,56 40,58 Q 30,56 22,44Z" fill="#1A1608"/>
  <path d="M 32,48 Q 40,53 48,48" stroke="${sk.lip}" stroke-width="1.5" fill="none" stroke-linecap="round"/>
  ${blush}
</g>
</svg>`;
  }

  /* ══════════════════════════════════════════════════════════
     TINY PLAYER  (viewBox 0 0 80 80, circle crop)
  ══════════════════════════════════════════════════════════ */
  function tinyPlayer(opts) {
    opts = opts || {};
    const skinKey = opts.skin      || 's2';
    const hairKey = opts.hairColor || 'hc1';
    const skin    = skinTones[skinKey] || skinTones.s2;
    const hc      = hairColors[hairKey] || '#1a1a1a';
    const p       = uid();

    return `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
<defs>
  <radialGradient id="${p}tpsk" cx="44%" cy="37%" r="58%">
    <stop offset="0%"   stop-color="${skin.hi}"/>
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
  <ellipse cx="40" cy="72" rx="38" ry="26" fill="#7D3C98"/>
  <rect x="34" y="53" width="12" height="14" rx="4" fill="url(#${p}tpsk)"/>
  <ellipse cx="40" cy="36" rx="22" ry="25" fill="url(#${p}tpsk)"/>
  <ellipse cx="40" cy="20" rx="24" ry="15" fill="${hc}"/>
  <path d="M 18,28 Q 16,55 20,74" stroke="${hc}" stroke-width="7" fill="none" stroke-linecap="round"/>
  <path d="M 62,28 Q 64,55 60,74" stroke="${hc}" stroke-width="7" fill="none" stroke-linecap="round"/>
  <ellipse cx="32" cy="37" rx="6.5" ry="5" fill="white"/>
  <ellipse cx="32" cy="37" rx="3.8" ry="3.8" fill="url(#${p}tiris)"/>
  <ellipse cx="32" cy="37" rx="1.8" ry="1.8" fill="#0A0A1A"/>
  <ellipse cx="34" cy="35" rx="1.3" ry="0.9" fill="rgba(255,255,255,0.9)"/>
  <ellipse cx="48" cy="37" rx="6.5" ry="5" fill="white"/>
  <ellipse cx="48" cy="37" rx="3.8" ry="3.8" fill="url(#${p}tiris)"/>
  <ellipse cx="48" cy="37" rx="1.8" ry="1.8" fill="#0A0A1A"/>
  <ellipse cx="50" cy="35" rx="1.3" ry="0.9" fill="rgba(255,255,255,0.9)"/>
  <path d="M 26,31 Q 32,27 38,31" stroke="${hc}" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M 42,31 Q 48,27 54,31" stroke="${hc}" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M 33,48 Q 40,53 47,48" stroke="${skin.lip}" stroke-width="1.5" fill="none" stroke-linecap="round"/>
  <ellipse cx="24" cy="42" rx="5.5" ry="3" fill="rgba(255,160,160,0.28)"/>
  <ellipse cx="56" cy="42" rx="5.5" ry="3" fill="rgba(255,160,160,0.28)"/>
</g>
</svg>`;
  }

  return { noe, player, tinyNoe, tinyPlayer };
})();
