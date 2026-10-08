// Vite builds dev.html into one self-contained file. Publish it as index.html in dist/
// (for the Actions deploy) and at the repo root (for the branch deploy), so both serve the same site.
import { copyFileSync, renameSync, writeFileSync } from 'node:fs';

renameSync('dist/dev.html', 'dist/index.html');
copyFileSync('dist/index.html', 'index.html');
copyFileSync('public/Ahmed_Behiry_CV.pdf', 'Ahmed_Behiry_CV.pdf');
writeFileSync('.nojekyll', '');
console.log('Published index.html and Ahmed_Behiry_CV.pdf');
