import pages from './flyq-seo-metadata.mjs';
export const SEO_VERSION = '2026-11-13.webinar';
export const ORIGIN = 'https://flyqdrone.in';
export { pages };
export const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const jsonLD = value => JSON.stringify(value).replace(/</g, '\\u003c').replace(/\u2028/g,'\\u2028').replace(/\u2029/g,'\\u2029');
export function pageFor(path) { return Object.hasOwn(pages,path) ? pages[path] : null; }

function upcomingMondayWindowISO() {
  const now = new Date();
  const utcMs = now.getTime() + (now.getTimezoneOffset() * 60000);
  const istNow = new Date(utcMs + (5.5 * 3600000));
  const day = istNow.getDay();
  let daysUntilMonday = (1 - day + 7) % 7;
  if (daysUntilMonday === 0 && istNow.getHours() >= 21) daysUntilMonday = 7;
  const target = new Date(istNow);
  target.setDate(istNow.getDate() + daysUntilMonday);
  const yyyy = target.getFullYear();
  const mm = String(target.getMonth() + 1).padStart(2, '0');
  const dd = String(target.getDate()).padStart(2, '0');
  return {
    startDate: `${yyyy}-${mm}-${dd}T18:00:00+05:30`,
    endDate: `${yyyy}-${mm}-${dd}T21:00:00+05:30`
  };
}

export function schemaFor(path) {
  const p = pageFor(path);
  if (!p) return null;
  if (p.canonical.endsWith('/products/flyq-kit-v1-spare-parts')) return null;
  const graph = [
    {
      '@type': 'WebPage',
      '@id': p.canonical + '#webpage',
      url: p.canonical,
      name: p.title,
      description: p.description
    }
  ];
  if (path === '/') {
    graph.push(
      {
        '@type': 'Organization',
        '@id': ORIGIN + '/#organization',
        name: 'FLYQ Drones',
        url: ORIGIN + '/',
        telephone: '+91-9137361474',
        email: 'info@passion3dworld.com'
      },
      {
        '@type': 'WebSite',
        '@id': ORIGIN + '/#website',
        url: ORIGIN + '/',
        name: 'FLYQ Drones',
        publisher: { '@id': ORIGIN + '/#organization' }
      }
    );
  } else {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': p.canonical + '#breadcrumb',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: ORIGIN + '/' },
        { '@type': 'ListItem', position: 2, name: p.label, item: p.canonical }
      ]
    });
  }

  if (path === '/webinar') {
    const { startDate, endDate } = upcomingMondayWindowISO();
    graph.push(
      {
        '@type': 'EducationEvent',
        '@id': p.canonical + '#event',
        name: 'Build, Code & Fly Your First Programmable Drone (3-Hour Live Bootcamp)',
        description: p.description,
        startDate,
        endDate,
        duration: 'PT3H',
        inLanguage: 'en-IN',
        isAccessibleForFree: false,
        eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
        eventStatus: 'https://schema.org/EventScheduled',
        location: {
          '@type': 'VirtualLocation',
          url: p.canonical
        },
        image: [p.image],
        organizer: {
          '@type': 'Organization',
          name: 'FLYQ Drones',
          url: ORIGIN + '/',
          telephone: '+91-9137361474',
          email: 'info@passion3dworld.com'
        },
        performer: {
          '@type': 'Person',
          name: 'Rahul Gupta',
          jobTitle: 'Founder, FLYQ Drones'
        },
        offers: [
          {
            '@type': 'Offer',
            name: 'Live 3-Hour Webinar + Free Certificate Pass',
            url: p.canonical + '#register',
            price: '99',
            priceCurrency: 'INR',
            availability: 'https://schema.org/InStock',
            validFrom: '2026-11-01T00:00:00+05:30'
          },
          {
            '@type': 'Offer',
            name: 'Live Webinar + Free Certificate + Lifetime HD Recordings & Engineering Notes Bundle',
            url: p.canonical + '#pricing',
            price: '499',
            priceCurrency: 'INR',
            availability: 'https://schema.org/InStock',
            validFrom: '2026-11-01T00:00:00+05:30'
          }
        ]
      },
      {
        '@type': 'Course',
        '@id': p.canonical + '#course',
        name: 'Build, Code & Fly Your First Programmable Drone — 3-Hour Live Bootcamp',
        description: p.description,
        provider: {
          '@type': 'Organization',
          name: 'FLYQ Drones',
          sameAs: ORIGIN + '/'
        },
        educationalCredentialAwarded: 'FLYQ Verified Certificate of Completion',
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          bestRating: '5',
          ratingCount: '1240'
        },
        offers: [
          {
            '@type': 'Offer',
            name: '₹99 Live Webinar + Free Certificate',
            category: 'Paid',
            price: '99',
            priceCurrency: 'INR'
          },
          {
            '@type': 'Offer',
            name: '₹499 Live Webinar + Recordings & Complete Engineering Notes Bundle',
            category: 'Paid',
            price: '499',
            priceCurrency: 'INR'
          }
        ],
        hasCourseInstance: {
          '@type': 'CourseInstance',
          courseMode: 'Online',
          courseWorkload: 'PT3H',
          startDate,
          endDate,
          instructor: {
            '@type': 'Person',
            name: 'Rahul Gupta'
          }
        }
      },
      {
        '@type': 'FAQPage',
        '@id': p.canonical + '#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Do I need to own a FLYQ drone kit to attend this ₹99 webinar?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. We demonstrate real FLYQ Air and FLYQ Vision hardware live and show coding workflows inside the 3D Flight Studio simulator so beginners can follow every step without owning hardware.'
            }
          },
          {
            '@type': 'Question',
            name: 'When is the live drone webinar held and how long is it?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The live bootcamp takes place on Monday from 6:00 PM to 9:00 PM IST (3 hours total), covering Drone Hardware & ESP32-S3 Electronics, Flight Coding & 3D Simulation, and AI Camera Vision & Live Q&A.'
            }
          },
          {
            '@type': 'Question',
            name: 'Is a free certificate included with the ₹99 registration?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Every registered participant who attends the Monday 6:00 PM – 9:00 PM IST live session receives an official, verifiable FLYQ Drones Certificate of Completion at no extra cost.'
            }
          }
        ]
      }
    );
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}

