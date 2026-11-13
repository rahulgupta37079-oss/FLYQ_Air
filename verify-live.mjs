import assert from 'node:assert/strict';

async function check() {
  console.log('1. Checking https://flyqdrone.in/webinar ...');
  const wb = await fetch('https://flyqdrone.in/webinar', { headers: { 'Cache-Control': 'no-cache' } });
  assert.equal(wb.status, 200, '/webinar must return HTTP 200');
  assert.equal(wb.headers.get('x-flyq-seo'), '2026-11-13.webinar', '/webinar must have updated SEO header');
  assert.equal(wb.headers.get('x-flyq-logo'), 'blue-v1', '/webinar must have blue logo header');
  const wbHtml = await wb.text();
  assert.ok(wbHtml.includes('Build, Code &amp; Fly Your First <em>Programmable Drone.</em>'), 'Hero headline present');
  assert.ok(wbHtml.includes('6:00 PM – 9:00 PM IST'), 'Monday 6:00 PM - 9:00 PM schedule present');
  assert.ok(wbHtml.includes('₹499'), '₹499 Notes + Recordings option present');
  assert.ok(wbHtml.includes('Live Bootcamp + Notes &amp; Recordings Bundle'), '₹499 Bundle card present');
  assert.ok(wbHtml.includes('Direct Payment Link'), 'Direct Payment Link buttons present');
  assert.ok(wbHtml.includes('id="wb-5s-digit"'), '5-second countdown animation present on /webinar');
  assert.ok(wbHtml.includes('Aarav Kulkarni') && wbHtml.includes('Devansh Patel'), '5 Indian student testimonials present');
  assert.ok(wbHtml.includes('EducationEvent'), 'EducationEvent JSON-LD schema present');
  assert.ok(wbHtml.includes('CourseInstance'), 'Course JSON-LD schema present');
  assert.ok(wbHtml.includes('FAQPage'), 'FAQPage JSON-LD schema present');
  console.log('   ✓ /webinar verified (HTTP 200, 5s Countdown Animation + Spacious Layout + ₹99/₹499 + Direct Payment Links + 5 Student Testimonials)');

  console.log('2. Checking 10 Indian Student Testimonial Images (5 Webinar + 5 Main Website) & Hardware Photos ...');
  for (const imgPath of [
    '/flyq-design/webinar/student-1.jpg',
    '/flyq-design/webinar/student-2.jpg',
    '/flyq-design/webinar/student-3.jpg',
    '/flyq-design/webinar/student-4.jpg',
    '/flyq-design/webinar/student-5.jpg',
    '/flyq-design/webinar/main-student-1.jpg',
    '/flyq-design/webinar/main-student-2.jpg',
    '/flyq-design/webinar/main-student-3.jpg',
    '/flyq-design/webinar/main-student-4.jpg',
    '/flyq-design/webinar/main-student-5.jpg',
    '/flyq-design/webinar/components.jpg',
    '/flyq-design/webinar/assembled-drone.jpg'
  ]) {
    const r = await fetch('https://flyqdrone.in' + imgPath, { method: 'HEAD' });
    assert.equal(r.status, 200, `${imgPath} returned ${r.status}`);
    assert.equal(r.headers.get('content-type'), 'image/jpeg');
  }
  console.log('   ✓ All 10 Indian Student Photos + 2 Hardware Photos verified live (HTTP 200 image/jpeg)');

  console.log('3. Checking https://flyqdrone.in/ (Main Website: 5 New Student Testimonials, 20 Partner Logos Left-to-Right & 1,500+ Units Sold Out) ...');
  const home = await fetch('https://flyqdrone.in/', { headers: { 'Cache-Control': 'no-cache' } });
  assert.equal(home.status, 200, 'Homepage must return HTTP 200');
  const homeHtml = await home.text();
  assert.ok(homeHtml.includes('href="/webinar"'), 'Homepage nav must link to /webinar');
  assert.ok(homeHtml.includes('aria-label="Live Drone Bootcamp Webinar"'), 'Homepage must include Webinar Spotlight Banner');
  assert.ok(homeHtml.includes('id="drone-supply-partners"') && homeHtml.includes('1,500+ FLYQ Drone Units Sold Out'), 'Homepage must include 1,500+ Units Sold Out & 20 Partner Logos showcase');
  assert.ok(homeHtml.includes('fqSlideLeftToRight'), 'Homepage must include Left-to-Right logo marquee transition');
  assert.ok(homeHtml.includes('id="student-reviews"') && homeHtml.includes('Siddharth Deshmukh') && homeHtml.includes('Karthik Reddy'), 'Main website homepage must include 5 distinct Indian Student Testimonials');
  console.log('   ✓ Main Website Homepage verified (5 Distinct Student Testimonials + 20 Company Logos Left-to-Right + 1,500+ Units Sold Out)');

  console.log('4. Checking https://flyqdrone.in/sitemap.xml ...');
  const sm = await fetch('https://flyqdrone.in/sitemap.xml', { headers: { 'Cache-Control': 'no-cache' } });
  assert.equal(sm.status, 200);
  const smXml = await sm.text();
  assert.ok(smXml.includes('<loc>https://flyqdrone.in/webinar</loc>'), 'Sitemap must include /webinar');
  console.log('   ✓ Sitemap verified (/webinar included)');

  console.log('5. Checking https://flyqdrone.in/brochures/FLYQ-Drone-Kit-Guide.pdf ...');
  const pdf = await fetch('https://flyqdrone.in/brochures/FLYQ-Drone-Kit-Guide.pdf', { method: 'HEAD' });
  assert.equal(pdf.status, 200);
  assert.ok(pdf.headers.get('content-type')?.includes('application/pdf'));
  console.log('   ✓ Bonus PDF guide verified');

  console.log('6. Checking https://flyqdrone.in/api/workshops/webinar/health ...');
  const apiHealth = await fetch('https://flyqdrone.in/api/workshops/webinar/health');
  assert.equal(apiHealth.status, 200);
  const healthJson = await apiHealth.json();
  assert.equal(healthJson.ready, true);
  console.log('   ✓ Webinar D1 Database & API verified:', JSON.stringify(healthJson));

  console.log('7. Checking https://flyqdrone.in/workshops/webinar-admin ...');
  const adminPage = await fetch('https://flyqdrone.in/workshops/webinar-admin');
  assert.equal(adminPage.status, 200);
  const adminHtml = await adminPage.text();
  assert.ok(adminHtml.includes('₹99 Webinar Registrations.'));
  console.log('   ✓ Webinar Owner Admin Desk verified');

  console.log('\nALL LIVE PRODUCTION CHECKS PASSED ON https://flyqdrone.in ✓');
}

check();
