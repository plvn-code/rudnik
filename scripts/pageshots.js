async (page) => {
  // Top + a few scroll stops of inner pages -> research/p-<slug>-N.png (instant scroll).
  page.setDefaultTimeout(30000);
  const pages = ['systemy', 'systemy/landing', 'systemy/solarparking', 'rishennia/koshyky', 'portfolio', 'vyrobnytstvo', 'pro-kompaniyu', 'kontakty'];
  const res = [];
  for (const p of pages) {
    await page.goto('http://localhost:3024/' + p, { waitUntil: 'load', timeout: 60000 });
    await page.waitForTimeout(1500);
    const H = await page.evaluate(() => document.body.scrollHeight);
    const stops = [0, 0.18, 0.36, 0.55];
    for (let k = 0; k < stops.length; k++) {
      const y = Math.round(H * stops[k]);
      for (const d of [-500, 0]) { await page.evaluate((y) => window.scrollTo({ top: Math.max(0, y), behavior: 'instant' }), y + d); await page.waitForTimeout(300); }
      await page.waitForTimeout(1100);
      await page.screenshot({ path: `/Users/admin/Desktop/rudnik/research/p-${p.replace('/', '_')}-${k}.png`, timeout: 15000 });
    }
    res.push(p + ':' + H);
  }
  return res.join(' ');
}
