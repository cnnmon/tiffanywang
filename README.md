# my personal site

my ongoing project to capture my identity in a fun way through a website.

## media loading

- stills render through `components/FadeImage.jsx`: `next/image` (avif/webp via sharp) + 500ms opacity fade-in, so nothing pops in jarringly
- autoplaying loop videos render through `components/LazyVideo.jsx`: IntersectionObserver defers the download until ~300px from viewport, then fades in
- the `/files` lightbox (`Modal.jsx`) serves optimized 1600px images (not raw originals) and pre-renders hidden prev/next neighbors so arrow-key navigation is instant
- mp4s in `public/` are served raw (no optimizer), so keep them compressed: h264, crf ~23 (visually lossless-ish; higher = smaller but softer), max 960w for project cards (`ffmpeg -i in.mp4 -vf "scale='min(960,iw)':-2" -c:v libx264 -crf 23 -preset slow -pix_fmt yuv420p -movflags +faststart -an out.mp4`)
- keep original exports somewhere outside the repo — re-encoding an already-compressed mp4 compounds quality loss
- `deco/turn.mp4` (home hero) is encoded with dense keyframes (`-g 30`) so VideoScrubber seeking stays smooth

now:
<img width="1246" alt="image" src="https://user-images.githubusercontent.com/20329981/221345138-8496c1bb-bf2f-4f37-8870-0000b7d7cae6.png">

previous (before feb 24): https://tiffanywang-nddwqs5e6-cnnmon.vercel.app/
<img width="1249" alt="image" src="https://user-images.githubusercontent.com/20329981/221339055-2a98c071-10b2-49a8-b8e7-9c459d23770c.png">
