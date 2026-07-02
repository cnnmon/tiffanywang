// Records the pixel dimensions of each entry's displayed media into utils/files.json
// so the masonry grid can reserve space before images load. Rerun after adding files:
//   node scripts/measure-media.mjs
import { execFileSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import path from 'path';

const jsonPath = new URL('../utils/files.json', import.meta.url).pathname;
const files = JSON.parse(readFileSync(jsonPath, 'utf8'));

function measure(publicPath) {
  const abs = path.join(path.dirname(jsonPath), '../public', publicPath);
  if (publicPath.endsWith('.mp4')) {
    const out = execFileSync('ffprobe', [
      '-v', 'error',
      '-select_streams', 'v:0',
      '-show_entries', 'stream=width,height',
      '-of', 'csv=p=0',
      abs,
    ]).toString();
    const [width, height] = out.trim().split(',').map(Number);
    return { width, height };
  }
  const out = execFileSync('sips', ['-g', 'pixelWidth', '-g', 'pixelHeight', abs]).toString();
  return {
    width: Number(out.match(/pixelWidth: (\d+)/)[1]),
    height: Number(out.match(/pixelHeight: (\d+)/)[1]),
  };
}

for (const item of files) {
  const src = item.thumbnailUrl || item.imageUrl;
  if (!src) continue;
  Object.assign(item, measure(src));
  console.log(`${src}: ${item.width}x${item.height}`);
}

writeFileSync(jsonPath, JSON.stringify(files, null, 2) + '\n');
