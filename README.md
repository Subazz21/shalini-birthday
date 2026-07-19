# Happy Birthday, My Honey Shalini ❤

A premium interactive birthday website for Shalini, built from Subash's project blueprint.

## What's built

- **Loading screen** — animated heartbeat + fade in
- **Welcome popup** — "Open Your Gift" unlocks the site and music
- **Home** — hero title, live countdown to the next Sept 2, falling sakura petals
- **Our Story (Timeline)** — 5 editable milestone cards
- **Reasons I Love You** — flip cards (tap/click to flip)
- **Gallery** — responsive image grid (currently placeholder art)
- **Love Letter** — typewriter-effect letter, triggers on scroll
- **Gift Box** — click to unwrap, reveals a message + confetti
- **Cake** — click each candle to blow it out, triggers a wish + confetti
- **Night Sky** — canvas starfield with a constellation heart; click to send a shooting-star wish
- **Final Wishes** — closing message + "Watch It Again" replay button

Ambient effects throughout: floating hearts, cursor sparkles, glowing buttons,
smooth scroll-reveal animations, and a persistent music player.
Everything respects `prefers-reduced-motion` and works on mobile.

## Folder structure

```
index.html
css/style.css
js/script.js
assets/images/     ← gallery photos go here
assets/music/      ← add song.mp3 here
assets/icons/      ← favicon
pages/             ← notes only; this is a single-page site (see pages/README.txt)
```

## Before you send it to her

1. **Add your photos**: drop images into `assets/images/` and update the six
   `<img src="...">` lines inside the `#gallery` section of `index.html`
   (currently pointing at `placeholder-1.svg` … `placeholder-6.svg`).
2. **Add the song**: place a licensed copy of your chosen song as
   `assets/music/song.mp3`. The player will just show a friendly prompt until
   the file exists — nothing breaks without it.
3. **Edit the timeline**: in `index.html`, find `<section id="timeline">` and
   replace the 5 placeholder cards with your real dates and memories.
4. **Edit the love letter**: find `#letter-text` in `index.html` and rewrite it
   in your own words — it will still type itself out automatically.
5. **Edit the gift message**: find `#gift-message` and write the real surprise.
6. **Double-check the date**: the countdown always counts to the next
   September 2 automatically — no need to touch it yearly.

## Running it locally

No build step needed — just open `index.html` in a browser. For the best
experience (autoplay, relative paths), serve it locally instead of opening the
file directly:

```bash
# from inside the project folder
python3 -m http.server 8000
# then visit http://localhost:8000
```

### Telegram notifications

To get the final buttons to notify you in Telegram, start the small local server
with your Telegram bot token and chat ID:

```bash
TELEGRAM_BOT_TOKEN=your_bot_token TELEGRAM_CHAT_ID=your_chat_id node server.js
```

Then open the site at http://localhost:3000.

## Deploying

Per the blueprint, any static host works:

- **GitHub Pages** — push this folder to a repo, enable Pages on the `main` branch
- **Netlify** — drag-and-drop the folder onto app.netlify.com/drop
- **Vercel** — `vercel deploy` from inside the folder (no config needed)

## Tech used

Vanilla HTML5 / CSS3 / JavaScript, Google Fonts (Playfair Display, Cormorant
Garamond, Quicksand), and canvas-confetti (via CDN) for the confetti bursts.
The night sky, hearts, sparkles, petals, and constellation are hand-built with
CSS keyframes and the Canvas API — no other dependencies, so it stays fast and
easy to host anywhere.
