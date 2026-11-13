import base64 from './flyq-logo-image.mjs';
export const LOGO_PATH='/flyq-brand/logo-blue-v1.png';
export function logoResource(request){
 if(new URL(request.url).pathname!==LOGO_PATH||!['GET','HEAD'].includes(request.method))return null;
 const bytes=Uint8Array.from(atob(base64),c=>c.charCodeAt(0));
 return new Response(request.method==='HEAD'?null:bytes,{headers:{'Content-Type':'image/png','Cache-Control':'public, max-age=31536000, immutable','X-Content-Type-Options':'nosniff'}});
}
export async function applyLogo(request,response){
 if(request.method!=='GET'||request.headers.has('Range')||response.status!==200||!response.headers.get('Content-Type')?.includes('text/html'))return response;
 const p=new URL(request.url).pathname;
 if(!['/','/products','/products/flyq-air','/products/flyq-vision','/app','/app/privacy','/docs','/docs/assembly','/about','/contact','/summer-camp','/workshops','/blog/first-simulated-flight','/blog/programming-with-blocks','/blog/choose-your-flyq'].includes(p))return response;
 const r=new Response(response.body,response);for(const h of ['Content-Length','ETag','Content-MD5','Digest'])r.headers.delete(h);
 const out=new HTMLRewriter().on('.site-header .brand-lockup span.wordmark',{element(e){
 e.setAttribute('data-flyq-logo','blue-v1');
 e.setInnerContent(`<img src="${LOGO_PATH}" alt="FLYQ Drones" width="2103" height="748" style="display:block;width:clamp(108px,12vw,148px);height:auto;max-width:100%;object-fit:contain" decoding="async">`,{html:true});
 }}).transform(r);out.headers.set('X-FLYQ-LOGO','blue-v1');return out;
}
