import sharp from 'sharp';
import { readdirSync, statSync, renameSync } from 'fs';
import { join } from 'path';
const dir = 'public/lovable-uploads';
const files = readdirSync(dir).filter(f => f.endsWith('.png'));
let saved = 0;
for (const f of files) {
  const p = join(dir, f);
  const before = statSync(p).size;
  if (before < 300 * 1024) continue;
  const tmp = p + '.tmp';
  const img = sharp(p);
  const meta = await img.metadata();
  const maxW = 1600;
  const pipeline = (meta.width && meta.width > maxW ? img.resize({ width: maxW }) : img)
    .png({ compressionLevel: 9, quality: 80, palette: true, effort: 10 });
  await pipeline.toFile(tmp);
  const after = statSync(tmp).size;
  if (after < before) {
    renameSync(tmp, p);
    saved += before - after;
    console.log(`${f}: ${(before/1024).toFixed(0)}KB -> ${(after/1024).toFixed(0)}KB`);
  } else {
    (await import('fs')).unlinkSync(tmp);
  }
}
console.log(`Total saved: ${(saved/1024/1024).toFixed(2)}MB`);