export function headFor(path,{includeSchema=true}={}) {
 const p=pageFor(path);if(!p)return '';
 const a=escapeHTML;
 let html=`\n<!-- FLYQ SEO v2 -->\n<title>${a(p.title)}</title>\n<meta name="description" content="${a(p.description)}">\n<link rel="canonical" href="${a(p.canonical)}">\n<meta property="og:type" content="${path==='/webinar'?'event':'website'}">\n<meta property="og:site_name" content="FLYQ Drones">\n<meta property="og:title" content="${a(p.title)}">\n<meta property="og:description" content="${a(p.description)}">\n<meta property="og:url" content="${a(p.canonical)}">\n<meta name="twitter:card" content="${p.image?'summary_large_image':'summary'}">\n<meta name="twitter:title" content="${a(p.title)}">\n<meta name="twitter:description" content="${a(p.description)}">\n`;
 if(p.image)html+=`<meta property="og:image" content="${a(p.image)}">\n<meta property="og:image:alt" content="${a(p.label)}">\n<meta name="twitter:image" content="${a(p.image)}">\n`;
 const schema=includeSchema&&schemaFor(path);
 if(schema)html+=`<script type="application/ld+json" id="flyq-seo-schema">${jsonLD(schema)}</script>\n`;
 return html;
}
export function sitemapXML(){
 const urls=[...new Set(Object.values(pages).map(p=>p.canonical))];
 return '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+urls.map(u=>`  <url><loc>${escapeHTML(u)}</loc></url>`).join('\n')+'\n</urlset>\n';
}
export function seoResource(request){
 const u=new URL(request.url);
 if(u.origin!==ORIGIN||!['GET','HEAD'].includes(request.method)||u.pathname!=='/sitemap.xml')return null;
 return new Response(request.method==='HEAD'?null:sitemapXML(),{headers:{'Content-Type':'application/xml; charset=utf-8','Cache-Control':'public, max-age=300'}});
}
const controlledMeta=new Set(['description','og:type','og:site_name','og:title','og:description','og:url','og:image','og:image:alt','twitter:card','twitter:title','twitter:description','twitter:image']);
const privatePage=/^\/(?:account|login|register|cart|checkout|crm|admin)(?:\/|$)|^\/learn\/(?:login|register|account|crm|drone-access|simulator|blockly|code-editor)(?:\/|$)|^\/workshops\/(?:admin|webinar-admin)(?:\/|$)|^\/webinar\/admin(?:\/|$)/;
function editableResponse(response) {
 const r=new Response(response.body,response);
 for(const h of ['Content-Length','ETag','Content-MD5','Digest'])r.headers.delete(h);
 return r;
}
export async function applySEO(request,response){
 const u=new URL(request.url);
 if(u.origin!==ORIGIN||!['GET','HEAD'].includes(request.method)||response.status!==200||request.headers.has('Range'))return response;
 const type=response.headers.get('Content-Type')||'';
 if(u.pathname==='/robots.txt'&&type.includes('text/plain')&&request.method==='GET'){
  const text=await response.text(); const line='Sitemap: '+ORIGIN+'/sitemap.xml';
  const r=editableResponse(new Response(text.includes(line)?text:text.replace(/\s*$/,'')+'\n\n'+line+'\n',response));
  return r;
 }
 if(!type.toLowerCase().includes('text/html'))return response;
 if(privatePage.test(u.pathname)){
  const r=new Response(response.body,response);r.headers.append('X-Robots-Tag','noindex, nofollow');return r;
 }
 if(request.method==='HEAD'||!pageFor(u.pathname))return response;
 let existingSchema=false;
 const rewriter=new HTMLRewriter()
  .on('head title',{element(e){e.remove();}})
  .on('head meta',{element(e){const key=(e.getAttribute('name')||e.getAttribute('property')||'').toLowerCase();if(controlledMeta.has(key))e.remove();}})
  .on('head link',{element(e){if((e.getAttribute('rel')||'').toLowerCase().split(/\s+/).includes('canonical'))e.remove();}})
  .on('head script',{element(e){if((e.getAttribute('type')||'').toLowerCase()==='application/ld+json')existingSchema=true;}})
  .on('head',{element(e){e.onEndTag(end=>end.before(headFor(u.pathname,{includeSchema:!existingSchema}),{html:true}));}});
 const result=rewriter.transform(editableResponse(response));
 result.headers.set('X-FLYQ-SEO',SEO_VERSION);
 return result;
}
