/* ============================================================
   OUR STORY — Complete Story Script
   5 Chapters + 4 Endings based on Romance Points
   Starting RP: 20  |  Max possible: ~200 (capped at 100)
   Ending thresholds: Perfect ≥75, Good ≥50, Neutral ≥25, Bad <25
   ============================================================ */

const Story = {

  /* ── Starting state ──────────────────────────────────── */
  startNode: 'c1_intro',
  startRP:   20,

  /* ── Node definitions ───────────────────────────────────
     Types: narration | dialogue | choice | scene | chat
            profile | match | chat_choice | ending | chapter_title
  ─────────────────────────────────────────────────────── */
  nodes: {

    /* ═══════════════════════════════════════
       CHAPTER 1 — "Profile Picture"
       Meeting on a dating app
    ═══════════════════════════════════════ */

    c1_title: {
      type: 'chapter_title',
      chapterNum: 'Chapter One',
      chapterName: '"Profile Picture"',
      background: 'app',
      music: 'lofi',
      next: 'c1_intro',
    },

    c1_intro: {
      type: 'narration',
      text: 'Another Friday night. Another rabbit hole of profiles, pets, and people claiming to love hiking but only Netflix. You scroll… and pause.',
      background: 'app',
      music: 'lofi',
      next: 'c1_profile',
    },

    c1_profile: {
      type: 'profile',
      next: 'c1_swipe_choice',
    },

    c1_swipe_choice: {
      type: 'choice',
      prompt: 'What do you do?',
      choices: [
        { text: '💜 *Snort at the AI cat uprising comment* — "This man is unhinged in the best way." Swipe right.', rp: 10, sfx: 'swipe', next: 'c1_match' },
        { text: '🤔 *Pause at "I\'ll fix your computer but not your feelings"* — Bold. But that Japan solo trip seals it. Swipe right.', rp: 5, sfx: 'swipe', next: 'c1_match' },
        { text: '🐱 *Fixate on the cat mention* — I\'m not here for him, I\'m here for Ginger. Swipe right.', rp: 8, sfx: 'swipe', next: 'c1_match' },
      ],
    },

    c1_match: {
      type: 'match',
      next: 'c1_first_msg',
    },

    c1_first_msg: {
      type: 'chat',
      speaker: 'noe',
      emotion: 'happy',
      messages: [
        { from: 'noe', text: 'Hey! So… you swiped right. Either this was intentional or the universe is running an experiment on both of us. Either way — hi 👋' },
      ],
      next: 'c1_opener_choice',
    },

    c1_opener_choice: {
      type: 'chat_choice',
      choices: [
        { text: '100% intentional. That Japan solo trip sold me.', rp: 10, next: 'c1_reply_japan' },
        { text: 'Universe says hi back apparently.', rp: 8, next: 'c1_reply_universe' },
        { text: 'Honest confession: the cat was the deciding factor.', rp: 7, next: 'c1_reply_cat' },
      ],
    },

    c1_reply_japan: {
      type: 'chat',
      speaker: 'noe',
      emotion: 'laughing',
      messages: [
        { from: 'noe', text: 'Honestly, Japan was the best decision I\'ve ever made. No plan, questionable Japanese, and way too much confidence. Made it back though 😅' },
        { from: 'noe', text: 'So you\'re the kind of person who notices the details. I like that.' },
      ],
      next: 'c1_followup',
    },

    c1_reply_universe: {
      type: 'chat',
      speaker: 'noe',
      emotion: 'happy',
      messages: [
        { from: 'noe', text: 'Ha! The universe has excellent taste apparently.' },
        { from: 'noe', text: 'I choose to take full credit though. The algorithm and I are a team.' },
      ],
      next: 'c1_followup',
    },

    c1_reply_cat: {
      type: 'chat',
      speaker: 'noe',
      emotion: 'laughing',
      messages: [
        { from: 'noe', text: 'HONESTLY fair. Ginger has broken hearts before. He\'s a menace in an orange package.' },
        { from: 'noe', text: 'He did not approve this message but he didn\'t knock my phone away either. That\'s basically a five star review from him.' },
      ],
      next: 'c1_followup',
    },

    c1_followup: {
      type: 'chat',
      speaker: 'noe',
      emotion: 'happy',
      messages: [
        { from: 'noe', text: 'So real question — what actually brought you here? And please don\'t say "just seeing what\'s out there" because that tells me absolutely nothing about you 😂' },
      ],
      next: 'c1_why_choice',
    },

    c1_why_choice: {
      type: 'chat_choice',
      choices: [
        { text: 'Honestly? My friend made me download it. Glad she did now.', rp: 8, next: 'c1_friend_reply' },
        { text: 'I was here for the entertainment value but you\'re actually… interesting.', rp: 7, next: 'c1_interesting_reply' },
        { text: 'Looking for something real. Less swiping, more connecting.', rp: 12, next: 'c1_real_reply' },
      ],
    },

    c1_friend_reply: {
      type: 'chat',
      speaker: 'noe',
      emotion: 'happy',
      messages: [
        { from: 'noe', text: 'Your friend has excellent taste. Thank her for me when the time comes 😉' },
        { from: 'noe', text: 'For what it\'s worth I almost deleted this app three times this week. Glad I didn\'t.' },
      ],
      next: 'c1_transition',
    },

    c1_interesting_reply: {
      type: 'chat',
      speaker: 'noe',
      emotion: 'flustered',
      messages: [
        { from: 'noe', text: '"Actually interesting" — okay that\'s going straight to my head. I\'m saving that screenshot.' },
        { from: 'noe', text: 'No pressure but that might be the nicest thing anyone\'s said to me all week lol.' },
      ],
      next: 'c1_transition',
    },

    c1_real_reply: {
      type: 'chat',
      speaker: 'noe',
      emotion: 'excited',
      messages: [
        { from: 'noe', text: 'OKAY. Less swiping, more connecting. That\'s exactly it. I\'ve been trying to put that into words for months.' },
        { from: 'noe', text: 'Okay you have my full attention now. Tell me literally everything.' },
      ],
      next: 'c1_transition',
    },

    c1_transition: {
      type: 'narration',
      text: 'And that was the beginning. One notification turned into three. Three into twenty. You found yourself checking your phone more often than you expected.',
      background: 'app',
      next: 'c2_title',
    },


    /* ═══════════════════════════════════════
       CHAPTER 2 — "Late Night Texts"
       Getting to know each other
    ═══════════════════════════════════════ */

    c2_title: {
      type: 'chapter_title',
      chapterNum: 'Chapter Two',
      chapterName: '"Late Night Texts"',
      background: 'chat',
      music: 'lofi',
      next: 'c2_intro',
    },

    c2_intro: {
      type: 'narration',
      text: 'Days passed. The messages kept coming. Random questions. Long answers. A photo of Ginger glaring at a ceiling fan. A voice memo at 1am that was just Noe humming a guitar riff and saying "ignore that, actually don\'t, goodnight."',
      background: 'chat',
      next: 'c2_pineapple',
    },

    c2_pineapple: {
      type: 'chat',
      speaker: 'noe',
      emotion: 'serious',
      messages: [
        { from: 'noe', text: 'Okay important question and there is no wrong answer:' },
        { from: 'noe', text: 'Pineapple on pizza. Go.' },
      ],
      next: 'c2_pineapple_choice',
    },

    c2_pineapple_choice: {
      type: 'chat_choice',
      choices: [
        { text: 'Pineapple stays on pizza and you can\'t change my mind.', rp: 5, next: 'c2_pineapple_yes' },
        { text: 'Absolutely not. This is the hill I will die on.', rp: 5, next: 'c2_pineapple_no' },
        { text: 'I have genuinely no strong feelings about this.', rp: 8, next: 'c2_pineapple_neutral' },
      ],
    },

    c2_pineapple_yes: {
      type: 'chat',
      speaker: 'noe',
      emotion: 'thinking',
      messages: [
        { from: 'noe', text: 'Noted. I\'m not going to fight you on this because I\'ve learned that pineapple people are passionate and I respect the conviction.' },
        { from: 'noe', text: 'I will judge silently. From a distance. With love.' },
      ],
      next: 'c2_anime_question',
    },

    c2_pineapple_no: {
      type: 'chat',
      speaker: 'noe',
      emotion: 'happy',
      messages: [
        { from: 'noe', text: 'OKAY the hill you will die on. I respect that.' },
        { from: 'noe', text: 'For what it\'s worth I\'m team neutral. Life is too short to argue about fruit placement.' },
      ],
      next: 'c2_anime_question',
    },

    c2_pineapple_neutral: {
      type: 'chat',
      speaker: 'noe',
      emotion: 'laughing',
      messages: [
        { from: 'noe', text: '"No strong feelings" — you know what that actually IS a personality trait. A very peaceful one. I appreciate it.' },
        { from: 'noe', text: 'You\'re not going to survive arguing with me about philosophy but we can start slow.' },
      ],
      next: 'c2_anime_question',
    },

    c2_anime_question: {
      type: 'chat',
      speaker: 'noe',
      emotion: 'excited',
      messages: [
        { from: 'noe', text: 'Okay here\'s the real one. Have you ever seen Cowboy Bebop?' },
      ],
      next: 'c2_anime_choice',
    },

    c2_anime_choice: {
      type: 'chat_choice',
      choices: [
        { text: 'Yes and I cried at the ending. Don\'t @ me.', rp: 15, next: 'c2_anime_fan' },
        { text: 'I\'ve heard of it but never watched it.', rp: 5, next: 'c2_anime_curious' },
        { text: 'I don\'t really watch anime honestly.', rp: 0, next: 'c2_anime_none' },
      ],
    },

    c2_anime_fan: {
      type: 'chat',
      speaker: 'noe',
      emotion: 'excited',
      messages: [
        { from: 'noe', text: 'OKAY HOLD ON.' },
        { from: 'noe', text: '"See you space cowboy…" why did you bring this energy into my life right now. I was NOT ready.' },
        { from: 'noe', text: 'That ending lives rent free in my head. I refuse to discuss it calmly.' },
      ],
      next: 'c2_ginger_photo',
    },

    c2_anime_curious: {
      type: 'chat',
      speaker: 'noe',
      emotion: 'happy',
      messages: [
        { from: 'noe', text: 'Okay. You\'re getting homework. Watch order, playlist, and a short essay from me explaining why it matters. This is non-negotiable.' },
        { from: 'noe', text: 'I promise it\'s worth it. 26 episodes. Life changing. You\'re welcome in advance.' },
      ],
      next: 'c2_ginger_photo',
    },

    c2_anime_none: {
      type: 'chat',
      speaker: 'noe',
      emotion: 'thinking',
      messages: [
        { from: 'noe', text: 'That\'s fair! No pressure. I won\'t make it weird.' },
        { from: 'noe', text: 'I\'ll just mention things in passing. Casually. Every day. Light recommendations. No agenda.' },
      ],
      next: 'c2_ginger_photo',
    },

    c2_ginger_photo: {
      type: 'chat',
      speaker: 'noe',
      emotion: 'happy',
      messages: [
        { from: 'noe', photo: 'img/ginger.png', text: null },
        { from: 'noe', text: 'This is Ginger. He does not approve of strangers as a rule but he\'s been sitting near my phone all week so I think that counts as something.' },
      ],
      next: 'c2_ginger_choice',
    },

    c2_ginger_choice: {
      type: 'chat_choice',
      choices: [
        { text: 'She is BEAUTIFUL. I am already in love with her.', rp: 10, next: 'c2_ginger_love' },
        { text: 'She looks like she runs the household and absolutely knows it.', rp: 12, sfx: 'laugh', next: 'c2_ginger_knows' },
        { text: 'Is she judging me right now? I feel judged.', rp: 10, next: 'c2_ginger_judge' },
      ],
    },

    c2_ginger_love: {
      type: 'chat',
      speaker: 'noe',
      emotion: 'happy',
      messages: [
        { from: 'noe', text: 'I\'ll let him know. He\'ll pretend he doesn\'t care but he WILL be flattered.' },
        { from: 'noe', text: 'He sat on my face at 3am this morning to signal feeding time so he\'s not without flaws but he is perfect.' },
      ],
      next: 'c2_work_topic',
    },

    c2_ginger_knows: {
      type: 'chat',
      speaker: 'noe',
      emotion: 'laughing',
      messages: [
        { from: 'noe', text: 'YOU UNDERSTOOD THE ASSIGNMENT. He absolutely runs the household.' },
        { from: 'noe', text: 'I\'m just the IT guy who pays rent and provides lap space. That\'s the whole relationship.' },
      ],
      next: 'c2_work_topic',
    },

    c2_ginger_judge: {
      type: 'chat',
      speaker: 'noe',
      emotion: 'laughing',
      messages: [
        { from: 'noe', text: 'He is 100% judging you. He judges everyone. Don\'t take it personally.' },
        { from: 'noe', text: 'He\'s judging ME right now and I live here. You\'re doing fine.' },
      ],
      next: 'c2_work_topic',
    },

    c2_work_topic: {
      type: 'chat',
      speaker: 'noe',
      emotion: 'thinking',
      messages: [
        { from: 'noe', text: 'So I have a confession.' },
        { from: 'noe', text: 'Someone called me today to tell me their computer was "making a noise." That was the whole description. "A noise." I\'m an IT professional at a nonprofit and sometimes this is my life.' },
      ],
      next: 'c2_work_choice',
    },

    c2_work_choice: {
      type: 'chat_choice',
      choices: [
        { text: 'Ha! "A noise." So… did you figure it out?', rp: 8, next: 'c2_work_curious' },
        { text: 'Tech support is genuinely thankless and I respect you for it.', rp: 10, next: 'c2_work_respect' },
        { text: '"A noise." I\'m crying. Please tell me you didn\'t say "have you tried turning it off and on again."', rp: 12, sfx: 'laugh', next: 'c2_work_laugh' },
      ],
    },

    c2_work_curious: {
      type: 'chat',
      speaker: 'noe',
      emotion: 'happy',
      messages: [
        { from: 'noe', text: 'It was the fan. Just… the fan. Took three minutes.' },
        { from: 'noe', text: 'But honestly I don\'t mind. It\'s a nonprofit — we\'re helping people get healthcare. I\'ll fix a thousand "noises" for that.' },
      ],
      next: 'c2_decompress',
    },

    c2_work_respect: {
      type: 'chat',
      speaker: 'noe',
      emotion: 'flustered',
      messages: [
        { from: 'noe', text: 'Thank you genuinely. It\'s a community health center so the mission matters a lot to me.' },
        { from: 'noe', text: 'Plus I get to build automations and scripts when it\'s slow so it evens out. I\'m basically a wizard in a hoodie.' },
      ],
      next: 'c2_decompress',
    },

    c2_work_laugh: {
      type: 'chat',
      speaker: 'noe',
      emotion: 'laughing',
      messages: [
        { from: 'noe', text: 'I DID SAY THAT. Word for word. And it worked. As it always does.' },
        { from: 'noe', text: '"Have you tried turning it off and on again" is literally the haiku of IT support. Timeless. Profound. Works 60% of the time, every time.' },
      ],
      next: 'c2_decompress',
    },

    c2_decompress: {
      type: 'chat',
      speaker: 'noe',
      emotion: 'thinking',
      messages: [
        { from: 'noe', text: 'Okay genuine question.' },
        { from: 'noe', text: 'What do you do when the week gets heavy and you just need to breathe? Like your actual thing.' },
      ],
      next: 'c2_decompress_choice',
    },

    c2_decompress_choice: {
      type: 'chat_choice',
      choices: [
        { text: 'Music. Or a long drive. Something that moves.', rp: 10, next: 'c2_decompress_music' },
        { text: 'Complete silence and my couch. I need to fully recharge.', rp: 8, next: 'c2_decompress_alone' },
        { text: 'Good food and good company. That\'s honestly it.', rp: 12, next: 'c2_decompress_people' },
      ],
    },

    c2_decompress_music: {
      type: 'chat',
      speaker: 'noe',
      emotion: 'happy',
      messages: [
        { from: 'noe', text: 'That\'s it. I play guitar when the week is heavy. There\'s something about making something with your hands when your head is full.' },
        { from: 'noe', text: 'I\'ve been into shoegaze lately — My Bloody Valentine, Slowdive. Music that kind of washes over you. You should listen sometime.' },
      ],
      next: 'c2_japan_story',
    },

    c2_decompress_alone: {
      type: 'chat',
      speaker: 'noe',
      emotion: 'thinking',
      messages: [
        { from: 'noe', text: 'Being present with yourself. That\'s actually underrated. A lot of people can\'t do that.' },
        { from: 'noe', text: 'I recharge alone too. Introvert energy. We understand each other.' },
      ],
      next: 'c2_japan_story',
    },

    c2_decompress_people: {
      type: 'chat',
      speaker: 'noe',
      emotion: 'excited',
      messages: [
        { from: 'noe', text: '"Good food and good company." I\'m writing that down. That\'s genuinely the perfect answer.' },
        { from: 'noe', text: 'Also very convenient that those two things are… going to be available on a certain hypothetical date some hypothetical future day. Hypothetically.' },
      ],
      next: 'c2_japan_story',
    },

    c2_japan_story: {
      type: 'chat',
      speaker: 'noe',
      emotion: 'excited',
      messages: [
        { from: 'noe', text: 'Okay wait I never told you the full Japan story.' },
        { from: 'noe', text: 'I bought a one-way ticket to Tokyo. Just me, a backpack, and complete faith that it would work out.' },
        { from: 'noe', text: 'It worked out. I ate ramen at 2am in a tiny shop where nobody spoke English. Best meal of my life.' },
      ],
      next: 'c2_japan_choice',
    },

    c2_japan_choice: {
      type: 'chat_choice',
      choices: [
        { text: 'That\'s incredible. What made you go alone?', rp: 10, next: 'c2_japan_why' },
        { text: 'One-way ticket! I respect the chaotic energy.', rp: 8, next: 'c2_japan_chaos' },
        { text: 'Okay I\'m jealous. Tell me everything. Every detail.', rp: 12, next: 'c2_japan_detail' },
      ],
    },

    c2_japan_why: {
      type: 'chat',
      speaker: 'noe',
      emotion: 'thinking',
      messages: [
        { from: 'noe', text: 'Nobody was free. And I realized — I\'d been waiting for other people to be ready my whole life.' },
        { from: 'noe', text: 'So I went alone. Best decision. You learn so much about yourself when there\'s nobody else to follow.' },
      ],
      next: 'c2_loading_bar',
    },

    c2_japan_chaos: {
      type: 'chat',
      speaker: 'noe',
      emotion: 'laughing',
      messages: [
        { from: 'noe', text: 'I had $400 and a phone charger. My mom thought I was going to disappear.' },
        { from: 'noe', text: 'She cried when I landed. Then yelled at me for 10 minutes. Then cried again. I love her.' },
      ],
      next: 'c2_loading_bar',
    },

    c2_japan_detail: {
      type: 'chat',
      speaker: 'noe',
      emotion: 'excited',
      messages: [
        { from: 'noe', text: 'OKAY: vending machines everywhere including hot soup. Cats in every alley. A temple on every other block.' },
        { from: 'noe', text: 'I took 2000 photos. I accidentally got on the wrong train twice. I found a record store and spent 3 hours there. It was the trip of my life.' },
      ],
      next: 'c2_loading_bar',
    },

    c2_loading_bar: {
      type: 'chat',
      speaker: 'noe',
      emotion: 'thinking',
      messages: [
        { from: 'noe', text: 'Random question. If your current life situation was a loading bar — what percentage is it?' },
      ],
      next: 'c2_loading_choice',
    },

    c2_loading_choice: {
      type: 'chat_choice',
      choices: [
        { text: '45%. Halfway there but the download keeps stalling.', rp: 8, next: 'c2_loading_stall' },
        { text: '70%. Things are slowly coming together.', rp: 8, next: 'c2_loading_good' },
        { text: 'I\'m on the "Please Wait" screen. No percentage visible.', rp: 10, sfx: 'laugh', next: 'c2_loading_wait' },
      ],
    },

    c2_loading_stall: {
      type: 'chat',
      speaker: 'noe',
      emotion: 'thinking',
      messages: [
        { from: 'noe', text: '"Stalling at 45%" — okay I feel that. That\'s actually poetic.' },
        { from: 'noe', text: 'Mine is like 60%. Functional but still buffering in the background. The important stuff is loading.' },
      ],
      next: 'c2_transition',
    },

    c2_loading_good: {
      type: 'chat',
      speaker: 'noe',
      emotion: 'happy',
      messages: [
        { from: 'noe', text: '70% is honestly strong. Things coming together slowly is underrated. Better than fake 100%.' },
        { from: 'noe', text: 'I\'m at like 62. But the remaining 38% is the good stuff. The stuff worth waiting for.' },
      ],
      next: 'c2_transition',
    },

    c2_loading_wait: {
      type: 'chat',
      speaker: 'noe',
      emotion: 'laughing',
      messages: [
        { from: 'noe', text: 'THE "PLEASE WAIT" SCREEN. I felt that in my soul.' },
        { from: 'noe', text: 'Okay I officially like you. That\'s the most honest answer I\'ve ever gotten to that question.' },
      ],
      next: 'c2_transition',
    },

    c2_transition: {
      type: 'narration',
      text: 'The nights got later. The messages got longer. And somehow, what started as small talk had become something neither of you were ready to name.',
      background: 'chat',
      next: 'c3_title',
    },


    /* ═══════════════════════════════════════
       CHAPTER 3 — "The Invitation"
       Being asked on a date
    ═══════════════════════════════════════ */

    c3_title: {
      type: 'chapter_title',
      chapterNum: 'Chapter Three',
      chapterName: '"The Invitation"',
      background: 'golden',
      music: 'golden',
      next: 'c3_intro',
    },

    c3_intro: {
      type: 'narration',
      text: 'Three weeks of texts. Two accidental phone calls that lasted way longer than planned. One very long debate about whether dogs or cats better represent your personality. You\'d settled into something comfortable. Maybe too comfortable.',
      background: 'golden',
      next: 'c3_nervous',
    },

    c3_nervous: {
      type: 'dialogue',
      speaker: 'Noe',
      emotion: 'nervous',
      text: 'Okay so. I have a question and I\'ve been thinking about how to ask it for like three days.',
      background: 'golden',
      next: 'c3_three_days',
    },

    c3_three_days: {
      type: 'dialogue',
      speaker: 'You',
      emotion: null,
      text: '…Three days?',
      background: 'golden',
      next: 'c3_pros_cons',
    },

    c3_pros_cons: {
      type: 'dialogue',
      speaker: 'Noe',
      emotion: 'nervous',
      text: 'I made a pros and cons list. The cat sat on the notebook and judged me. I deleted it. Just — okay. Let me do this.',
      background: 'golden',
      next: 'c3_let_him_choice',
    },

    c3_let_him_choice: {
      type: 'choice',
      prompt: 'How do you respond?',
      choices: [
        { text: '*Give him the floor. Say nothing. Just wait with a small smile.*', rp: 12, next: 'c3_ask' },
        { text: '"Take your time. No pressure."', rp: 8, next: 'c3_ask' },
        { text: '"Did the cons list win?"', rp: 10, sfx: 'laugh', next: 'c3_cons_won' },
      ],
    },

    c3_cons_won: {
      type: 'dialogue',
      speaker: 'Noe',
      emotion: 'laughing',
      text: 'The cons list had one item: "What if she says no." And then I added "but what if she says yes" and the whole document collapsed.',
      background: 'golden',
      next: 'c3_ask',
    },

    c3_ask: {
      type: 'dialogue',
      speaker: 'Noe',
      emotion: 'nervous',
      text: 'Would you want to go out with me? Like an actual date. I was thinking — there\'s this arcade nearby I\'ve been wanting to check out. And then maybe In-N-Out after, because — okay wait, is In-N-Out too casual for a first date?',
      background: 'golden',
      next: 'c3_ask_choice',
    },

    c3_ask_choice: {
      type: 'choice',
      prompt: 'What do you say?',
      choices: [
        { text: '"In-N-Out is perfect. A man who knows what actually matters."', rp: 12, sfx: 'heart', next: 'c3_perfect' },
        { text: '"I was hoping you\'d ask. And yes — that sounds amazing."', rp: 10, sfx: 'heart', next: 'c3_amazing' },
        { text: '"An arcade AND In-N-Out? You really know how to sweep a girl off her feet."', rp: 8, sfx: 'heart', next: 'c3_sweep' },
      ],
    },

    c3_perfect: {
      type: 'dialogue',
      speaker: 'Noe',
      emotion: 'excited',
      text: 'Okay. Okay great. I was genuinely worried about the In-N-Out thing. My coworker said I should do something fancier but — we should be ourselves, right?',
      background: 'golden',
      next: 'c3_saturday',
    },

    c3_amazing: {
      type: 'dialogue',
      speaker: 'Noe',
      emotion: 'excited',
      text: 'Wait you were hoping I\'d ask? That\'s — okay that\'s really good to hear. I\'ve been overthinking this for a week. A whole week.',
      background: 'golden',
      next: 'c3_saturday',
    },

    c3_sweep: {
      type: 'dialogue',
      speaker: 'Noe',
      emotion: 'laughing',
      text: 'I mean — I figured if I was going to do this I should at least be honest about who I am. I\'m a guy with opinions about Animal Style and a crane game strategy. Take it or leave it.',
      background: 'golden',
      next: 'c3_saturday',
    },

    c3_saturday: {
      type: 'dialogue',
      speaker: 'Noe',
      emotion: 'happy',
      text: 'Saturday? I\'ll send a location. I\'ll be the one standing outside looking like I\'m trying to remember if I left the stove on.',
      background: 'golden',
      next: 'c3_confirm_choice',
    },

    c3_confirm_choice: {
      type: 'choice',
      prompt: 'Your reply?',
      choices: [
        { text: '"Saturday works. I\'ll be the one pretending I\'m not nervous too."', rp: 12, next: 'c3_confirmed' },
        { text: '"Saturday. The stove is probably fine, by the way."', rp: 8, next: 'c3_stove' },
        { text: '"I\'ll be on time. No promises on the calm part."', rp: 10, next: 'c3_confirmed' },
      ],
    },

    c3_stove: {
      type: 'dialogue',
      speaker: 'Noe',
      emotion: 'laughing',
      text: 'I DID leave the stove on once. Ginger knocked the smoke alarm off the ceiling and looked at me like "fix this." She was right.',
      background: 'golden',
      next: 'c3_confirmed',
    },

    c3_confirmed: {
      type: 'dialogue',
      speaker: 'Noe',
      emotion: 'excited',
      text: 'Perfect. It\'s a date. An actual, real, I-put-it-in-my-calendar date.',
      background: 'golden',
      next: 'c3_transition',
    },

    c3_transition: {
      type: 'narration',
      text: 'Saturday couldn\'t come fast enough. You spent Thursday picking an outfit. Then changed it Friday. Then went back to the first one Saturday morning and called it instinct.',
      background: 'golden',
      next: 'c4_title',
    },


    /* ═══════════════════════════════════════
       CHAPTER 4 — "Insert Coin"
       The arcade date
    ═══════════════════════════════════════ */

    c4_title: {
      type: 'chapter_title',
      chapterNum: 'Chapter Four',
      chapterName: '"Insert Coin"',
      background: 'arcade',
      music: 'arcade',
      next: 'c4_arrive',
    },

    c4_arrive: {
      type: 'narration',
      text: 'The arcade smell hits you the second the doors open. Tokens, carpet, the ghost of a thousand competitive childhoods. You see him before he sees you.',
      background: 'arcade',
      next: 'c4_spot_him',
    },

    c4_spot_him: {
      type: 'narration',
      text: 'Dark hoodie. Those blue glasses. Hair doing whatever it wants. He\'s looking at his phone with the expression of someone who has absolutely no idea what to do with his hands.',
      background: 'arcade',
      next: 'c4_sees_you',
    },

    c4_sees_you: {
      type: 'dialogue',
      speaker: 'Noe',
      emotion: 'nervous',
      text: 'Hey! You came. I mean — obviously you came, you said you would, I just — hi.',
      background: 'arcade',
      next: 'c4_greeting_choice',
    },

    c4_greeting_choice: {
      type: 'choice',
      prompt: 'How do you greet him?',
      choices: [
        { text: '"Hi yourself. You look nice."', rp: 10, next: 'c4_looks_nice' },
        { text: '"Were you worried I\'d ghost you?"', rp: 8, next: 'c4_ghost' },
        { text: '*laugh* "The hands-in-pockets thing is very relatable."', rp: 12, sfx: 'laugh', next: 'c4_hands' },
      ],
    },

    c4_looks_nice: {
      type: 'dialogue',
      speaker: 'Noe',
      emotion: 'flustered',
      text: 'You look — yeah. Okay hi. Cool. I\'m very cool right now. Extremely composed.',
      background: 'arcade',
      next: 'c4_scope',
    },

    c4_ghost: {
      type: 'dialogue',
      speaker: 'Noe',
      emotion: 'nervous',
      text: 'A little? Only because I desperately want this to go well and I\'m aware that\'s a lot of pressure to put on an arcade. The arcade didn\'t ask for this.',
      background: 'arcade',
      next: 'c4_scope',
    },

    c4_hands: {
      type: 'dialogue',
      speaker: 'Noe',
      emotion: 'laughing',
      text: 'My hands have nowhere to go in social situations. I\'m actively working on accepting this about myself. Pocket management is a skill.',
      background: 'arcade',
      next: 'c4_scope',
    },

    c4_scope: {
      type: 'dialogue',
      speaker: 'Noe',
      emotion: 'excited',
      text: 'Okay so — I\'ve already scouted this place. There\'s a racing game in the back that I will absolutely destroy you at. Friendly heads up.',
      background: 'arcade',
      next: 'c4_competitive_choice',
    },

    c4_competitive_choice: {
      type: 'choice',
      prompt: 'Your response to the trash talk?',
      choices: [
        { text: '"Oh it\'s on. I grew up on Mario Kart."', rp: 10, next: 'c4_mario_kart' },
        { text: '"Confident. I respect it."', rp: 8, next: 'c4_confident' },
        { text: '"You know trash talk is just future regret, right?"', rp: 12, sfx: 'laugh', next: 'c4_trash_talk' },
      ],
    },

    c4_mario_kart: {
      type: 'dialogue',
      speaker: 'Noe',
      emotion: 'serious',
      text: 'Oh you grew up on Mario Kart. Interesting. We\'ll see how those skills transfer.',
      background: 'arcade',
      next: 'c4_race',
    },

    c4_confident: {
      type: 'dialogue',
      speaker: 'Noe',
      emotion: 'excited',
      text: 'I appreciate that. I\'ve done extensive research on this specific machine. Okay I read the tutorial once but it counts.',
      background: 'arcade',
      next: 'c4_race',
    },

    c4_trash_talk: {
      type: 'dialogue',
      speaker: 'Noe',
      emotion: 'laughing',
      text: '"Future regret." I\'m writing that down. Putting it right next to the pros and cons list ashes.',
      background: 'arcade',
      next: 'c4_race',
    },

    c4_race: {
      type: 'narration',
      text: 'The racing game is everything Noe promised. He gets very quiet and very focused. The look of someone who takes arcade games exactly as seriously as they should.',
      background: 'arcade',
      next: 'c4_panicking',
    },

    c4_panicking: {
      type: 'dialogue',
      speaker: 'Noe',
      emotion: 'serious',
      text: 'I\'m not panicking. I\'m strategizing. There\'s a difference and it\'s significant.',
      background: 'arcade',
      next: 'c4_win',
    },

    c4_win: {
      type: 'narration',
      text: 'You win.',
      background: 'arcade',
      next: 'c4_win_choice',
    },

    c4_win_choice: {
      type: 'choice',
      prompt: 'How do you handle winning?',
      choices: [
        { text: '*Victory celebration* "IN YOUR FACE."', rp: 5, sfx: 'win', next: 'c4_win_loud' },
        { text: '"To be fair — you made it interesting."', rp: 8, next: 'c4_win_kind' },
        { text: '"Okay your panicking was kind of adorable."', rp: 12, next: 'c4_win_adorable' },
      ],
    },

    c4_win_loud: {
      type: 'dialogue',
      speaker: 'Noe',
      emotion: 'laughing',
      text: 'OKAY. Okay that was earned. You have FULLY earned that. I respect it and I despise it in equal measure.',
      background: 'arcade',
      next: 'c4_crane_setup',
    },

    c4_win_kind: {
      type: 'dialogue',
      speaker: 'Noe',
      emotion: 'happy',
      text: '"Interesting." That\'s very generous. I lost on the second lap. We don\'t need to talk about the second lap.',
      background: 'arcade',
      next: 'c4_crane_setup',
    },

    c4_win_adorable: {
      type: 'dialogue',
      speaker: 'Noe',
      emotion: 'flustered',
      text: '"Adorable." Was it? I feel like panicking in front of someone you like is either charming or a red flag and I genuinely don\'t know which.',
      background: 'arcade',
      next: 'c4_crane_setup',
    },

    c4_crane_setup: {
      type: 'narration',
      text: 'You find the crane game. Giant stuffed animals stare out from behind the glass. Noe looks at it with the expression of a man who has just discovered his true purpose.',
      background: 'arcade',
      next: 'c4_crane_declaration',
    },

    c4_crane_declaration: {
      type: 'dialogue',
      speaker: 'Noe',
      emotion: 'serious',
      text: 'I\'m winning you that bear.',
      background: 'arcade',
      next: 'c4_crane_choice',
    },

    c4_crane_choice: {
      type: 'choice',
      prompt: 'Your reaction?',
      choices: [
        { text: '"That machine is definitely rigged."', rp: 5, next: 'c4_crane_rigged' },
        { text: '"You don\'t have to win me anything."', rp: 12, next: 'c4_crane_sweet' },
        { text: '"If you win it — it lives with Ginger."', rp: 15, sfx: 'laugh', next: 'c4_crane_ginger' },
      ],
    },

    c4_crane_rigged: {
      type: 'dialogue',
      speaker: 'Noe',
      emotion: 'serious',
      text: 'All crane games are rigged. That\'s what makes it a challenge. I have a strategy. It involves patience, physics, and spending more tokens than is reasonable.',
      background: 'arcade',
      next: 'c4_crane_fail',
    },

    c4_crane_sweet: {
      type: 'dialogue',
      speaker: 'Noe',
      emotion: 'happy',
      text: 'I know I don\'t have to. I want to. There\'s a difference. Also I\'m very good at this. Probably.',
      background: 'arcade',
      next: 'c4_crane_fail',
    },

    c4_crane_ginger: {
      type: 'dialogue',
      speaker: 'Noe',
      emotion: 'laughing',
      text: 'GINGER WOULD HATE THAT SO MUCH. She\'d shred it within a week. Okay I\'m winning this for Ginger now. She needs a nemesis.',
      background: 'arcade',
      next: 'c4_crane_fail',
    },

    c4_crane_fail: {
      type: 'narration',
      text: 'He tries four times. The claw drifts. The bear stays exactly where it is. Noe stares at the machine for a long, philosophical moment.',
      background: 'arcade',
      next: 'c4_real_win',
    },

    c4_real_win: {
      type: 'dialogue',
      speaker: 'Noe',
      emotion: 'thinking',
      text: 'You know what? The real win was the tokens we spent along the way.',
      background: 'arcade',
      next: 'c4_bench',
    },

    c4_bench: {
      type: 'narration',
      text: 'You both collapse onto a bench near the ticket redemption counter. The noise of the arcade wraps around you like white noise. Comfortable. Easy.',
      background: 'arcade',
      next: 'c4_real_talk',
    },

    c4_real_talk: {
      type: 'dialogue',
      speaker: 'Noe',
      emotion: 'thinking',
      text: 'Can I be real for a second? Not deep-dark-secrets real. Just… real.',
      background: 'arcade',
      next: 'c4_real_choice',
    },

    c4_real_choice: {
      type: 'choice',
      prompt: 'Your answer?',
      choices: [
        { text: '"Always. Real is all I\'m here for."', rp: 12, next: 'c4_real_response' },
        { text: '"Real is my default setting."', rp: 10, next: 'c4_real_response' },
        { text: '"I\'m listening." *turns to face him*', rp: 8, next: 'c4_real_response' },
      ],
    },

    c4_real_response: {
      type: 'dialogue',
      speaker: 'Noe',
      emotion: 'serious',
      text: 'I know this is still early. But I genuinely enjoy talking to you. Like — I\'ve thought more carefully about how I phrase things in the last few weeks than I have in a long time. And that means something to me.',
      background: 'arcade',
      next: 'c4_honest_choice',
    },

    c4_honest_choice: {
      type: 'choice',
      prompt: 'How do you respond?',
      choices: [
        { text: '"That\'s one of the nicest things anyone\'s said to me."', rp: 12, next: 'c4_honest_nice' },
        { text: '"I know what you mean. I\'ve been thinking too."', rp: 10, next: 'c4_honest_same' },
        { text: '"You\'re making it very hard to keep playing it cool."', rp: 12, next: 'c4_honest_cool' },
      ],
    },

    c4_honest_nice: {
      type: 'dialogue',
      speaker: 'Noe',
      emotion: 'happy',
      text: 'Good. That\'s the goal. The bar is low out here and I\'m trying to clear it by a comfortable margin.',
      background: 'arcade',
      next: 'c4_ready_eat',
    },

    c4_honest_same: {
      type: 'dialogue',
      speaker: 'Noe',
      emotion: 'happy',
      text: 'Yeah? Okay. Good. That\'s — good. Cool. I\'m being very chill about this. As you can see.',
      background: 'arcade',
      next: 'c4_ready_eat',
    },

    c4_honest_cool: {
      type: 'dialogue',
      speaker: 'Noe',
      emotion: 'laughing',
      text: 'Good. I\'m not trying to play it cool either. That ship sailed after the pros and cons list incident.',
      background: 'arcade',
      next: 'c4_ready_eat',
    },

    c4_ready_eat: {
      type: 'dialogue',
      speaker: 'Noe',
      emotion: 'excited',
      text: 'Ready to eat? I have been thinking about this burger since Tuesday.',
      background: 'arcade',
      next: 'c4_transition',
    },

    c4_transition: {
      type: 'narration',
      text: 'The arcade glowed behind you as you stepped out into the night. Something between you had shifted, quiet as a change of season.',
      background: 'arcade',
      next: 'c5_title',
    },


    /* ═══════════════════════════════════════
       CHAPTER 5 — "Animal Style"
       In-N-Out dinner — deepening connection
    ═══════════════════════════════════════ */

    c5_title: {
      type: 'chapter_title',
      chapterNum: 'Chapter Five',
      chapterName: '"Animal Style"',
      background: 'innout',
      music: 'innout',
      next: 'c5_arrive',
    },

    c5_arrive: {
      type: 'narration',
      text: 'In-N-Out at 9pm. The line is shorter now and the lights are that specific yellow that makes everything feel a little nostalgic for something you haven\'t done yet.',
      background: 'innout',
      next: 'c5_order',
    },

    c5_order: {
      type: 'dialogue',
      speaker: 'Noe',
      emotion: 'serious',
      text: 'Okay. Important information. Animal Style is not optional. Grilled onions, extra spread, mustard seared into the patty. It is the correct way to eat this burger and I won\'t negotiate on this.',
      background: 'innout',
      next: 'c5_order_choice',
    },

    c5_order_choice: {
      type: 'choice',
      prompt: 'How do you respond to the Animal Style speech?',
      choices: [
        { text: '"I\'m already Animal Style. There is no other way."', rp: 12, next: 'c5_order_yes' },
        { text: '"What IS Animal Style? Walk me through this."', rp: 5, next: 'c5_order_explain' },
        { text: '"You have strong opinions about food. I respect that completely."', rp: 8, next: 'c5_order_respect' },
      ],
    },

    c5_order_yes: {
      type: 'dialogue',
      speaker: 'Noe',
      emotion: 'excited',
      text: 'OKAY. Okay hi. I like you even more now. This is going very well.',
      background: 'innout',
      next: 'c5_sit',
    },

    c5_order_explain: {
      type: 'dialogue',
      speaker: 'Noe',
      emotion: 'serious',
      text: 'Grilled onions. Extra spread — it\'s like secret sauce. And they cook the patty with mustard directly on the griddle. It caramelizes. It\'s a religious experience. You\'re getting it.',
      background: 'innout',
      next: 'c5_sit',
    },

    c5_order_respect: {
      type: 'dialogue',
      speaker: 'Noe',
      emotion: 'laughing',
      text: 'I have strong opinions about many things. Food is just the safest one to lead with. The philosophy opinions come out later.',
      background: 'innout',
      next: 'c5_sit',
    },

    c5_sit: {
      type: 'narration',
      text: 'You find a corner booth. There\'s something different about dinner. The arcade was all surface energy — bright and loud. But here, with food between you and nowhere else to be, things get quieter. Better.',
      background: 'innout',
      next: 'c5_five_years',
    },

    c5_five_years: {
      type: 'dialogue',
      speaker: 'Noe',
      emotion: 'thinking',
      text: 'Okay real question. What do you want your life to look like in five years? Not your career. Just — your life.',
      background: 'innout',
      next: 'c5_five_choice',
    },

    c5_five_choice: {
      type: 'choice',
      prompt: 'What do you want?',
      choices: [
        { text: '"Settled. Maybe a home. Someone to come back to."', rp: 12, next: 'c5_settled' },
        { text: '"Still figuring it out, but I know I want it to feel like mine."', rp: 8, next: 'c5_figuring' },
        { text: '"I know more of what I don\'t want than what I do — but that\'s progress."', rp: 7, next: 'c5_progress' },
      ],
    },

    c5_settled: {
      type: 'dialogue',
      speaker: 'Noe',
      emotion: 'serious',
      text: 'Yeah. That\'s it. I want to build something. Slowly. With intention. Not chasing something that keeps moving. Just — roots.',
      background: 'innout',
      next: 'c5_parents',
    },

    c5_figuring: {
      type: 'dialogue',
      speaker: 'Noe',
      emotion: 'thinking',
      text: '"Feel like mine." That\'s actually really good. I\'m stealing that. I\'ve been trying to figure out how to say that for months.',
      background: 'innout',
      next: 'c5_parents',
    },

    c5_progress: {
      type: 'dialogue',
      speaker: 'Noe',
      emotion: 'happy',
      text: 'That\'s actually underrated as self-knowledge. Knowing what you don\'t want saves so much time and heartbreak. I respect that.',
      background: 'innout',
      next: 'c5_parents',
    },

    c5_parents: {
      type: 'dialogue',
      speaker: 'Noe',
      emotion: 'thinking',
      text: 'My parents have been together over thirty years. They argued about everything — laundry, driving, whose turn it was to apologize first. And I used to think that was the problem. Then I realized — it wasn\'t. The arguing wasn\'t it. They just never stopped choosing each other.',
      background: 'innout',
      next: 'c5_parents_choice',
    },

    c5_parents_choice: {
      type: 'choice',
      prompt: 'Your response?',
      choices: [
        { text: '"That\'s a beautiful way to put it."', rp: 10, next: 'c5_parents_beautiful' },
        { text: '"Choosing each other on purpose. Not just by default. That\'s the goal."', rp: 12, next: 'c5_parents_purpose' },
        { text: '"Your parents sound amazing."', rp: 8, next: 'c5_parents_amazing' },
      ],
    },

    c5_parents_beautiful: {
      type: 'dialogue',
      speaker: 'Noe',
      emotion: 'happy',
      text: 'It took me a while to see it. Watching them for years and finally understanding what it actually takes.',
      background: 'innout',
      next: 'c5_faith_intro',
    },

    c5_parents_purpose: {
      type: 'dialogue',
      speaker: 'Noe',
      emotion: 'happy',
      text: 'Exactly that. On purpose. Not inertia. Not convenience. That\'s what I want.',
      background: 'innout',
      next: 'c5_faith_intro',
    },

    c5_parents_amazing: {
      type: 'dialogue',
      speaker: 'Noe',
      emotion: 'happy',
      text: 'They really are. My mom is dramatic and my dad is patient. Together they somehow work. I\'m still studying how.',
      background: 'innout',
      next: 'c5_faith_intro',
    },

    c5_faith_intro: {
      type: 'dialogue',
      speaker: 'Noe',
      emotion: 'serious',
      text: 'Okay. I\'m going to say something and you can tell me if it\'s too much.',
      background: 'innout',
      next: 'c5_faith_setup_choice',
    },

    c5_faith_setup_choice: {
      type: 'choice',
      prompt: '',
      choices: [
        { text: '"Go ahead. I promise not to run."', rp: 12, next: 'c5_faith' },
        { text: '"I\'ll let you know when it\'s too much."', rp: 8, next: 'c5_faith' },
        { text: '*lean in slightly* "I\'m listening."', rp: 10, next: 'c5_faith' },
      ],
    },

    c5_faith: {
      type: 'dialogue',
      speaker: 'Noe',
      emotion: 'serious',
      text: 'My faith is a core part of who I am. I\'m not preachy about it. But it shapes how I see people. Why I work at a nonprofit. How I approach relationships. I don\'t need someone to share every belief I have — but I need someone who respects them. And honestly, who challenges me to be better. That matters.',
      background: 'innout',
      next: 'c5_faith_choice',
    },

    c5_faith_choice: {
      type: 'choice',
      prompt: 'How do you respond?',
      choices: [
        { text: '"Faith that shows up in how you live is different from faith that just talks. I can see yours."', rp: 15, sfx: 'heart', next: 'c5_faith_seen' },
        { text: '"I appreciate you being upfront about that. That kind of honesty is rare."', rp: 12, next: 'c5_faith_honest' },
        { text: '"What does that look like for you in day-to-day life? I\'m genuinely curious."', rp: 10, next: 'c5_faith_curious' },
      ],
    },

    c5_faith_seen: {
      type: 'dialogue',
      speaker: 'Noe',
      emotion: 'flustered',
      text: '…Yeah. Exactly. You just described it better than I ever have. Where have you been?',
      background: 'innout',
      next: 'c5_sauce',
    },

    c5_faith_honest: {
      type: 'dialogue',
      speaker: 'Noe',
      emotion: 'happy',
      text: 'I learned early that being upfront saves a lot of heartache later. For both people. No surprises.',
      background: 'innout',
      next: 'c5_sauce',
    },

    c5_faith_curious: {
      type: 'dialogue',
      speaker: 'Noe',
      emotion: 'thinking',
      text: 'Honestly? It\'s mostly in the small stuff. How I treat people at work. Why I keep showing up for things that are hard. Gratitude as a practice, not just a word.',
      background: 'innout',
      next: 'c5_sauce',
    },

    c5_sauce: {
      type: 'narration',
      text: 'The food was nearly gone. The night had that stretched quality — neither of you wanting to be the first to suggest it was time to leave.',
      background: 'innout',
      next: 'c5_confession',
    },

    c5_confession: {
      type: 'dialogue',
      speaker: 'Noe',
      emotion: 'serious',
      text: 'I have to tell you something important.',
      background: 'innout',
      next: 'c5_heart_drop',
    },

    c5_heart_drop: {
      type: 'narration',
      text: 'Your heart did something unreasonable.',
      background: 'innout',
      next: 'c5_sauce_reveal',
    },

    c5_sauce_reveal: {
      type: 'dialogue',
      speaker: 'Noe',
      emotion: 'nervous',
      text: 'I got sauce on my sleeve like fifteen minutes ago and I\'ve been hiding it this whole time.',
      background: 'innout',
      next: 'c5_sauce_choice',
    },

    c5_sauce_choice: {
      type: 'choice',
      prompt: 'Your reaction?',
      choices: [
        { text: '*burst out laughing*', rp: 15, sfx: 'laugh', next: 'c5_laugh_together' },
        { text: '"I saw it when it happened."', rp: 12, next: 'c5_saw_it' },
        { text: '*immediately check your own sleeve* "…wait."', rp: 15, sfx: 'laugh', next: 'c5_check_sleeve' },
      ],
    },

    c5_laugh_together: {
      type: 'dialogue',
      speaker: 'Noe',
      emotion: 'laughing',
      text: 'I was sitting there having the most genuine conversation I\'ve had in months and the whole time I was also personally managing a sauce situation. I\'m a complex person.',
      background: 'innout',
      next: 'c5_i_like_you',
    },

    c5_saw_it: {
      type: 'dialogue',
      speaker: 'Noe',
      emotion: 'flustered',
      text: 'You SAW it? And you said nothing?! The mercy. The kindness. You are genuinely a good person.',
      background: 'innout',
      next: 'c5_i_like_you',
    },

    c5_check_sleeve: {
      type: 'dialogue',
      speaker: 'Noe',
      emotion: 'laughing',
      text: 'Were you ALSO checking your sleeve?? We were both in there having deep conversations and also silently managing sauce incidents. This is the most relatable date I\'ve ever been on.',
      background: 'innout',
      next: 'c5_i_like_you',
    },

    c5_i_like_you: {
      type: 'dialogue',
      speaker: 'Noe',
      emotion: 'serious',
      text: 'I really like you. I don\'t say that to fill space. I don\'t say it lightly. I mean it.',
      background: 'innout',
      next: 'c5_like_back_choice',
    },

    c5_like_back_choice: {
      type: 'choice',
      prompt: 'What do you say?',
      choices: [
        { text: '"I really like you too. I wasn\'t expecting this."', rp: 15, sfx: 'heart', next: 'c5_not_expected' },
        { text: '"You\'re going to be dangerous, aren\'t you."', rp: 12, next: 'c5_dangerous' },
        { text: '*smile and say nothing for a moment* "…Yeah."', rp: 10, next: 'c5_yeah' },
      ],
    },

    c5_not_expected: {
      type: 'dialogue',
      speaker: 'Noe',
      emotion: 'happy',
      text: 'Same. I came in here expecting to be nervous and eat a good burger. This is significantly better.',
      background: 'innout',
      next: 'c5_again',
    },

    c5_dangerous: {
      type: 'dialogue',
      speaker: 'Noe',
      emotion: 'laughing',
      text: '"Dangerous." Maybe a little. Fair warning: I remember things people say. I think about them later. It\'s a whole thing.',
      background: 'innout',
      next: 'c5_again',
    },

    c5_yeah: {
      type: 'dialogue',
      speaker: 'Noe',
      emotion: 'happy',
      text: 'Yeah. Okay. "Yeah." I\'ll take it.',
      background: 'innout',
      next: 'c5_again',
    },

    c5_again: {
      type: 'dialogue',
      speaker: 'Noe',
      emotion: 'excited',
      text: 'We should do this again. Not as a maybe. As an actual plan.',
      background: 'innout',
      next: 'c5_final_choice',
    },

    c5_final_choice: {
      type: 'choice',
      prompt: 'Your answer?',
      choices: [
        { text: '"This Saturday?"', rp: 15, sfx: 'heart', next: 'c5_saturday' },
        { text: '"Whenever you want. I\'m free."', rp: 12, sfx: 'heart', next: 'c5_whenever' },
        { text: '"Definitely. I\'ll hold you to that."', rp: 10, next: 'c5_hold_you' },
      ],
    },

    c5_saturday: {
      type: 'dialogue',
      speaker: 'Noe',
      emotion: 'excited',
      text: 'This Saturday. Done. I\'m putting it in my calendar right now while you\'re watching me so it\'s real.',
      background: 'innout',
      next: 'c5_to_ending',
    },

    c5_whenever: {
      type: 'dialogue',
      speaker: 'Noe',
      emotion: 'happy',
      text: '"You\'re free." Okay. That\'s. Yeah. I\'m going to text you tomorrow. Tonight actually. In twenty minutes.',
      background: 'innout',
      next: 'c5_to_ending',
    },

    c5_hold_you: {
      type: 'dialogue',
      speaker: 'Noe',
      emotion: 'happy',
      text: 'Please do. I need the accountability. Also it\'s a good excuse to keep talking to you.',
      background: 'innout',
      next: 'c5_to_ending',
    },

    c5_to_ending: {
      type: 'scene',
      background: 'night',
      music: null,
      next: 'route_ending',
    },

    /* ═══════════════════════════════════════
       ENDING ROUTER
    ═══════════════════════════════════════ */

    route_ending: {
      type: 'route',
      routes: [
        { minRP: 70, next: 'ending_perfect' },
        { minRP: 40, next: 'ending_good'    },
        { minRP: 0,  next: 'ending_bad'     },
      ],
    },

    /* ═══════════════════════════════════════
       ENDINGS
    ═══════════════════════════════════════ */

    ending_perfect: {
      type: 'ending',
      background: 'ending-perfect',
      music: 'romance',
      sfx: 'match',
      title: 'Our Story',
      subtitle: '♥ Perfect Match',
      badge: '✦ Soulmate Ending ✦',
      deco: '♥',
      text: `Walking out into the cool night air, Noe walked close enough that your arms kept brushing. Neither of you moved away.\n\n"For the record," he said quietly, "best first date I've ever been on."\n\nYou reached your car. He looked at you the way people look at something they don't want to stop looking at.\n\n"I'm going to text you the second I get home. Is that too much?"\n\nYou smiled. "It's exactly enough."\n\nHe watched you drive away. Three minutes later: "Made it home. Ginger judged me the moment I walked in. I think she knows. Also — Saturday? I already have something planned. Sunsets and debatable philosophy. Dress warm."\n\nYou laughed out loud, alone in your room, at nothing but your phone screen.\n\nThat was the beginning.`,
    },

    ending_good: {
      type: 'ending',
      background: 'ending-good',
      music: 'romance',
      sfx: 'heart',
      title: 'Chapter Two',
      subtitle: '♥ A Promising Start',
      badge: '✦ Good Ending ✦',
      deco: '♡',
      text: `The parking lot was quiet. You stood by your car for longer than necessary, neither of you quite ready to call it.\n\n"This was really fun," Noe said. "Really."\n\nHis smile was genuine — warm and a little tired in the good way, the way evenings are when they meant something.\n\n"I'll message you," he said.\n\nHe did. Twenty minutes later: "Hey. Got home safe. Ginger is looking at me like she knows something happened. She knocked my dinner off the counter which is either a sign or just a Tuesday."\n\nThere was potential here. Real potential. The kind you don't want to rush but also can't quite ignore.\n\nYou texted back. He replied instantly. The night got a little later.`,
    },

    ending_neutral: {
      type: 'ending',
      background: 'ending-neutral',
      music: 'sad',
      sfx: null,
      title: 'Almost',
      subtitle: '○ Mixed Signals',
      badge: '○ Neutral Ending ○',
      deco: '○',
      text: `Goodnight felt a little uncertain. There was something there — you'd both felt it in flashes — but it hadn't quite found its footing.\n\n"I had a good time," Noe said. He meant it. "I'll, uh… reach out sometime."\n\nSometimes you meet someone good. Someone genuine. But the timing is off, or the frequencies don't quite sync.\n\nHe did text. You replied. It stayed light, comfortable — maybe that was its own kind of ending.\n\nNot every story starts in chapter one. Some wait for better timing, better versions of the same two people.\n\nMaybe chapter two was still out there, waiting.`,
    },

    ending_bad: {
      type: 'ending',
      background: 'ending-bad',
      music: 'sad',
      sfx: null,
      title: 'Strangers',
      subtitle: '— A Quiet Ending',
      badge: '— Honest Ending —',
      deco: '…',
      text: `The night ended politely. Warmly, even — but there was a gap where something hadn't connected.\n\n"It was really nice to meet you," Noe said, and he meant it.\n\nYou believed him.\n\nSome people are good people who just aren't your people. Some nights are nice but not electric. Some first dates are last dates — and that's okay.\n\nNot every connection is romantic. Some are just a reminder that good people exist, that someone out there is making pros and cons lists before asking someone out, that sincerity is still alive somewhere.\n\nYou went home. The night was quiet. Somewhere across town, Ginger knocked something off a shelf.\n\nAnd life continued, as it does.`,
    },

  }, /* end nodes */

}; /* end Story */
