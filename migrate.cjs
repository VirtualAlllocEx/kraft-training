const fs = require('fs');
const path = require('path');

// Re-runs are non-destructive by default: existing markdown files (which may
// contain CMS-added descriptions/videos/etc.) are skipped unless --force is given.
const FORCE = process.argv.includes('--force');

const SOURCE_DIR = process.env.MIGRATE_SOURCE_DIR
  ? path.resolve(process.env.MIGRATE_SOURCE_DIR)
  : path.resolve(__dirname, '..');
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

/** Escape a string for double-quoted YAML scalar. */
function yamlDoubleQuoted(s) {
  return String(s)
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n');
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

let totalImages = 0;
let totalMarkdown = 0;
let totalSkippedMd = 0;
let totalCollisions = 0;

for (const [folderName, categorySlug] of Object.entries(CATEGORY_MAP)) {
  const folderPath = path.join(SOURCE_DIR, folderName);

  if (!fs.existsSync(folderPath)) {
    console.log(`SKIP: Folder not found: ${folderName}`);
    continue;
  }

  const imgDest = path.join(IMG_DIR, categorySlug);
  ensureDir(imgDest);
  ensureDir(DATA_DIR);

  const files = fs
    .readdirSync(folderPath)
    .filter((file) => IMAGE_EXTS.includes(path.extname(file).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, 'de'));

  let order = 1;
  /** @type {Map<string, string>} slug → source basename (collision detect) */
  const slugToSource = new Map();

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    const titleRaw = path.basename(file, ext).trim();
    if (!titleRaw) {
      console.log(`  SKIP (empty name after trim): ${file}`);
      continue;
    }

    const srcFile = path.join(folderPath, file);
    // Prefer trimmed filename on disk to avoid trailing-space orphans
    const destName = titleRaw + ext;
    const destFile = path.join(imgDest, destName);

    try {
      if (!fs.existsSync(destFile) || FORCE) {
        fs.copyFileSync(srcFile, destFile);
        totalImages++;
      }
    } catch (err) {
      console.error(`  ERROR (copy failed): ${file} -> ${destFile}: ${err.message}`);
      continue;
    }

    let slug = slugify(titleRaw);
    if (!slug) {
      console.log(`  SKIP (empty slug): ${file}`);
      continue;
    }

    // Unique slug within this category run
    if (slugToSource.has(slug) && slugToSource.get(slug) !== destName) {
      let n = 2;
      while (slugToSource.has(`${slug}-${n}`)) n++;
      console.warn(
        `  COLLISION: "${slugToSource.get(slug)}" and "${destName}" → slug "${slug}"; using "${slug}-${n}"`,
      );
      slug = `${slug}-${n}`;
      totalCollisions++;
    }
    slugToSource.set(slug, destName);

    const mdFilename = `${categorySlug}-${slug}.md`;
    const mdPath = path.join(DATA_DIR, mdFilename);

    if (fs.existsSync(mdPath) && !FORCE) {
      console.log(`  SKIP (exists, use --force to overwrite): ${mdFilename}`);
      totalSkippedMd++;
      // Still advance order so re-runs don't reuse sequence numbers for new files
      order++;
      continue;
    }

    const imagePath = `/images/uebungen/${categorySlug}/${destName}`;

    const frontmatter = [
      '---',
      `title: "${yamlDoubleQuoted(titleRaw)}"`,
      `category: "${categorySlug}"`,
      `image: "${yamlDoubleQuoted(imagePath)}"`,
      `order: ${order}`,
      '---',
      '',
    ].join('\n');

    try {
      fs.writeFileSync(mdPath, frontmatter, 'utf8');
    } catch (err) {
      console.error(`  ERROR (write failed): ${mdFilename}: ${err.message}`);
      continue;
    }
    totalMarkdown++;
    order++;

    console.log(`  [${categorySlug}] ${titleRaw}`);
  }

  console.log(
    `${folderName} -> ${categorySlug}: ${order - 1} slots (${totalMarkdown} new MD this run)`,
  );
  console.log('');
}

console.log('='.repeat(50));
console.log(`Migration complete!`);
console.log(`  Images copied/updated: ${totalImages}`);
console.log(`  Markdown files created: ${totalMarkdown}`);
console.log(`  Markdown skipped (exists): ${totalSkippedMd}`);
console.log(`  Slug collisions resolved: ${totalCollisions}`);
console.log('='.repeat(50));
