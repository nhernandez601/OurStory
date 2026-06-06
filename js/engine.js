/* ============================================================
   OUR STORY — Visual Novel Engine
   Handles all game state, rendering, user input, and flow
   ============================================================ */

const Engine = (() => {

  /* ── State ───────────────────────────────────────────── */
  const state = {
    currentNode: null,
    romancePoints: Story.startRP,
    playerName: 'You',
    playerOpts: { skin: 's2', hairColor: 'hc1', hairStyle: 'wave', vibe: 'sweet' },
    noeOpts:    { outfit: 'red-hoodie', hair: 'curly', glasses: true },
    textSpeed: 22,
    isAnimating: false,
    autoPlay: false,
    autoTimer: null,
    skipMode: false,
    canAdvance: false,
    chatMessages: [],
    save: null,
  };

  /* ── DOM refs ────────────────────────────────────────── */
  const $ = id => document.getElementById(id);
  const screens = {
    loading:  $('loading-screen'),
    title:    $('title-screen'),
    create:   $('char-creation'),
    game:     $('game-screen'),
    ending:   $('ending-screen'),
  };

  /* ── Screen management ───────────────────────────────── */
  function showScreen(name) {
    Object.values(screens).forEach(s => s.classList.remove('active'));
    screens[name].classList.add('active');
  }

  /* ── Loading sequence ────────────────────────────────── */
  function runLoading() {
    const fill = $('load-fill');
    let pct = 0;
    const iv = setInterval(() => {
      pct += Math.random() * 18 + 5;
      fill.style.width = Math.min(pct, 100) + '%';
      if (pct >= 100) {
        clearInterval(iv);
        setTimeout(() => showScreen('title'), 400);
      }
    }, 120);
  }

  /* ── Floating hearts on title ────────────────────────── */
  function startFloatingHearts() {
    const container = $('floating-hearts');
    setInterval(() => {
      const h = document.createElement('div');
      h.className = 'fh';
      h.textContent = Math.random() > 0.5 ? '♥' : '♡';
      h.style.left = Math.random() * 100 + 'vw';
      h.style.fontSize = (Math.random() * 1.2 + 0.6) + 'rem';
      h.style.animationDuration = (Math.random() * 6 + 8) + 's';
      h.style.opacity = Math.random() * 0.5 + 0.3;
      container.appendChild(h);
      setTimeout(() => h.remove(), 15000);
    }, 1200);
  }

  /* ── Character customization UI ─────────────────────── */
  function initCreationUI() {
    // Tab switching
    document.querySelectorAll('.tab').forEach(t => {
      t.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(x => x.classList.remove('active'));
        document.querySelectorAll('.tab-pane').forEach(x => x.classList.remove('active'));
        t.classList.add('active');
        $('tab-' + t.dataset.tab).classList.add('active');
      });
    });

    // Skin swatches
    setupSwatches('skin-swatches', val => {
      state.playerOpts.skin = val;
      updatePlayerPreview();
    });

    // Hair color
    setupSwatches('hair-color-swatches', val => {
      state.playerOpts.hairColor = val;
      updatePlayerPreview();
    });

    // Chips
    setupChips('hair-style-chips', val => {
      state.playerOpts.hairStyle = val;
      updatePlayerPreview();
    });
    setupChips('vibe-chips', val => { state.playerOpts.vibe = val; });

    // Noe chips
    setupChips('noe-outfit-chips', val => {
      state.noeOpts.outfit = val;
      updateNoePreview();
    });
    setupChips('noe-hair-chips', val => {
      state.noeOpts.hair = val;
      updateNoePreview();
    });
    setupChips('noe-glasses-chips', val => {
      state.noeOpts.glasses = val === 'yes';
      updateNoePreview();
    });

    // Initial previews
    updatePlayerPreview();
    updateNoePreview();

    // Begin button
    $('btn-begin').addEventListener('click', () => {
      const name = $('player-name-input').value.trim();
      state.playerName = name || 'You';
      Audio.resume();
      startGame();
    });
  }

  function setupSwatches(containerId, cb) {
    const container = $(containerId);
    if (!container) return;
    container.querySelectorAll('.swatch').forEach(s => {
      s.addEventListener('click', () => {
        container.querySelectorAll('.swatch').forEach(x => x.classList.remove('active'));
        s.classList.add('active');
        cb(s.dataset.val);
        Audio.sfx('click');
      });
    });
  }

  function setupChips(containerId, cb) {
    const container = $(containerId);
    if (!container) return;
    container.querySelectorAll('.chip').forEach(c => {
      c.addEventListener('click', () => {
        container.querySelectorAll('.chip').forEach(x => x.classList.remove('active'));
        c.classList.add('active');
        cb(c.dataset.val);
        Audio.sfx('click');
      });
    });
  }

  function updatePlayerPreview() {
    $('player-preview-svg').innerHTML = Characters.player(state.playerOpts);
  }

  function updateNoePreview() {
    $('noe-preview-svg').innerHTML = Characters.noe({ ...state.noeOpts, emotion: 'happy' });
  }

  /* ── Game initialization ─────────────────────────────── */
  function startGame() {
    Audio.init();
    showScreen('game');
    updateNoeSprite('neutral');
    updateRomanceMeter();
    initGameControls();
    // Start from Chapter 1 title card
    loadNode('c1_title');
  }

  function initGameControls() {
    $('ctrl-skip').addEventListener('click', toggleSkip);
    $('ctrl-auto').addEventListener('click', toggleAuto);
    $('ctrl-save').addEventListener('click', saveGame);
    $('ctrl-menu').addEventListener('click', () => {
      $('settings-modal').classList.remove('hidden');
    });
  }

  /* ── Core game loop ──────────────────────────────────── */
  function loadNode(nodeId) {
    if (!nodeId) return;
    const node = Story.nodes[nodeId];
    if (!node) { console.error('Missing node:', nodeId); return; }
    state.currentNode = nodeId;
    state.canAdvance = false;

    // Handle node by type
    switch (node.type) {
      case 'chapter_title': showChapterTitle(node); break;
      case 'narration':     showNarration(node);    break;
      case 'dialogue':      showDialogue(node);     break;
      case 'choice':        showChoice(node);       break;
      case 'profile':       showProfile(node);      break;
      case 'match':         showMatch(node);        break;
      case 'chat':          showChat(node);         break;
      case 'chat_choice':   showChatChoice(node);   break;
      case 'scene':         changeScene(node);      break;
      case 'route':         routeEnding(node);      break;
      case 'ending':        showEnding(node);       break;
    }
  }

  /* ── Background & Music ──────────────────────────────── */
  const bgMap = {
    app:            'bg-app',
    chat:           'bg-chat',
    golden:         'bg-golden',
    arcade:         'bg-arcade',
    innout:         'bg-innout',
    night:          'bg-night',
    'ending-perfect': 'bg-ending-perfect',
    'ending-good':    'bg-ending-good',
    'ending-neutral': 'bg-ending-neutral',
    'ending-bad':     'bg-ending-bad',
  };

  let currentBg = null;
  function applyBackground(bg) {
    if (!bg || bg === currentBg) return;
    currentBg = bg;
    const el = $('game-bg');
    el.className = bgMap[bg] || 'bg-app';
  }

  let currentMusic = null;
  function applyMusic(track) {
    if (!track || track === currentMusic) return;
    currentMusic = track;
    Audio.playTrack(track);
  }

  /* ── Sprite management ───────────────────────────────── */
  function updateNoeSprite(emotion) {
    const el = $('noe-sprite');
    el.innerHTML = Characters.noe({ ...state.noeOpts, emotion: emotion || 'neutral' });
  }

  function showNoeSprite(show) {
    const wrap = $('noe-sprite-wrap');
    if (show) wrap.classList.remove('offscreen');
    else wrap.classList.add('offscreen');
  }

  /* ── Romance meter ───────────────────────────────────── */
  function updateRomanceMeter() {
    const pct = Math.max(0, Math.min(100, state.romancePoints));
    $('rm-fill').style.width = pct + '%';
  }

  function addRomancePoints(delta) {
    state.romancePoints = Math.max(0, Math.min(100, state.romancePoints + delta));
    updateRomanceMeter();
    if (delta > 0) Audio.sfx('heart');
    else if (delta < 0) Audio.sfx('negative');
  }

  /* ── Hide all UI panels ──────────────────────────────── */
  function hideAllPanels() {
    ['dialogue-box', 'narration-box', 'choice-container',
     'profile-card', 'match-screen', 'chat-ui', 'chapter-card'].forEach(id => {
      const el = $(id);
      if (el) el.classList.add('hidden');
    });
    state.canAdvance = false;
  }

  /* ── Chapter title card ──────────────────────────────── */
  function showChapterTitle(node) {
    hideAllPanels();
    showNoeSprite(false);
    applyBackground(node.background);
    applyMusic(node.music);

    const card = $('chapter-card');
    $('chapter-num').textContent  = node.chapterNum;
    $('chapter-name').textContent = node.chapterName;
    card.classList.remove('hidden');

    // Auto-advance after animation
    setTimeout(() => {
      card.classList.add('hidden');
      loadNode(node.next);
    }, 3600);
  }

  /* ── Narration ───────────────────────────────────────── */
  function showNarration(node) {
    hideAllPanels();
    applyBackground(node.background);
    applyMusic(node.music);
    showNoeSprite(false);

    const box = $('narration-box');
    box.classList.remove('hidden');
    typeText($('narration-text'), node.text, () => {
      state.canAdvance = true;
      if (state.autoPlay) scheduleAutoAdvance();
    });

    box.onclick = () => advance(node.next);
  }

  /* ── Dialogue ────────────────────────────────────────── */
  function showDialogue(node) {
    hideAllPanels();
    applyBackground(node.background);
    applyMusic(node.music);

    const isNoe = node.speaker === 'Noe';
    showNoeSprite(isNoe);
    if (isNoe && node.emotion) updateNoeSprite(node.emotion);

    const box = $('dialogue-box');
    box.classList.remove('hidden');

    const speakerEl = $('speaker-name');
    speakerEl.textContent = node.speaker === 'You'
      ? state.playerName
      : (node.speaker || '');

    typeText($('dialogue-text'), node.text, () => {
      state.canAdvance = true;
      if (state.autoPlay) scheduleAutoAdvance();
    });

    box.onclick = () => {
      if (state.isAnimating) {
        skipTyping($('dialogue-text'), node.text);
        return;
      }
      advance(node.next);
    };
  }

  /* ── Narration/Dialogue advance ──────────────────────── */
  function advance(nextId) {
    if (!state.canAdvance && !state.skipMode) return;
    Audio.sfx('click');
    state.canAdvance = false;
    clearAutoAdvance();
    if (nextId) loadNode(nextId);
  }

  /* ── Choices ─────────────────────────────────────────── */
  function showChoice(node) {
    hideAllPanels();
    applyBackground(node.background);

    // Keep Noe visible but change expression to neutral/thinking
    showNoeSprite(true);
    updateNoeSprite('thinking');

    const container = $('choice-container');
    container.classList.remove('hidden');
    $('choice-prompt').textContent = node.prompt || 'What do you say?';

    const list = $('choice-list');
    list.innerHTML = '';
    node.choices.forEach(choice => {
      const btn = document.createElement('button');
      btn.className = 'choice-btn';
      btn.textContent = choice.text;
      btn.addEventListener('click', () => handleChoice(choice));
      list.appendChild(btn);
    });
  }

  function handleChoice(choice) {
    Audio.sfx('choice');
    if (choice.sfx) Audio.sfx(choice.sfx);
    if (choice.rp) addRomancePoints(choice.rp);
    hideAllPanels();
    loadNode(choice.next);
  }

  /* ── Profile Card ────────────────────────────────────── */
  function showProfile(node) {
    hideAllPanels();
    showNoeSprite(false);
    applyBackground('app');

    const card = $('profile-card');
    $('profile-photo').innerHTML = Characters.noe({ ...state.noeOpts, emotion: 'happy' });
    card.classList.remove('hidden');

    // Swipe buttons
    $('swipe-yes').onclick = () => {
      Audio.sfx('swipe');
      Audio.sfx('match');
      card.classList.add('hidden');
      // Animate card flying right
      card.style.transform = 'translate(-50%, -50%) rotate(15deg) translateX(200%)';
      card.style.transition = 'transform 0.3s ease';
      setTimeout(() => {
        card.style.transform = '';
        card.style.transition = '';
        loadNode(node.next);
      }, 400);
    };

    $('swipe-no').onclick = () => {
      Audio.sfx('swipe');
      card.style.transform = 'translate(-50%, -50%) rotate(-15deg) translateX(-200%)';
      card.style.transition = 'transform 0.3s ease';
      setTimeout(() => {
        card.style.transform = '';
        card.style.transition = '';
        // Still advance the story — we need them to match
        loadNode(node.next);
      }, 400);
    };
  }

  /* ── Match Screen ────────────────────────────────────── */
  function showMatch(node) {
    hideAllPanels();
    showNoeSprite(false);

    const ms = $('match-screen');
    ms.classList.remove('hidden');

    $('match-player-av').innerHTML = Characters.tinyPlayer(state.playerOpts);
    $('match-noe-av').innerHTML    = Characters.tinyNoe(state.noeOpts);

    Audio.sfx('match');

    $('btn-after-match').onclick = () => {
      Audio.sfx('click');
      ms.classList.add('hidden');
      loadNode(node.next);
    };
  }

  /* ── Chat Interface ──────────────────────────────────── */
  let chatQueue = [];
  let chatIndex = 0;

  function showChat(node) {
    hideAllPanels();
    showNoeSprite(false);
    applyBackground('chat');

    const chatUI = $('chat-ui');
    chatUI.classList.remove('hidden');

    // Set avatar
    $('chat-av').innerHTML = Characters.tinyNoe(state.noeOpts);

    // Update Noe expression
    if (node.emotion) updateNoeSprite(node.emotion);

    chatQueue = node.messages || [];
    chatIndex = 0;

    const msgContainer = $('chat-msgs');
    msgContainer.innerHTML = '';

    function deliverNext() {
      if (chatIndex >= chatQueue.length) {
        // All messages delivered, make clickable to advance
        chatUI.onclick = () => {
          chatUI.onclick = null;
          Audio.sfx('click');
          loadNode(node.next);
        };
        return;
      }

      const msg = chatQueue[chatIndex++];
      const isNoe = msg.from === 'noe';

      // Show typing indicator
      const typing = $('chat-typing');
      if (isNoe) {
        typing.classList.remove('hidden');
        setTimeout(() => {
          typing.classList.add('hidden');
          appendChatMessage(msgContainer, msg.text, msg.from, msg.from === 'player' ? state.playerName : 'Noe');
          Audio.sfx('notification');
          setTimeout(deliverNext, 600);
        }, 900 + msg.text.length * 18);
      } else {
        appendChatMessage(msgContainer, msg.text, msg.from, state.playerName);
        setTimeout(deliverNext, 400);
      }
    }

    deliverNext();
  }

  function appendChatMessage(container, text, from, name) {
    const wrap = document.createElement('div');
    wrap.className = 'msg ' + from;
    const bubble = document.createElement('div');
    bubble.className = 'msg-bubble';
    bubble.textContent = text;
    const time = document.createElement('div');
    time.className = 'msg-time';
    const now = new Date();
    time.textContent = now.getHours() + ':' + String(now.getMinutes()).padStart(2,'0');
    wrap.appendChild(bubble);
    wrap.appendChild(time);
    container.appendChild(wrap);
    container.scrollTop = container.scrollHeight;
  }

  /* ── Chat Choices (appears after chat messages) ──────── */
  function showChatChoice(node) {
    // Display choices in chat style (still show chat UI underneath)
    const container = $('choice-container');
    container.classList.remove('hidden');
    $('choice-prompt').textContent = 'Your reply:';

    const list = $('choice-list');
    list.innerHTML = '';
    node.choices.forEach(choice => {
      const btn = document.createElement('button');
      btn.className = 'choice-btn';
      btn.textContent = choice.text;
      btn.addEventListener('click', () => {
        // Show player's choice as a chat bubble
        const chatUI = $('chat-ui');
        if (!chatUI.classList.contains('hidden')) {
          const msgs = $('chat-msgs');
          appendChatMessage(msgs, choice.text, 'player', state.playerName);
        }
        Audio.sfx('choice');
        if (choice.sfx) Audio.sfx(choice.sfx);
        if (choice.rp) addRomancePoints(choice.rp);
        container.classList.add('hidden');
        setTimeout(() => loadNode(choice.next), 300);
      });
      list.appendChild(btn);
    });
  }

  /* ── Scene change ────────────────────────────────────── */
  function changeScene(node) {
    applyBackground(node.background);
    if (node.music) applyMusic(node.music);
    // Flash transition
    const flash = document.createElement('div');
    flash.className = 'scene-flash';
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 400);
    setTimeout(() => loadNode(node.next), 350);
  }

  /* ── Ending router ───────────────────────────────────── */
  function routeEnding(node) {
    const rp = state.romancePoints;
    const routes = node.routes.slice().sort((a, b) => b.minRP - a.minRP);
    const route = routes.find(r => rp >= r.minRP);
    loadNode(route ? route.next : 'ending_bad');
  }

  /* ── Ending screen ───────────────────────────────────── */
  function showEnding(node) {
    hideAllPanels();
    showNoeSprite(false);

    // Update game bg with ending bg
    applyBackground(node.background);
    if (node.music) Audio.playTrack(node.music);
    if (node.sfx) Audio.sfx(node.sfx);

    // Give ending screen the matching background
    const endBgEl = $('ending-bg-layer');
    endBgEl.className = bgMap[node.background] || '';
    endBgEl.style.position = 'absolute';
    endBgEl.style.inset = '0';

    showScreen('ending');

    $('ending-title').textContent    = node.title;
    $('ending-subtitle').textContent = node.subtitle;
    $('ending-text').textContent     = node.text;
    $('ending-badge').textContent    = node.badge;
    $('ending-deco').textContent     = node.deco || '♥';
    $('final-romance').textContent   = state.romancePoints;

    spawnEndingParticles(node.background);
  }

  function spawnEndingParticles(bg) {
    if (!bg.includes('ending')) return;
    const isPerfect = bg === 'ending-perfect';
    const screen = $('ending-screen');
    for (let i = 0; i < (isPerfect ? 30 : 10); i++) {
      setTimeout(() => {
        const p = document.createElement('div');
        p.className = 'particle';
        p.textContent = isPerfect ? '♥' : '·';
        p.style.left = Math.random() * 100 + 'vw';
        p.style.bottom = Math.random() * 40 + '%';
        p.style.fontSize = (Math.random() * 1.5 + 0.5) + 'rem';
        p.style.color = isPerfect ? '#FF6B9D' : '#aaa';
        p.style.animationDuration = (Math.random() * 2 + 1.5) + 's';
        screen.appendChild(p);
        setTimeout(() => p.remove(), 4000);
      }, i * 200);
    }
  }

  /* ── Typewriter effect ───────────────────────────────── */
  let typingTimer = null;
  let currentTypingResolve = null;

  function typeText(el, text, onComplete) {
    if (typingTimer) clearInterval(typingTimer);
    el.textContent = '';
    state.isAnimating = true;
    let i = 0;

    if (state.textSpeed === 0 || state.skipMode) {
      el.textContent = text;
      state.isAnimating = false;
      if (onComplete) onComplete();
      return;
    }

    typingTimer = setInterval(() => {
      el.textContent += text[i++];
      if (i >= text.length) {
        clearInterval(typingTimer);
        typingTimer = null;
        state.isAnimating = false;
        if (onComplete) onComplete();
      }
    }, state.textSpeed);
  }

  function skipTyping(el, fullText) {
    if (typingTimer) { clearInterval(typingTimer); typingTimer = null; }
    el.textContent = fullText;
    state.isAnimating = false;
    state.canAdvance = true;
  }

  /* ── Auto-play ───────────────────────────────────────── */
  function scheduleAutoAdvance() {
    clearAutoAdvance();
    state.autoTimer = setTimeout(() => {
      const node = Story.nodes[state.currentNode];
      if (node && node.next && node.type !== 'choice' && node.type !== 'chat_choice') {
        advance(node.next);
      }
    }, 2500);
  }

  function clearAutoAdvance() {
    if (state.autoTimer) { clearTimeout(state.autoTimer); state.autoTimer = null; }
  }

  function toggleAuto() {
    state.autoPlay = !state.autoPlay;
    $('ctrl-auto').classList.toggle('active', state.autoPlay);
    if (state.autoPlay && state.canAdvance) scheduleAutoAdvance();
    else clearAutoAdvance();
  }

  function toggleSkip() {
    state.skipMode = !state.skipMode;
    $('ctrl-skip').classList.toggle('active', state.skipMode);
    if (state.skipMode) {
      state.textSpeed = 0;
      const node = Story.nodes[state.currentNode];
      if (node && node.next && node.type === 'narration') advance(node.next);
    } else {
      state.textSpeed = 22;
    }
  }

  /* ── Save / Load ─────────────────────────────────────── */
  function saveGame() {
    const saveData = {
      node: state.currentNode,
      rp: state.romancePoints,
      playerName: state.playerName,
      playerOpts: state.playerOpts,
      noeOpts: state.noeOpts,
    };
    try {
      localStorage.setItem('ourstory_save', JSON.stringify(saveData));
      showSaveNotice('Saved ♥');
    } catch(e) { showSaveNotice('Save failed'); }
  }

  function loadSave() {
    try {
      const raw = localStorage.getItem('ourstory_save');
      if (!raw) return false;
      const data = JSON.parse(raw);
      state.currentNode   = data.node;
      state.romancePoints = data.rp || Story.startRP;
      state.playerName    = data.playerName || 'You';
      state.playerOpts    = data.playerOpts || state.playerOpts;
      state.noeOpts       = data.noeOpts    || state.noeOpts;
      return true;
    } catch(e) { return false; }
  }

  function showSaveNotice(msg) {
    const notice = document.createElement('div');
    notice.style.cssText = 'position:fixed;top:60px;right:16px;background:rgba(255,107,157,0.9);color:#fff;padding:8px 16px;border-radius:20px;font-size:0.85rem;z-index:999;animation:fadeIn 0.3s ease;font-family:Nunito,sans-serif;';
    notice.textContent = msg;
    document.body.appendChild(notice);
    setTimeout(() => notice.remove(), 2000);
  }

  /* ── Settings modal ──────────────────────────────────── */
  function initSettings() {
    $('btn-settings-open').addEventListener('click', () => {
      Audio.sfx('click');
      $('settings-modal').classList.remove('hidden');
    });
    $('btn-settings-close').addEventListener('click', () => {
      Audio.sfx('click');
      $('settings-modal').classList.add('hidden');
    });

    $('vol-master').addEventListener('input', e => Audio.setVolume('master', e.target.value / 100));
    $('vol-music').addEventListener('input', e => Audio.setVolume('music', e.target.value / 100));
    $('vol-sfx').addEventListener('input', e => Audio.setVolume('sfx', e.target.value / 100));

    document.querySelectorAll('.speed-chip').forEach(c => {
      c.addEventListener('click', () => {
        document.querySelectorAll('.speed-chip').forEach(x => x.classList.remove('active'));
        c.classList.add('active');
        state.textSpeed = parseInt(c.dataset.ms);
        Audio.sfx('click');
      });
    });
  }

  /* ── Ending screen buttons ───────────────────────────── */
  function initEndingButtons() {
    $('btn-replay').addEventListener('click', () => {
      Audio.sfx('click');
      resetGame();
      showScreen('create');
    });
    $('btn-to-title').addEventListener('click', () => {
      Audio.sfx('click');
      Audio.stopMusic();
      resetGame();
      showScreen('title');
    });
  }

  function resetGame() {
    state.currentNode   = null;
    state.romancePoints = Story.startRP;
    currentBg   = null;
    currentMusic = null;
    hideAllPanels();
  }

  /* ── Title screen buttons ────────────────────────────── */
  function initTitleButtons() {
    $('btn-new').addEventListener('click', () => {
      Audio.resume();
      Audio.sfx('click');
      showScreen('create');
    });
    $('btn-cont').addEventListener('click', () => {
      Audio.resume();
      if (loadSave()) {
        Audio.sfx('click');
        Audio.init();
        showScreen('game');
        updateNoeSprite('neutral');
        updateRomanceMeter();
        initGameControls();
        loadNode(state.currentNode || 'c1_title');
      } else {
        showSaveNotice('No save found');
      }
    });
  }

  /* ── Keyboard support ────────────────────────────────── */
  function initKeyboard() {
    document.addEventListener('keydown', e => {
      if (e.code === 'Space' || e.code === 'Enter' || e.code === 'ArrowRight') {
        const node = Story.nodes[state.currentNode];
        if (!node) return;
        if (state.isAnimating) {
          const dialogueEl = $('dialogue-text');
          const narrationEl = $('narration-text');
          if (!$('dialogue-box').classList.contains('hidden')) skipTyping(dialogueEl, node.text);
          if (!$('narration-box').classList.contains('hidden')) skipTyping(narrationEl, node.text);
          return;
        }
        if (state.canAdvance && node.next) advance(node.next);
        e.preventDefault();
      }
    });
  }

  /* ── Bootstrap ───────────────────────────────────────── */
  function init() {
    // Unlock audio on first interaction
    document.addEventListener('click', () => Audio.resume(), { once: true });

    runLoading();
    startFloatingHearts();
    initTitleButtons();
    initCreationUI();
    initSettings();
    initEndingButtons();
    initKeyboard();
  }

  document.addEventListener('DOMContentLoaded', init);

  return { state, loadNode };
})();
