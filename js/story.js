/* ============================================================
   OUR STORY — Narrative Script
   A short, cinematic romance in five chapters.
   Node types: chapter_title, narration, dialogue, choice,
               profile, match, chat, chat_choice, scene,
               route, ending
   Choice fields: text, rp, next, flag, remember
   ============================================================ */

const Story = {
  startNode: 'p1',
  startRP: 20,

  nodes: {

    /* ══════════════ PROLOGUE ══════════════ */
    p1: {
      type: 'narration', background: 'night', music: 'sad', cinematic: true,
      text: 'They say Los Angeles has no seasons. That\'s not true. It has two — the golden hour, and everything else.',
      next: 'p2',
    },
    p2: {
      type: 'narration', background: 'night', cinematic: true,
      text: 'This is a story about the golden hour. It starts, like most true things do, at the wrong time of night.',
      next: 'c1_title',
    },

    /* ══════════════ CHAPTER 1 — STATIC ══════════════ */
    c1_title: {
      type: 'chapter_title', chapterNum: 'Chapter One', chapterName: 'STATIC',
      background: 'app', music: 'lofi', next: 'c1_n1',
    },
    c1_n1: {
      type: 'narration', background: 'app',
      text: '2:47 AM. You know you should sleep. The app knows you won\'t.',
      next: 'c1_n2',
    },
    c1_n2: {
      type: 'narration', background: 'app',
      text: 'Swipe. Swipe. Swipe. The faces blur into one long, polite apology.',
      next: 'c1_n3',
    },
    c1_n3: {
      type: 'narration', background: 'app',
      text: 'Then the algorithm — bored, maybe, of your indifference — plays its last card.',
      next: 'c1_profile',
    },
    c1_profile: { type: 'profile', next: 'c1_match' },
    c1_match:   { type: 'match',   next: 'c1_open'  },

    c1_open: {
      type: 'chat_choice',
      choices: [
        { text: 'Your bio says you\'ll fix my computer but not my feelings. What if my feelings ARE the computer?',
          rp: 8, next: 'c1_r1a' },
        { text: 'Hi. I never message first. You seemed worth breaking the rule.',
          rp: 10, flag: 'honest_opener', remember: true, next: 'c1_r1b' },
        { text: 'hey',
          rp: 2, next: 'c1_r1c' },
      ],
    },
    c1_r1a: {
      type: 'chat', emotion: 'laughing',
      messages: [
        { from: 'noe', text: 'ok that\'s the best opener I\'ve gotten on this app' },
        { from: 'noe', text: 'diagnosis: feelings are always a software issue. unfixable by design. I can recommend a good firewall though' },
      ],
      next: 'c1_chat2',
    },
    c1_r1b: {
      type: 'chat', emotion: 'flustered',
      messages: [
        { from: 'noe', text: 'oh' },
        { from: 'noe', text: 'okay wow. I had a whole bit prepared and you just disarmed it' },
        { from: 'noe', text: 'for the record — I\'m glad you broke the rule' },
      ],
      next: 'c1_chat2',
    },
    c1_r1c: {
      type: 'chat', emotion: 'happy',
      messages: [
        { from: 'noe', text: 'hey yourself' },
        { from: 'noe', text: 'bold strategy. minimalist. I respect it' },
      ],
      next: 'c1_chat2',
    },

    c1_chat2: {
      type: 'chat', emotion: 'thinking',
      messages: [
        { from: 'noe', text: 'okay real question. it\'s almost 3am' },
        { from: 'noe', text: 'what\'s actually keeping you up?' },
      ],
      next: 'c1_q2',
    },
    c1_q2: {
      type: 'chat_choice',
      choices: [
        { text: 'Everything and nothing. Mostly the fear that it stays like this.',
          rp: 10, flag: 'night_honesty', remember: true, next: 'c1_r2a' },
        { text: 'Waiting for a stranger with blue glasses to message me, apparently.',
          rp: 7, next: 'c1_r2b' },
        { text: 'Insomnia gang. Don\'t ask.',
          rp: 3, next: 'c1_r2c' },
      ],
    },
    c1_r2a: {
      type: 'chat', emotion: 'serious',
      messages: [
        { from: 'noe', text: '…yeah' },
        { from: 'noe', text: 'that\'s the most honest thing anyone\'s said to me on here. including me' },
        { from: 'noe', text: 'it doesn\'t stay like this, by the way. I have no evidence. but I\'ve decided to believe it, which is almost the same thing' },
      ],
      next: 'c1_chat3',
    },
    c1_r2b: {
      type: 'chat', emotion: 'flustered',
      messages: [
        { from: 'noe', text: 'the glasses are prescription, the charm is load-bearing' },
        { from: 'noe', text: 'but same, honestly. some nights the phone is just a little window you keep checking' },
      ],
      next: 'c1_chat3',
    },
    c1_r2c: {
      type: 'chat', emotion: 'happy',
      messages: [
        { from: 'noe', text: 'respect. the 3am council accepts you' },
        { from: 'noe', text: 'first rule of insomnia gang: we absolutely talk about insomnia gang. there\'s nothing else to do' },
      ],
      next: 'c1_chat3',
    },

    c1_chat3: {
      type: 'chat', emotion: 'happy',
      messages: [
        { from: 'noe', text: 'my cat is staring at me like I\'m the problem. her name is Ginger. she\'s never wrong' },
        { from: 'noe', text: 'ok. I\'m going to attempt sleep like a functional adult' },
        { from: 'noe', text: 'but hey — text me tomorrow? I\'m better in daylight. marginally' },
      ],
      next: 'c1_n4',
    },
    c1_n4: {
      type: 'narration', background: 'night', cinematic: true,
      text: 'You put the phone down. The ceiling looks different tonight. Softer, somehow.',
      next: 'c2_title',
    },

    /* ══════════════ CHAPTER 2 — SIGNAL ══════════════ */
    c2_title: {
      type: 'chapter_title', chapterNum: 'Chapter Two', chapterName: 'SIGNAL',
      background: 'chat', music: 'lofi', next: 'c2_n1',
    },
    c2_n1: {
      type: 'narration', background: 'chat',
      text: 'Three nights. Three conversations. Each one later, and somehow lighter, than the last.',
      next: 'c2_chat1',
    },
    c2_chat1: {
      type: 'chat', emotion: 'laughing',
      messages: [
        { from: 'noe', text: 'update from the IT trenches' },
        { from: 'noe', text: 'today a man brought me a laptop he had put in the shower. to clean it. because it "had a virus"' },
        { from: 'noe', text: 'I held its little hand while it died' },
      ],
      next: 'c2_q1',
    },
    c2_q1: {
      type: 'chat_choice',
      choices: [
        { text: 'How are you so patient with people? Genuinely asking.',
          rp: 7, next: 'c2_r1b' },
        { text: 'LMAOOO rest in peace soldier',
          rp: 3, next: 'c2_r1a' },
      ],
    },
    c2_r1a: {
      type: 'chat', emotion: 'happy',
      messages: [
        { from: 'noe', text: 'it died as it lived. damp and misunderstood' },
      ],
      next: 'c2_chat2',
    },
    c2_r1b: {
      type: 'chat', emotion: 'thinking',
      messages: [
        { from: 'noe', text: 'honestly? everyone\'s embarrassed when something they need breaks' },
        { from: 'noe', text: 'the machine is never the fragile thing in the room. you learn to fix both gently' },
      ],
      next: 'c2_chat2',
    },

    c2_chat2: {
      type: 'chat', emotion: 'serious',
      messages: [
        { from: 'noe', text: 'weird question. delete if too much' },
        { from: 'noe', text: 'you ever feel like you\'re on read with the whole world? like everyone got invited to a group chat except you' },
      ],
      next: 'c2_q2',
    },
    c2_q2: {
      type: 'chat_choice',
      choices: [
        { text: 'Yes. All the time. I\'ve just never said it out loud before.',
          rp: 10, flag: 'opened_up', remember: true, next: 'c2_r2a' },
        { text: 'That\'s just LA. Nobody here is actually okay.',
          rp: 6, next: 'c2_r2b' },
        { text: 'New phone, who dis',
          rp: 2, next: 'c2_r2c' },
      ],
    },
    c2_r2a: {
      type: 'chat', emotion: 'serious',
      messages: [
        { from: 'noe', text: 'then this is us saying it out loud. both of us. at 1am. to a stranger who doesn\'t feel like one anymore' },
        { from: 'noe', text: 'that has to count for something' },
      ],
      next: 'c2_chat3',
    },
    c2_r2b: {
      type: 'chat', emotion: 'happy',
      messages: [
        { from: 'noe', text: 'ha. the city of angels, population: everyone pretending' },
        { from: 'noe', text: 'you get it though. that\'s rarer than it should be' },
      ],
      next: 'c2_chat3',
    },
    c2_r2c: {
      type: 'chat', emotion: 'nervous',
      messages: [
        { from: 'noe', text: 'lol fair. too heavy for a tuesday' },
        { from: 'noe', text: 'forget I said it' },
      ],
      next: 'c2_chat3',
    },

    c2_chat3: {
      type: 'chat', emotion: 'thinking',
      messages: [
        { from: 'noe', text: 'when I went to Tokyo alone last year I learned something dumb and important' },
        { from: 'noe', text: 'loneliness fits in any suitcase. it goes where you go. changing the scenery just gives it better lighting' },
        { from: 'noe', text: 'so now I\'m trying the opposite experiment' },
        { from: 'player', text: 'What\'s the opposite experiment?' },
        { from: 'noe', text: 'letting people in. results pending' },
      ],
      next: 'c2_chat4',
    },
    c2_chat4: {
      type: 'chat', emotion: 'nervous',
      messages: [
        { from: 'noe', text: 'so. hypothetical' },
        { from: 'noe', text: 'there\'s a spot in Griffith Park that does something illegal to the sky around 7pm. and an arcade ten minutes from it. and an In-N-Out after that' },
        { from: 'noe', text: 'would you want to be hypothetical with me on friday?' },
      ],
      next: 'c2_q3',
    },
    c2_q3: {
      type: 'chat_choice',
      choices: [
        { text: 'I thought you\'d never ask. Yes.',
          rp: 10, next: 'c2_r3a' },
        { text: 'Depends. Does Ginger approve of me yet?',
          rp: 8, next: 'c2_r3b' },
        { text: 'Maybe. Convince me.',
          rp: 2, next: 'c2_r3c' },
      ],
    },
    c2_r3a: {
      type: 'chat', emotion: 'excited',
      messages: [
        { from: 'noe', text: 'okay. okay okay okay' },
        { from: 'noe', text: 'that\'s— great. friday. I\'m going to be normal about this' },
        { from: 'noe', text: '(I am not going to be normal about this)' },
      ],
      next: 'c2_n2',
    },
    c2_r3b: {
      type: 'chat', emotion: 'laughing',
      messages: [
        { from: 'noe', text: 'I showed her your profile. she blinked slowly, which in cat is a standing ovation' },
        { from: 'noe', text: 'friday then. the committee has spoken' },
      ],
      next: 'c2_n2',
    },
    c2_r3c: {
      type: 'chat', emotion: 'nervous',
      messages: [
        { from: 'noe', text: 'convince you. right. okay: the sky, free arcade tokens, and I promise to only make three computer jokes' },
        { from: 'noe', text: 'final offer. two computer jokes' },
      ],
      next: 'c2_n2',
    },
    c2_n2: {
      type: 'narration', background: 'night', cinematic: true,
      text: 'Friday. Four days away. You catch yourself smiling at a screen in the dark — and for once, you don\'t stop.',
      next: 'c3_title',
    },

    /* ══════════════ CHAPTER 3 — GOLDEN HOUR ══════════════ */
    c3_title: {
      type: 'chapter_title', chapterNum: 'Chapter Three', chapterName: 'GOLDEN HOUR',
      background: 'golden', music: 'golden', next: 'c3_n1',
    },
    c3_n1: {
      type: 'narration', background: 'golden',
      text: 'Friday arrives the way Fridays do — all at once, after forever.',
      next: 'c3_n2',
    },
    c3_n2: {
      type: 'narration', background: 'golden',
      text: 'You change outfits three times. The mirror offers no opinion. On the drive over, a song plays that you\'ll remember for years without ever learning its name.',
      next: 'c3_d1',
    },
    c3_d1: {
      type: 'dialogue', speaker: 'Noe', emotion: 'nervous',
      background: 'golden', music: 'golden', showPlayer: true, cinematic: true,
      text: 'Hey. Hi. Wow, okay — you\'re… you look like the reason the sunset\'s overcompensating.',
      next: 'c3_d1b',
    },
    c3_d1b: {
      type: 'dialogue', speaker: 'Noe', emotion: 'flustered', showPlayer: true,
      text: 'That was rehearsed. It sounded better in the car. Everything sounds better in the car.',
      next: 'c3_q1',
    },
    c3_q1: {
      type: 'choice', prompt: 'He\'s nervous. It\'s kind of wonderful.',
      choices: [
        { text: '"I almost cancelled twice. I\'m really glad I didn\'t."',
          rp: 10, flag: 'brave_honesty', remember: true, next: 'c3_r1b' },
        { text: '"It worked. Say all the rehearsed things. I like them."',
          rp: 8, next: 'c3_r1a' },
        { text: '"Do you always flirt via meteorology?"',
          rp: 3, next: 'c3_r1c' },
      ],
    },
    c3_r1a: {
      type: 'dialogue', speaker: 'Noe', emotion: 'happy', showPlayer: true,
      text: 'Yeah? Okay. Warning: I rehearsed a LOT. There\'s a whole bit about the observatory. It has three acts.',
      next: 'c3_d3',
    },
    c3_r1b: {
      type: 'dialogue', speaker: 'Noe', emotion: 'serious', showPlayer: true,
      text: '…I wrote and deleted the "actually let\'s reschedule" text four times. So. We\'re both brave, or both terrible at self-preservation. Tonight we find out which.',
      next: 'c3_d3',
    },
    c3_r1c: {
      type: 'dialogue', speaker: 'Noe', emotion: 'laughing', showPlayer: true,
      text: 'Only during golden hour. The rest of the day I flirt via tech support. "Have you tried turning your heart off and on again," et cetera.',
      next: 'c3_d3',
    },
    c3_d3: {
      type: 'dialogue', speaker: 'Noe', emotion: 'thinking', showPlayer: true, cinematic: true,
      text: 'I come up here when the week wins. From this height the city looks… fixable. Like if you found the right cable, you could reboot the whole thing.',
      next: 'c3_d4',
    },
    c3_d4: {
      type: 'dialogue', speaker: 'You', showPlayer: true, playerEmotion: 'happy',
      text: 'And tonight? What needs fixing tonight?',
      next: 'c3_d5',
    },
    c3_d5: {
      type: 'dialogue', speaker: 'Noe', emotion: 'happy', showPlayer: true, cinematic: true,
      text: 'Tonight? …Nothing. Absolutely nothing. That\'s new for me.',
      next: 'c4_title',
    },

    /* ══════════════ CHAPTER 4 — FREE PLAY ══════════════ */
    c4_title: {
      type: 'chapter_title', chapterNum: 'Chapter Four', chapterName: 'FREE PLAY',
      background: 'arcade', music: 'arcade', next: 'c4_n1',
    },
    c4_n1: {
      type: 'narration', background: 'arcade',
      text: 'The arcade breathes neon. Somewhere a machine sings an eight-bit hymn to nobody. Noe\'s whole posture changes at the door — shoulders down, grin up. This is his church.',
      next: 'c4_d1',
    },
    c4_d1: {
      type: 'dialogue', speaker: 'Noe', emotion: 'excited', showPlayer: true,
      background: 'arcade',
      text: 'House rules. One: air hockey settles all philosophical disputes. Two: the claw machine is a scam and we respect it. Three: loser at Street Fighter buys the milkshakes.',
      next: 'c4_q1',
    },
    c4_q1: {
      type: 'choice', prompt: 'The air hockey table awaits.',
      choices: [
        { text: 'Team up against the zombie shooter instead. Two players, one screen.',
          rp: 8, flag: 'team_players', next: 'c4_r1c' },
        { text: 'Destroy him at air hockey. Mercy is for the weak.',
          rp: 7, next: 'c4_r1a' },
        { text: 'Let the game stay close. Watch him celebrate.',
          rp: 3, next: 'c4_r1b' },
      ],
    },
    c4_r1a: {
      type: 'dialogue', speaker: 'Noe', emotion: 'laughing', showPlayer: true,
      text: 'SEVEN TO TWO?! Okay. Okay. I respect it, I fear it, I\'m never playing you again. The milkshakes are on me and my shattered ego.',
      next: 'c4_d3',
    },
    c4_r1b: {
      type: 'dialogue', speaker: 'Noe', emotion: 'happy', showPlayer: true,
      text: 'GOAL! Did you see— okay, you definitely let me have that one. I\'m choosing to pretend otherwise. Victory milkshakes, my treat.',
      next: 'c4_d3',
    },
    c4_r1c: {
      type: 'dialogue', speaker: 'Noe', emotion: 'excited', showPlayer: true,
      text: 'COVER ME— reload, RELOAD— okay, we died horribly. But we died TOGETHER, and that\'s basically the whole point of everything.',
      next: 'c4_d3',
    },
    c4_d3: {
      type: 'dialogue', speaker: 'Noe', emotion: 'thinking', showPlayer: true, cinematic: true,
      text: 'You know why I love these places? Quarters. Every machine in here is a fixable problem with a posted price. Insert coin, try again. Real life should be so honest.',
      next: 'c4_d4',
    },
    c4_d4: {
      type: 'dialogue', speaker: 'Noe', emotion: 'flustered', showPlayer: true,
      text: '…Anyway. Rule two is suspended. Because that claw machine has a tiny orange cat in it, the universe is being extremely unsubtle, and I have four dollars in quarters.',
      next: 'c4_d4b',
    },
    c4_d4b: {
      type: 'narration', background: 'arcade',
      text: 'Three dollars and seventy-five cents later — against physics, against the house, against every posted law of claw machines — the tiny orange cat drops. Noe holds it up like a championship belt.',
      next: 'c4_q2',
    },
    c4_q2: {
      type: 'choice', prompt: 'He hands you the tiny cat, suddenly shy about it.',
      choices: [
        { text: '"She\'s coming home with me. Her name is Ginger Two. This is not negotiable."',
          rp: 10, flag: 'kept_plush', remember: true, next: 'c4_r2a' },
        { text: '"You keep her. Visitation rights negotiable."',
          rp: 4, next: 'c4_r2b' },
      ],
    },
    c4_r2a: {
      type: 'dialogue', speaker: 'Noe', emotion: 'happy', showPlayer: true,
      text: 'Ginger Two. Ginger Prime is going to be furious. …I really like that you kept her. Noted. Filed. Backed up in three locations.',
      next: 'c5_title',
    },
    c4_r2b: {
      type: 'dialogue', speaker: 'Noe', emotion: 'happy', showPlayer: true,
      text: 'Joint custody of a claw machine cat. The most Los Angeles relationship milestone possible. She\'ll summer with me, winter with you.',
      next: 'c5_title',
    },

    /* ══════════════ CHAPTER 5 — ANIMAL STYLE ══════════════ */
    c5_title: {
      type: 'chapter_title', chapterNum: 'Chapter Five', chapterName: 'ANIMAL STYLE',
      background: 'innout', music: 'innout', next: 'c5_n1',
    },
    c5_n1: {
      type: 'narration', background: 'innout',
      text: 'In-N-Out at nine PM is a small cathedral of fluorescent light and salt. Red palm trees on white cups. The holy quiet of people eating something they\'ve been thinking about all day.',
      next: 'c5_d1',
    },
    c5_d1: {
      type: 'dialogue', speaker: 'Noe', emotion: 'happy', showPlayer: true,
      background: 'innout',
      text: 'Double-double, animal style, extra spread, fries well-done. This is the hill I die on. What are you having? Choose wisely — I will remember this forever.',
      next: 'c5_q1',
    },
    c5_q1: {
      type: 'choice', prompt: 'The menu glows above you.',
      choices: [
        { text: '"Same order. I trust you."',
          rp: 6, next: 'c5_r1a' },
        { text: '"Grilled cheese. Judge me."',
          rp: 2, next: 'c5_r1b' },
      ],
    },
    c5_r1a: {
      type: 'dialogue', speaker: 'Noe', emotion: 'excited', showPlayer: true,
      text: 'CORRECT. Animal style twins. This is the strongest foundation any relationship has ever been built on. Ask anyone.',
      next: 'c5_d2',
    },
    c5_r1b: {
      type: 'dialogue', speaker: 'Noe', emotion: 'laughing', showPlayer: true,
      text: 'Grilled cheese. Bold. Wrong, but bold. I\'m going to need you to try exactly one bite of mine so you understand what you\'ve done to yourself.',
      next: 'c5_d2',
    },
    c5_d2: {
      type: 'dialogue', speaker: 'Noe', emotion: 'nervous', showPlayer: true, cinematic: true,
      text: '…Can I say something? And you have to promise not to look at me while I say it. Look at your fries. They\'re perfect. Look at them.',
      next: 'c5_d3',
    },
    c5_d3: {
      type: 'dialogue', speaker: 'Noe', emotion: 'serious', showPlayer: true, cinematic: true,
      text: 'I\'m good at fixing things. It\'s the whole job. But wanting something you can\'t troubleshoot — a person, a maybe, this — it scares me stupid. Tonight is the first time in a long time I\'ve wanted something that comes with no warranty.',
      next: 'c5_q2',
    },
    c5_q2: {
      type: 'choice', prompt: 'The fries are getting cold. He\'s waiting without looking.',
      choices: [
        { text: '"Then don\'t fix it. Don\'t troubleshoot it. Just stay in it. With me."',
          rp: 15, flag: 'chose_him', remember: true, next: 'c5_r2a' },
        { text: '"We can be scared together. That still counts as together."',
          rp: 12, next: 'c5_r2b' },
        { text: '"That\'s… a lot for a first date, Noe."',
          rp: -8, next: 'c5_r2c' },
      ],
    },
    c5_r2a: {
      type: 'dialogue', speaker: 'Noe', emotion: 'happy', showPlayer: true, cinematic: true,
      text: '…Okay. Okay. I\'m looking at you now. Fair warning: I don\'t think I\'m going to be able to stop.',
      next: 'c5_n2',
    },
    c5_r2b: {
      type: 'dialogue', speaker: 'Noe', emotion: 'happy', showPlayer: true, cinematic: true,
      text: 'Scared together. Yeah. That\'s— yeah. That\'s the best system architecture I\'ve ever heard.',
      next: 'c5_n2',
    },
    c5_r2c: {
      type: 'dialogue', speaker: 'Noe', emotion: 'nervous', showPlayer: true,
      text: 'Right. No— you\'re right. Sorry. Ha. Ignore the man behind the curtain. The fries, though. The fries are objectively great.',
      next: 'c5_n2',
    },
    c5_n2: {
      type: 'narration', background: 'night', music: 'romance', cinematic: true,
      text: 'Later, the parking lot. The city hums its low electric hum. Two paper cups, one tiny orange cat, and the entire rest of your lives arranged loosely around this moment.',
      next: 'route_ending',
    },

    /* ══════════════ ROUTING ══════════════ */
    route_ending: {
      type: 'route',
      routes: [
        { minRP: 70, next: 'ending_perfect' },
        { minRP: 40, next: 'ending_good'    },
        { minRP: 0,  next: 'ending_bad'     },
      ],
    },

    /* ══════════════ ENDINGS ══════════════ */
    ending_perfect: {
      type: 'ending', background: 'ending-perfect', music: 'romance',
      title: 'GOLDEN', subtitle: 'The Perfect Ending', badge: '♥ True Route', deco: '♥',
      text: 'He walks you to your car and neither of you reaches for the door. "So," he says, "hypothetically — what are you doing every Friday for the foreseeable future?" You kiss him under a parking lot light that flickers like it\'s applauding. It isn\'t golden hour anymore. It doesn\'t need to be.',
      epilogue: [
        { flag: 'kept_plush',    text: 'Ginger Two lives on your desk now. The real Ginger pretends not to be jealous.' },
        { flag: 'night_honesty', text: 'You still wake at 2:47 AM sometimes. But now, someone answers.' },
        { flag: 'brave_honesty', text: 'You never almost-cancelled again.' },
        { flag: 'chose_him',     text: 'No warranty. No returns. Neither of you has ever wanted one.' },
      ],
    },
    ending_good: {
      type: 'ending', background: 'ending-good', music: 'golden',
      title: 'SOMETHING GROWING', subtitle: 'The Good Ending', badge: '✦ Slow Burn', deco: '✦',
      text: 'At your car he hesitates, then hugs you — warm, a half-second longer than friendly. "Next Friday?" he asks, hopeful and careful in equal measure. "Next Friday," you say. Some stories don\'t begin with fireworks. Some begin like sunrise: slowly, certainly, impossible to stop once started.',
      epilogue: [
        { flag: 'team_players', text: 'You still die horribly at the zombie shooter every week. Together, though. Always together.' },
        { flag: 'opened_up',    text: 'The group chat you both felt left out of? You started your own. Population: two.' },
      ],
    },
    ending_bad: {
      type: 'ending', background: 'ending-bad', music: 'sad',
      title: 'STATIC', subtitle: 'The Quiet Ending', badge: '· Missed Signal', deco: '·',
      text: 'The goodbye is polite. The drive home is long. A week later the app glows again — 2:47 AM, faces blurring into one long apology. His profile doesn\'t come up anymore. Some doors, it turns out, you only get to knock on once.',
      epilogue: [
        { flag: 'night_honesty', text: 'You told a stranger the truth once, at 3AM. You think about that more than you\'d admit.' },
      ],
    },
  },
};
