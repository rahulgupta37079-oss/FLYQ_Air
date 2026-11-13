import assert from 'node:assert/strict';
import { pages, schemaFor, headFor, sitemapXML } from './flyq-seo.mjs';
import { applyWebinarNav, webinarHomepageBanner, mainSiteTestimonialsSection, webinarContent, webinarScript } from './flyq-webinar-page.mjs';
import { webinarImageResource } from './flyq-webinar-assets.mjs';

// 1. Verify SEO metadata for /webinar
assert.ok(pages['/webinar'], '/webinar metadata must exist');
assert.equal(pages['/webinar'].canonical, 'https://flyqdrone.in/webinar');
assert.ok(pages['/webinar'].title.includes('₹99'), 'Title must highlight ₹99');
assert.ok(pages['/webinar'].description.includes('6:00 PM'), 'Description must highlight Monday 6:00 PM – 9:00 PM');

// 2. Verify JSON-LD Schema for /webinar (with ₹99 and ₹499 offers)
const schema = schemaFor('/webinar');
assert.ok(schema && Array.isArray(schema['@graph']), 'Schema @graph must exist');
const types = schema['@graph'].map(item => item['@type']);
assert.ok(types.includes('EducationEvent'), 'Must include EducationEvent schema');
assert.ok(types.includes('Course'), 'Must include Course schema');
assert.ok(types.includes('FAQPage'), 'Must include FAQPage schema');
const eventNode = schema['@graph'].find(item => item['@type'] === 'EducationEvent');
assert.ok(Array.isArray(eventNode.offers), 'Offers must be an array with ₹99 and ₹499');
assert.equal(eventNode.offers[0].price, '99');
assert.equal(eventNode.offers[1].price, '499');

// 3. Verify Sitemap includes /webinar
const xml = sitemapXML();
assert.ok(xml.includes('<loc>https://flyqdrone.in/webinar</loc>'), 'Sitemap must include /webinar');

// 4. Verify Head HTML generation
const head = headFor('/webinar');
assert.ok(head.includes('<link rel="canonical" href="https://flyqdrone.in/webinar">'));
assert.ok(head.includes('application/ld+json'));

// 5. Verify Webinar Content, ₹499 Notes + Recordings Option, Direct Payment Links & 5 Indian Student Testimonials
const content = webinarContent();
assert.ok(content.includes('Build, Code &amp; Fly Your First <em>Programmable Drone.</em>'));
assert.ok(content.includes('6:00 PM – 9:00 PM IST'));
assert.ok(content.includes('₹499'));
assert.ok(content.includes('Live Bootcamp + Notes &amp; Recordings Bundle'));
assert.ok(content.includes('Direct Payment Link'));
assert.ok(content.includes('Aarav Kulkarni'));
assert.ok(content.includes('Priya Nair'));
assert.ok(content.includes('Rohan Verma'));
assert.ok(content.includes('Ananya Iyer'));
assert.ok(content.includes('Devansh Patel'));
assert.ok(content.includes('/flyq-design/webinar/student-1.jpg'));
assert.ok(content.includes('/flyq-design/webinar/student-5.jpg'));
assert.ok(content.includes('/flyq-design/webinar/components.jpg'));
assert.ok(content.includes('/flyq-design/webinar/assembled-drone.jpg'));
assert.ok(content.includes('id="wb-5s-digit"'), '5-second launch countdown digit present');
assert.ok(content.includes('id="wb-replay-5s-btn"'), '5-second replay button present');
assert.ok(content.includes('CERTIFICATE OF COMPLETION'));
assert.ok(content.includes('id="webinar-register-form"'));
assert.ok(content.includes('id="wb-step2-container"'));

const mainTesti = mainSiteTestimonialsSection();
assert.ok(mainTesti.includes('id="student-reviews"'));
assert.ok(mainTesti.includes('Aarav Kulkarni') && mainTesti.includes('Devansh Patel'));
assert.ok(webinarScript.includes('runFiveSecondLaunch'));

// 6. Verify all 7 bundled image assets serve valid JPEG bytes
for (const p of [
  '/flyq-design/webinar/student-1.jpg',
  '/flyq-design/webinar/student-2.jpg',
  '/flyq-design/webinar/student-3.jpg',
  '/flyq-design/webinar/student-4.jpg',
  '/flyq-design/webinar/student-5.jpg',
  '/flyq-design/webinar/components.jpg',
  '/flyq-design/webinar/assembled-drone.jpg'
]) {
  const resp = webinarImageResource(new Request('https://flyqdrone.in' + p));
  assert.ok(resp && resp.status === 200, `Asset ${p} must return 200`);
  assert.equal(resp.headers.get('content-type'), 'image/jpeg');
}

const sampleNav = '<nav class="main-nav" id="main-nav"><a href="/products">Products</a><a href="/summer-camp">Workshops</a></nav><a href="/summer-camp">Workshops & camps</a>';
const updatedNav = applyWebinarNav(sampleNav, '/webinar');
assert.ok(updatedNav.includes('href="/webinar" class="active"'));
assert.ok(updatedNav.includes('₹99 Live Drone Webinar'));

const banner = webinarHomepageBanner();
assert.ok(banner.includes('₹499 with Notes + Recordings'));
assert.ok(webinarScript.includes('/api/payment/initiate'));
assert.ok(webinarScript.includes('/api/workshops/webinar/register'));

console.log('ALL LOCAL WEBINAR, ₹499 BUNDLE, PAYMENT LINK & 5 STUDENT IMAGE TESTS PASSED ✓');
