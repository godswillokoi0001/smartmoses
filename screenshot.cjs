const { chromium } = require('playwright-core');
const path = require('path');
const fs = require('fs');

(async () => {
  const outDir = path.join(__dirname, 'screenshots');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
  });

  const viewports = [
    { name: 'mobile-390', width: 390, height: 844 },
    { name: 'desktop-1440', width: 1440, height: 900 },
  ];

  const sections = [
    { name: 'hero', selector: '#top' },
    { name: 'work', selector: '#work' },
    { name: 'services', selector: '#services' },
    { name: 'about', selector: '#about' },
    { name: 'process', selector: '#process' },
    { name: 'contact', selector: '#contact' },
    { name: 'full-page', selector: null },
  ];

  for (const vp of viewports) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    await page.goto('http://localhost:5174/', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2500); // let animations settle

    // Full page
    await page.screenshot({
      path: path.join(outDir, `${vp.name}-full.png`),
      fullPage: true,
    });

    // Section screenshots
    for (const section of sections) {
      if (!section.selector) continue;
      try {
        const el = await page.$(section.selector);
        if (el) {
          await el.scrollIntoViewIfNeeded();
          await page.waitForTimeout(600);
          await el.screenshot({ path: path.join(outDir, `${vp.name}-${section.name}.png`) });
        }
      } catch (e) {
        console.error(`Failed ${section.name}:`, e.message);
      }
    }

    await page.close();
    console.log(`Done: ${vp.name}`);
  }

  await browser.close();
  console.log('Screenshots saved to:', outDir);
})();

