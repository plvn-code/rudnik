async (page) => {
  // Screenshots of a page at several scroll positions -> research/s-<name>-N.png
  const name = 'home', url = 'http://localhost:3024/', w = 1440;
  await page.setViewportSize({ width: w, height: 900 });
  await page.goto(url, { waitUntil: 'networkidle', timeout: 90000 });
  await page.waitForTimeout(1200);
  const H = await page.evaluate(() => document.body.scrollHeight);
  const out = [];
  let k = 0;
  for (let y = 0; y < H; y += 1100) {
    await page.evaluate((y) => window.scrollTo(0, y), y);
    await page.waitForTimeout(900);
    await page.screenshot({ path: `/Users/admin/Desktop/rudnik/research/s-${name}-${String(k).padStart(2, '0')}.png` });
    out.push(y); k++;
  }
  return H + ' ' + out.length;
}
