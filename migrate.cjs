const fs = require('fs');
const path = require('path');

const SOURCE_DIR = path.resolve(__dirname, '..');
const DATA_DIR = path.join(__dirname, 'src', 'data', 'uebungen');
const IMG_DIR = path.join(__dirname, 'public', 'images', 'uebungen');

const CATEGORY_MAP = {
  '1. Aufwärmen': 'aufwaermen',
  '2. Passspiel': 'passspiel',
  '3. Torabschluss': 'torabschluss',
  '4. Spielform': 'spielform',
  'Halle': 'halle',
  'Kondition': 'kondition',
};

const IMAGE_EXTS = ['.png', '.jpg', '.jpeg', '.webp'];

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .replace(/-+/g, '-');
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

let totalImages = 0;
let totalMarkdown = 0;

for (const [folderName, categorySlug] of Object.entries(CATEGORY_MAP)) {
  const folderPath = path.join(SOURCE_DIR, folderName);

  if (!fs.existsSync(folderPath)) {
    console.log(`SKIP: Folder not found: ${folderName}`);
    continue;
  }

  const imgDest = path.join(IMG_DIR, categorySlug);
  ensureDir(imgDest);
  ensureDir(DATA_DIR);

  const files = fs.readdirSync(folderPath);
  let order = 1;

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();

    if (!IMAGE_EXTS.includes(ext)) {
      console.log(`  SKIP (not image): ${file}`);
      continue;
    }

    const srcFile = path.join(folderPath, file);
    const destFile = path.join(imgDest, file);

    fs.copyFileSync(srcFile, destFile);
    totalImages++;

    const titleRaw = path.basename(file, ext);
    const slug = slugify(titleRaw);
    const mdFilename = `${categorySlug}-${slug}.md`;
    const mdPath = path.join(DATA_DIR, mdFilename);

    const imagePath = `/images/uebungen/${categorySlug}/${file}`;

    const frontmatter = [
      '---',
      `title: "${titleRaw}"`,
      `category: "${categorySlug}"`,
      `image: "${imagePath}"`,
      `order: ${order}`,
      '---',
      '',
    ].join('\n');

    fs.writeFileSync(mdPath, frontmatter, 'utf8');
    totalMarkdown++;
    order++;

    console.log(`  [${categorySlug}] ${titleRaw}`);
  }

  console.log(`${folderName} -> ${categorySlug}: ${order - 1} exercises migrated`);
  console.log('');
}

console.log('='.repeat(50));
console.log(`Migration complete!`);
console.log(`  Images copied: ${totalImages}`);
console.log(`  Markdown files created: ${totalMarkdown}`);
console.log('='.repeat(50));
