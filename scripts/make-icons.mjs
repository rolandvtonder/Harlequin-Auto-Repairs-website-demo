// One-off generator for the favicon PNGs and the social share image.
// Run with `npm run icons` after changing the logo or the workshop photo.
import sharp from 'sharp';

const svg = await sharp('public/favicon.svg', {density: 600});
await svg.clone().resize(32, 32).png().toFile('public/favicon-32.png');
await sharp('src/assets/logo.jpg').resize(180, 180, {fit: 'cover', position: 'north'}).png().toFile('public/apple-touch-icon.png');
await sharp('src/assets/logo.jpg').resize(512, 512).png().toFile('public/icon-512.png');

// 1200×630 Open Graph image: the workshop, darkened, with the logo badge.
const badge = await sharp('src/assets/logo.jpg').resize(220, 220).png().toBuffer();
const shade = Buffer.from(
  `<svg width="1200" height="630"><defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="#0c0b0e" stop-opacity=".85"/><stop offset=".6" stop-color="#0c0b0e" stop-opacity=".2"/></linearGradient></defs><rect width="1200" height="630" fill="url(#g)"/><rect y="610" width="1200" height="20" fill="#c8142c"/>
  <text x="60" y="440" font-family="Arial Narrow, Arial, sans-serif" font-weight="700" font-size="84" fill="#fff">HARLEQUIN</text>
  <text x="60" y="510" font-family="Arial Narrow, Arial, sans-serif" font-weight="700" font-size="44" fill="#e8c47c">AUTO REPAIRS &amp; SERVICES</text>
  <text x="60" y="565" font-family="Arial, sans-serif" font-size="28" fill="#fff">Brackenhurst, Alberton · 078 555 3354</text></svg>`,
);
await sharp('src/assets/workshop-lifts.jpg')
  .resize(1200, 630, {fit: 'cover'})
  .composite([{input: shade}, {input: badge, top: 60, left: 60}])
  .jpeg({quality: 82, mozjpeg: true})
  .toFile('public/og-image.jpg');
console.log('icons done');
