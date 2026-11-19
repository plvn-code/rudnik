async (page) => {
  // 390px checks: horizontal overflow per page + a few screenshots -> research/m-*.png
  page.setDefaultTimeout(30000);
  await page.setViewportSize({ width: 390, height: 844 });
  const pages = ['', 'systemy', 'systemy/balast', 'rishennia/koshyky', 'portfolio', 'vyrobnytstvo', 'pro-kompaniyu', 'kontakty', 'rishennia/lstk', 'systemy/fasad'];
  const res = [];
  for (const p of pages) {
    await page.goto('http://localhost:3024/' + p, { waitUntil: 'load', timeout: 60000 });
    await page.waitForTimeout(1200);
    const H = await page.evaluate(() => document.body.scrollHeight);
    const over = await page.evaluate(() => {
      const W = document.documentElement.clientWidth; const bad = [];
      document.querySelectorAll('body *').forEach((e) => { const r = e.getBoundingClientRect(); if (r.right > W + 1 && r.width > 0 && !e.closest('.rail, .marquee, .tabs, .footer-giant, .mobile-menu, .contact-giant, .hero-media, .intro')) bad.push(e.tagName + '.' + (e.className && e.className.baseVal === undefined ? e.className : '').toString().slice(0, 40) + ' ' + Math.round(r.right)); });
      return [document.documentElement.scrollWidth, W, bad.slice(0, 6)];
    });
    res.push(p + ' H' + H + ' ' + JSON.stringify(over));
    if (['', 'systemy/balast', 'rishennia/koshyky'].includes(p)) {
      for (const f of [0, 0.12, 0.3, 0.5, 0.7]) {
        await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), Math.round(H * f) - 300);
        await page.waitForTimeout(250);
        await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), Math.round(H * f));
        await page.waitForTimeout(1200);
        await page.screenshot({ path: `/Users/admin/Desktop/rudnik/research/m-${p.replace('/', '_') || 'home'}-${f}.png`, timeout: 15000 });
      }
    }
  }
  await page.setViewportSize({ width: 1440, height: 900 });
  return res.join('\n');
}
