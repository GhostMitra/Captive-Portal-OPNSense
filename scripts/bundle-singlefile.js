import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const outputDir = path.resolve(rootDir, 'opnsense-template');

async function bundle() {
  console.log('🚀 Packaging OPNsense Captive Portal Template...');

  if (!fs.existsSync(distDir)) {
    console.error('❌ Error: dist folder does not exist. Run "npm run build" first.');
    process.exit(1);
  }

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  let htmlContent = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

  // Find and inline CSS files safely using function replacement to prevent $ string interpolation
  const cssMatches = htmlContent.match(/<link rel="stylesheet"[^>]+href="([^"]+)"[^>]*>/g) || [];
  for (const match of cssMatches) {
    const hrefMatch = match.match(/href="([^"]+)"/);
    if (hrefMatch && hrefMatch[1]) {
      const cssRelativePath = hrefMatch[1].replace(/^\//, '');
      const cssFullPath = path.join(distDir, cssRelativePath);
      if (fs.existsSync(cssFullPath)) {
        const cssContent = fs.readFileSync(cssFullPath, 'utf-8');
        htmlContent = htmlContent.replace(match, () => `<style>${cssContent}</style>`);
      }
    }
  }

  // Find and inline JS files safely using function replacement to prevent $ string interpolation
  const jsMatches = htmlContent.match(/<script type="module"[^>]+src="([^"]+)"[^>]*><\/script>/g) || [];
  for (const match of jsMatches) {
    const srcMatch = match.match(/src="([^"]+)"/);
    if (srcMatch && srcMatch[1]) {
      const jsRelativePath = srcMatch[1].replace(/^\//, '');
      const jsFullPath = path.join(distDir, jsRelativePath);
      if (fs.existsSync(jsFullPath)) {
        const jsContent = fs.readFileSync(jsFullPath, 'utf-8');
        htmlContent = htmlContent.replace(match, () => `<script type="module">${jsContent}</script>`);
      }
    }
  }

  // Write bundled HTML
  const outputPath = path.join(outputDir, 'index.html');
  fs.writeFileSync(outputPath, htmlContent, 'utf-8');

  console.log(`✅ Single-file bundle successfully created at:\n   ${outputPath}`);
  console.log('\n📦 Ready to upload to OPNsense: Services -> Captive Portal -> Administration -> Templates');
}

bundle();
