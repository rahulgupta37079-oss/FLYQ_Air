import pages from './flyq-seo-metadata.mjs';
export const SEO_VERSION = '2026-11-01.1';
export const ORIGIN = 'https://flyqdrone.in';
export { pages };
export const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const jsonLD = value => JSON.stringify(value).replace(/</g, '\\u003c').replace(/\u2028/g,'\\u2028').replace(/\u2029/g,'\\u2029');
export function pageFor(path) { return Object.hasOwn(pages,path) ? pages[path] : null; }
export function schemaFor(path) {
 const p=pageFor(path); if(!p)return null;
 // The live spare-parts template already has CollectionPage/BreadcrumbList markup.
 if(p.canonical.endsWith('/products/flyq-kit-v1-spare-parts'))return null;
 const graph=[{'@type':'WebPage','@id':p.canonical+'#webpage',url:p.canonical,name:p.title,description:p.description}];
 if(path==='/') graph.push(
  {'@type':'Organization','@id':ORIGIN+'/#organization',name:'FLYQ Drones',url:ORIGIN+'/',telephone:'+91-9137361474',email:'info@passion3dworld.com'},
  {'@type':'WebSite','@id':ORIGIN+'/#website',url:ORIGIN+'/',name:'FLYQ Drones',publisher:{'@id':ORIGIN+'/#organization'}}
 );
 else graph.push({'@type':'BreadcrumbList','@id':p.canonical+'#breadcrumb',itemListElement:[
  {'@type':'ListItem',position:1,name:'Home',item:ORIGIN+'/'},
  {'@type':'ListItem',position:2,name:p.label,item:p.canonical}
 ]});
 return {'@context':'https://schema.org','@graph':graph};
}
export function headFor(path,{includeSchema=true}={}) {
 const p=pageFor(path);if(!p)return '';
 const a=escapeHTML;
 let html=`\n<!-- FLYQ SEO v1 -->\n<title>${a(p.title)}</title>\n<meta name="description" content="${a(p.description)}">\n<link rel="canonical" href="${a(p.canonical)}">\n<meta property="og:type" content="website">\n<meta property="og:site_name" content="FLYQ Drones">\n<meta property="og:title" content="${a(p.title)}">\n<meta property="og:description" content="${a(p.description)}">\n<meta property="og:url" content="${a(p.canonical)}">\n<meta name="twitter:card" content="${p.image?'summary_large_image':'summary'}">\n<meta name="twitter:title" content="${a(p.title)}">\n<meta name="twitter:description" content="${a(p.description)}">\n`;
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
const privatePage=/^\/(?:account|login|register|cart|checkout|crm|admin)(?:\/|$)|^\/learn\/(?:login|register|account|crm|drone-access|simulator|blockly|code-editor)(?:\/|$)|^\/workshops\/admin(?:\/|$)/;
function editableResponse(response) {
 const r=new Response(response.body,response);
 for(const h of ['Content-Length','ETag','Content-MD5','Digest'])r.headers.delete(h);
 return r;
}
// Integrate after the existing authenticated/routed response. This function never
// calls a backend, modifies an order, changes a session, or creates a redirect.
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
