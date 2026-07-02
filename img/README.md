# Image Drop Guide

Drop image files into these folders and the game uses them **automatically** —
no code changes needed. Missing files fall back to built-in vector art.

Upload via GitHub web: open the folder → **Add file → Upload files** → commit.

---

## ✅ Already done

- `img/sprites/noe/` — all 9 Noe expressions uploaded
- `img/creation/` — 5 player presets + Noe outfit previews uploaded
- `img/backgrounds/` — 6 scene backgrounds uploaded

---

## 🔲 Still wanted: female lead emotion sprites → `img/sprites/player/`

During date scenes (Chapters 3–5) the female lead appears on the LEFT side of
the screen opposite Noe. Right now she uses her preset creation image for all
emotions. Drop these files for per-emotion expressions:

| Filename        | Expression |
|-----------------|------------|
| `neutral.png`   | calm, soft expression |
| `happy.png`     | bright smile |
| `blush.png`     | flustered, pink cheeks |
| `sad.png`       | downcast, wistful |
| `avatar.png`    | face close-up, square 1:1 |

Match the art style and character design of your chosen preset
(`img/creation/player_*.png`). Half-body portrait, same framing as Noe's sprites.

Suggested prompt base:
```
masterpiece, best quality, anime visual novel character sprite, 1girl, solo,
half body portrait, [copy your preset's hair/eyes/outfit description],
looking at viewer, white background, clean lineart, soft cel shading, game cg
```
Lock the same seed across all 5 expressions.

---

## 🔲 Optional: ending backgrounds → `img/backgrounds/`

The three ending screens currently use CSS gradients. For full cinematic
endings, add (landscape 16:9, ~1920×1080):

| Filename                | Scene |
|-------------------------|-------|
| `bg_ending-perfect.jpg` | romantic night sky over city lights |
| `bg_ending-good.jpg`    | soft sunrise over the city |
| `bg_ending-bad.jpg`     | grey rainy window |

Then add to `css/style.css` following the pattern of `.bg-night`.

Prompt style: `anime background art, no people, makoto shinkai style,
detailed scenery, [scene description]`
