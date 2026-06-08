/* ============================================================
   OUR STORY — Audio System (Web Audio API synthesizer)
   No external audio files required — everything is synthesized
   ============================================================ */

const Audio = (() => {
  let ctx = null;
  let masterGain = null;
  let musicGain  = null;
  let sfxGain    = null;
  let currentMusicNodes = [];
  let currentTrack = null;
  let autoResumeAttempted = false;

  const settings = {
    master: 0.7,
    music:  0.55,
    sfx:    0.75,
  };

  function init() {
    if (ctx) return;
    try {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      masterGain = ctx.createGain();
      musicGain  = ctx.createGain();
      sfxGain    = ctx.createGain();
      masterGain.gain.value = settings.master;
      musicGain.gain.value  = settings.music;
      sfxGain.gain.value    = settings.sfx;
      musicGain.connect(masterGain);
      sfxGain.connect(masterGain);
      masterGain.connect(ctx.destination);
    } catch(e) { console.warn('Web Audio not available'); }
  }

  function resume() {
    if (ctx && ctx.state === 'suspended') ctx.resume();
  }

  function setVolume(type, val) {
    settings[type] = val;
    if (!ctx) return;
    if (type === 'master') masterGain.gain.value = val;
    if (type === 'music')  musicGain.gain.value  = val;
    if (type === 'sfx')    sfxGain.gain.value    = val;
  }

  /* ── Helpers ─────────────────────────────────────────── */
  function freq(note, oct = 4) {
    const notes = { C:0, D:2, E:4, F:5, G:7, A:9, B:11, 'C#':1, 'D#':3, 'F#':6, 'G#':8, 'A#':10 };
    const n = notes[note];
    return 440 * Math.pow(2, (n - 9 + (oct - 4) * 12) / 12);
  }

  function osc(type, f, startT, dur, vol, gainNode) {
    if (!ctx) return;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type;
    o.frequency.value = f;
    g.gain.setValueAtTime(0, startT);
    g.gain.linearRampToValueAtTime(vol, startT + 0.02);
    g.gain.exponentialRampToValueAtTime(0.001, startT + dur);
    o.connect(g);
    g.connect(gainNode);
    o.start(startT);
    o.stop(startT + dur + 0.05);
    return { osc: o, gain: g };
  }

  function addReverb(source, dest, amount = 0.3) {
    if (!ctx) return;
    const conv = ctx.createConvolver();
    const len = ctx.sampleRate * 1.5;
    const buf = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const d = buf.getChannelData(ch);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2);
    }
    conv.buffer = buf;
    const wet = ctx.createGain(); wet.gain.value = amount;
    source.connect(conv);
    conv.connect(wet);
    wet.connect(dest);
  }

  /* ── Music Tracks (procedurally generated loops) ───────── */

  function stopMusic(fadeTime = 1.0) {
    if (!ctx) return;
    currentMusicNodes.forEach(n => {
      if (n && n.gain) {
        n.gain.gain.setValueAtTime(n.gain.gain.value, ctx.currentTime);
        n.gain.gain.linearRampToValueAtTime(0, ctx.currentTime + fadeTime);
      }
      if (n && n.osc) {
        try { n.osc.stop(ctx.currentTime + fadeTime + 0.1); } catch(e) {}
      }
    });
    currentMusicNodes = [];
    currentTrack = null;
  }

  function playTrack(name) {
    if (!ctx || currentTrack === name) return;
    stopMusic(0.8);
    currentTrack = name;
    if (name === 'lofi')    playLofi();
    if (name === 'golden')  playGolden();
    if (name === 'arcade')  playArcade();
    if (name === 'innout')  playInnOut();
    if (name === 'romance') playRomance();
    if (name === 'sad')     playSad();
  }

  /* ── lo-fi chill (Chapter 1 & 2) ────────────────────── */
  function playLofi() {
    if (!ctx) return;
    const t  = ctx.currentTime;
    const bpm = 80, beat = 60 / bpm;
    const chords = [
      [freq('C',4), freq('E',4), freq('G',4)],
      [freq('A',3), freq('C',4), freq('E',4)],
      [freq('F',3), freq('A',3), freq('C',4)],
      [freq('G',3), freq('B',3), freq('D',4)],
    ];
    const nodes = [];
    const loop = () => {
      if (currentTrack !== 'lofi') return;
      const now = ctx.currentTime;
      chords.forEach((chord, ci) => {
        chord.forEach(f => {
          const n = osc('sine', f, now + ci * beat * 4, beat * 3.8, 0.12, musicGain);
          if (n) nodes.push(n);
        });
        // bass note
        const bass = osc('sine', chord[0] / 2, now + ci * beat * 4, beat * 3.8, 0.15, musicGain);
        if (bass) nodes.push(bass);
      });
      // hi-hat rhythm
      for (let i = 0; i < 16; i++) {
        const hh = osc('square', 8000 + Math.random() * 2000, now + i * beat, 0.05, 0.02, sfxGain);
        if (hh) nodes.push(hh);
      }
      setTimeout(loop, beat * 16 * 1000 * 0.95);
    };
    loop();
    currentMusicNodes = nodes;
  }

  /* ── golden hour warm (Chapter 3) ───────────────────── */
  function playGolden() {
    if (!ctx) return;
    const nodes = [];
    const loop = () => {
      if (currentTrack !== 'golden') return;
      const now = ctx.currentTime;
      const melody = [freq('E',5), freq('D',5), freq('C',5), freq('E',5), freq('G',5), freq('A',5), freq('G',5), freq('E',5)];
      melody.forEach((f, i) => {
        const n = osc('sine', f, now + i * 0.5, 0.45, 0.18, musicGain);
        if (n) nodes.push(n);
      });
      const chord1 = [freq('C',4), freq('E',4), freq('G',4)];
      chord1.forEach(f => {
        const n = osc('triangle', f, now, 2.0, 0.08, musicGain);
        if (n) nodes.push(n);
      });
      const chord2 = [freq('A',3), freq('C',4), freq('E',4)];
      chord2.forEach(f => {
        const n = osc('triangle', f, now + 2.0, 2.0, 0.08, musicGain);
        if (n) nodes.push(n);
      });
      setTimeout(loop, 4100);
    };
    loop();
    currentMusicNodes = nodes;
  }

  /* ── arcade chiptune (Chapter 4) ────────────────────── */
  function playArcade() {
    if (!ctx) return;
    const nodes = [];
    const bpm = 140, b = 60 / bpm;
    const loop = () => {
      if (currentTrack !== 'arcade') return;
      const now = ctx.currentTime;
      const mel = [freq('C',5),freq('E',5),freq('G',5),freq('C',6),freq('B',5),freq('G',5),freq('E',5),freq('D',5)];
      mel.forEach((f, i) => {
        const n = osc('square', f, now + i * b, b * 0.85, 0.08, musicGain);
        if (n) nodes.push(n);
      });
      // bass
      [freq('C',3), freq('G',3), freq('A',3), freq('E',3)].forEach((f, i) => {
        const n = osc('sawtooth', f, now + i * b * 2, b * 1.9, 0.1, musicGain);
        if (n) nodes.push(n);
      });
      // kick-like
      for (let i = 0; i < 8; i++) {
        if (i % 2 === 0) {
          const k = osc('sine', 100 - i * 5, now + i * b, 0.12, 0.25, sfxGain);
          if (k) nodes.push(k);
        }
      }
      setTimeout(loop, b * 8 * 1000 * 0.95);
    };
    loop();
    currentMusicNodes = nodes;
  }

  /* ── In-N-Out warm diner (Chapter 5) ────────────────── */
  function playInnOut() {
    if (!ctx) return;
    const nodes = [];
    const loop = () => {
      if (currentTrack !== 'innout') return;
      const now = ctx.currentTime;
      const chord = [freq('G',3), freq('B',3), freq('D',4), freq('G',4)];
      const chord2 = [freq('E',3), freq('G',3), freq('B',3), freq('E',4)];
      chord.forEach(f => {
        const n = osc('triangle', f, now, 2.5, 0.09, musicGain);
        if (n) nodes.push(n);
      });
      chord2.forEach(f => {
        const n = osc('triangle', f, now + 2.5, 2.5, 0.09, musicGain);
        if (n) nodes.push(n);
      });
      // gentle melody
      const mel = [freq('B',4), freq('D',5), freq('G',5), freq('F#',5), freq('E',5)];
      mel.forEach((f, i) => {
        const n = osc('sine', f, now + i * 0.6 + 0.2, 0.55, 0.1, musicGain);
        if (n) nodes.push(n);
      });
      setTimeout(loop, 5100);
    };
    loop();
    currentMusicNodes = nodes;
  }

  /* ── Romance theme (good/perfect endings) ───────────── */
  function playRomance() {
    if (!ctx) return;
    const nodes = [];
    const loop = () => {
      if (currentTrack !== 'romance') return;
      const now = ctx.currentTime;
      const mel = [freq('C',5),freq('E',5),freq('G',5),freq('E',5),freq('D',5),freq('F',5),freq('A',5),freq('G',5)];
      mel.forEach((f, i) => {
        const n = osc('sine', f, now + i * 0.6, 0.55, 0.15, musicGain);
        if (n) nodes.push(n);
      });
      const harmony = [freq('E',4), freq('G',4), freq('C',4), freq('A',4)];
      harmony.forEach((f, i) => {
        const n = osc('sine', f, now + i * 1.2, 1.1, 0.06, musicGain);
        if (n) nodes.push(n);
      });
      setTimeout(loop, 4900);
    };
    loop();
    currentMusicNodes = nodes;
  }

  /* ── Sad/bittersweet (neutral/bad endings) ───────────── */
  function playSad() {
    if (!ctx) return;
    const nodes = [];
    const loop = () => {
      if (currentTrack !== 'sad') return;
      const now = ctx.currentTime;
      const mel = [freq('A',4), freq('G',4), freq('F',4), freq('E',4), freq('D',4), freq('C',4)];
      mel.forEach((f, i) => {
        const n = osc('sine', f, now + i * 0.7, 0.65, 0.1, musicGain);
        if (n) nodes.push(n);
      });
      setTimeout(loop, 4300);
    };
    loop();
    currentMusicNodes = nodes;
  }

  /* ── Sound Effects ──────────────────────────────────── */
  function sfx(name) {
    if (!ctx) return;
    resume();
    const t = ctx.currentTime;
    if (name === 'blip') {
      osc('sine', 880, t, 0.08, 0.3, sfxGain);
    }
    if (name === 'match') {
      [freq('C',5), freq('E',5), freq('G',5), freq('C',6)].forEach((f, i) => {
        osc('sine', f, t + i * 0.1, 0.2, 0.25, sfxGain);
      });
    }
    if (name === 'choice') {
      osc('sine', 660, t, 0.06, 0.15, sfxGain);
    }
    if (name === 'heart') {
      osc('sine', 880, t, 0.1, 0.3, sfxGain);
      osc('sine', 1100, t + 0.05, 0.1, 0.3, sfxGain);
    }
    if (name === 'negative') {
      osc('sawtooth', 200, t, 0.15, 0.2, sfxGain);
      osc('sawtooth', 180, t + 0.05, 0.15, 0.2, sfxGain);
    }
    if (name === 'win') {
      [freq('C',5),freq('E',5),freq('G',5),freq('C',6),freq('E',6)].forEach((f,i) => {
        osc('square', f, t + i * 0.08, 0.2, 0.12, sfxGain);
      });
    }
    if (name === 'click') {
      osc('sine', 440, t, 0.05, 0.2, sfxGain);
    }
    if (name === 'swipe') {
      osc('sawtooth', 300, t, 0.12, 0.15, sfxGain);
      osc('sawtooth', 400, t + 0.06, 0.08, 0.12, sfxGain);
    }
    if (name === 'notification') {
      osc('sine', 880, t, 0.08, 0.2, sfxGain);
      osc('sine', 1100, t + 0.1, 0.08, 0.2, sfxGain);
    }
    if (name === 'laugh') {
      for (let i = 0; i < 5; i++) {
        osc('sine', 600 + i * 40, t + i * 0.06, 0.06, 0.15, sfxGain);
      }
    }
  }

  /* ── Public API ─────────────────────────────────────── */
  return { init, resume, setVolume, playTrack, stopMusic, sfx };
})();
