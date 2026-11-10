# minami — Album Player

A single-album music player: seven tracks by **minami**, one cover image, nothing else.

Originally built in 2022 with Create React App and React 17. Modernized in 2026 to
**Vite + React 19**, keeping the same album files (`src/assets/resources/songs/`) and the
same cover (`src/assets/resources/images/Image0001.JPG`).

## Tracklist

1. Oriental Power Shooter
2. Backstreet Girls
3. Spring Bloomer
4. 9190
5. Fly with the Wild Wind
6. Into the Darkness
7. Rainy Day

## What changed in the modernization

- Vite + React 19 replaces Create React App + React 17 (root `index.html`, `src/main.jsx`)
- Clickable tracklist with a playing indicator, instead of next/prev only
- Shuffle and repeat (off / all / one)
- Volume control with mute, remembered between visits, along with the last track played
- Seek bar driven by real audio events (`loadedmetadata` / `timeupdate`). The original
  polled `currentTime` on a 1-second interval and passed the audio object itself as the
  progress bar's `max`, so the bar never had a real duration.
- Prev restarts the song when pressed more than 3 seconds in, like modern players
- Media Session API support, so lock-screen and headset controls work
- Spacebar play/pause, dark responsive layout, artwork that slowly spins while playing

## Run it

```bash
npm install
npm run dev    # local dev server
npm run build  # production build into dist/
```
