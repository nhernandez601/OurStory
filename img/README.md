# Image Drop Guide

Drop PNG/JPG files into these folders and the game uses them **automatically** —
no code changes needed. If a file is missing, the game falls back to built-in
vector art, so you can add images one at a time.

Upload via GitHub web: open the folder → **Add file → Upload files** → commit.

---

## 1. Noe sprites → `img/sprites/noe/`

Half-body anime portraits, transparent or white background, portrait
orientation (recommended 768×1344 or similar ~4:7 ratio).

| Filename        | Expression |
|-----------------|------------|
| `neutral.png`   | calm, relaxed |
| `happy.png`     | warm gentle smile |
| `laughing.png`  | big open laugh, eyes crinkled |
| `thinking.png`  | hand on chin, looking sideways |
| `nervous.png`   | worried eyes, slight sweat |
| `flustered.png` | blushing, embarrassed |
| `serious.png`   | intense, sincere gaze |
| `excited.png`   | wide bright eyes, enthusiastic |
| `avatar.png`    | face close-up, square 1:1 (chat/match circle) |

**Character reference (keep consistent across all 9):**
dark messy wavy black hair, thick blue rectangular glasses, full beard,
warm olive/tan Latino skin, broad stocky build, red hoodie.

Base prompt:
```
masterpiece, best quality, anime visual novel character sprite, 1male, solo,
half body portrait, dark messy wavy black hair, thick rectangular blue glasses,
full beard, warm olive tan skin, broad stocky shoulders, red hoodie,
looking at viewer, white background, clean lineart, soft cel shading, game cg
```
Lock the **same seed** for all expressions.

---

## 2. Female lead sprites → `img/sprites/player/`

Same format as Noe (half-body, portrait, transparent/white bg).

| Filename        | Expression |
|-----------------|------------|
| `neutral.png`   | calm, soft expression |
| `happy.png`     | bright smile |
| `blush.png`     | flustered, pink cheeks |
| `sad.png`       | downcast, wistful |
| `avatar.png`    | face close-up, square 1:1 |

Suggested base prompt (customize her look however you like):
```
masterpiece, best quality, anime visual novel character sprite, 1girl, solo,
half body portrait, long wavy dark hair, warm brown eyes, gentle expression,
casual stylish outfit, looking at viewer, white background, clean lineart,
soft cel shading, game cg
```

---

## 3. Background scenes → `img/bg/` (optional, big cinematic upgrade)

Landscape 16:9 JPGs (1920×1080 recommended). Anime background style.

| Filename        | Scene |
|-----------------|-------|
| `app.jpg`       | dark bedroom at night, phone glow |
| `chat.jpg`      | cozy room, late night, screen light |
| `golden.jpg`    | Griffith Park overlook at golden hour, LA skyline |
| `arcade.jpg`    | neon retro arcade interior |
| `innout.jpg`    | In-N-Out style burger place at night, fluorescent light |
| `night.jpg`     | LA city night, parking lot, street lights |
| `ending-perfect.jpg` | romantic night sky over city |
| `ending-good.jpg`    | soft sunrise over city |
| `ending-bad.jpg`     | grey rainy window |

Prompt style: `anime background art, no people, makoto shinkai style, detailed
scenery, [scene description]`
