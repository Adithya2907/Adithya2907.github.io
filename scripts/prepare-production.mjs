import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const source = resolve('dist');
const output = resolve('.pages-build');

await rm(output, { recursive: true, force: true });
await mkdir(dirname(output), { recursive: true });
await cp(source, output, { recursive: true });

await rm(resolve(output, 'elsewhere.html'), { force: true });
await rm(resolve(output, 'elsewhere'), { recursive: true, force: true });

const technicalPages = ['index.html', 'projects/case-study.html'];
for (const page of technicalPages) {
  const path = resolve(output, page);
  let html = await readFile(path, 'utf8');
  html = html.replace(/^\s*<link rel="prefetch" href="\/elsewhere\.html"\s*\/>\s*$/gm, '');
  html = html.replace(/<a href="\/elsewhere\.html">Elsewhere<\/a>/g, '');
  if (/href="\/elsewhere(?:\/|\.html)/i.test(html)) {
    throw new Error(`Elsewhere link remains in production page: ${page}`);
  }
  await writeFile(path, html);
}

const routerPath = resolve(output, 'router.js');
const router = await readFile(routerPath, 'utf8');
const technicalRoutesOnly = router.replace(
  "new Set(['/', '/index.html', '/elsewhere.html'])",
  "new Set(['/', '/index.html'])",
);
if (technicalRoutesOnly === router) throw new Error('Could not remove the Elsewhere production route.');
await writeFile(routerPath, technicalRoutesOnly);

console.log(`Prepared technical-only GitHub Pages output at ${output}`);
