import original from './app-entry.js';
import {mainPage} from './worker.js';
import {kitContent,kitBanner} from './kit-page.js';
import cartScript from './cart.js.txt';
import cartCore from './cart-core.js.txt';
import {seoHead,storeNavigation,sitemap} from './store-seo.js';
import remote from "./kit-remote.jpeg";
import remoteOriginal from "./kit-remote-original.jpeg";
import holder from "./kit-holder.jpeg";
import holderOriginal from "./kit-holder-original.jpeg";
import motors from "./kit-motors.jpeg";
import motorsOriginal from "./kit-motors-original.jpeg";
import propellers from "./kit-propellers.jpeg";
import propellersOriginal from "./kit-propellers-original.jpeg";
import battery from "./kit-battery.jpeg";
import batteryOriginal from "./kit-battery-original.jpeg";
import camera from "./kit-camera.jpeg";
import cameraOriginal from "./kit-camera-original.jpeg";
const images=new Map([["/flyq-design/kit-v1/remote.jpeg",remote],["/flyq-design/kit-v1/remote-original.jpeg",remoteOriginal],["/flyq-design/kit-v1/holder.jpeg",holder],["/flyq-design/kit-v1/holder-original.jpeg",holderOriginal],["/flyq-design/kit-v1/motors.jpeg",motors],["/flyq-design/kit-v1/motors-original.jpeg",motorsOriginal],["/flyq-design/kit-v1/propellers.jpeg",propellers],["/flyq-design/kit-v1/propellers-original.jpeg",propellersOriginal],["/flyq-design/kit-v1/battery.jpeg",battery],["/flyq-design/kit-v1/battery-original.jpeg",batteryOriginal],["/flyq-design/kit-v1/camera.jpeg",camera],["/flyq-design/kit-v1/camera-original.jpeg",cameraOriginal]]);
export default {async fetch(request,env,ctx){
const path=new URL(request.url).pathname;
if(!['GET','HEAD'].includes(request.method))return original.fetch(request,env,ctx);
if(images.has(path))return new Response(request.method==='HEAD'?null:images.get(path),{headers:{'Content-Type':'image/jpeg','Cache-Control':'public,max-age=86400','X-Content-Type-Options':'nosniff'}});
if(path==='/products/flyq-kit-v1-spare-parts/')return Response.redirect(new URL('/products/flyq-kit-v1-spare-parts',request.url),308);
if(path==='/store/' )return Response.redirect(new URL('/store',request.url),308);
if(path==='/flyq-design/kit-v1/cart.js'||path==='/flyq-design/kit-v1/cart-core.js')return new Response(request.method==='HEAD'?null:path.endsWith('/cart.js')?cartScript:cartCore,{headers:{'Content-Type':'text/javascript; charset=utf-8','Cache-Control':'no-cache'}});
if(path==='/store-sitemap.xml')return new Response(request.method==='HEAD'?null:sitemap,{headers:{'Content-Type':'application/xml; charset=utf-8'}});
if(path==='/store'||path==='/products/flyq-kit-v1-spare-parts'){
let html=mainPage('/products',env.PLATFORM_ORIGIN).replace(/<main id="main">[\s\S]*?<\/main>/,()=>'<main id="main">'+kitContent()+'</main>').replace(/<title>[\s\S]*?<\/title>/,'<title>FLYQ KIT V1 Spare Parts | FLYQ Drones</title>').replace(/<meta name="description" content="[^"]*">/,'<meta name="description" content="FLYQ KIT V1 spare parts: remote, phone holder, motors, propellers and extra battery. Browse photos and prices, and enquire directly with FLYQ.">').replace(/<link rel="canonical"[^>]*>/,'<link rel="canonical" href="https://flyqdrone.in/products/flyq-kit-v1-spare-parts">');
html=storeNavigation(html);html=html.replace('</head>',seoHead+'</head>');
return new Response(request.method==='HEAD'?null:html,{headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-cache'}});
}
const response=await original.fetch(request,env,ctx);
if(request.method==='GET'&&path==='/robots.txt'&&response.ok){const text=await response.text();return new Response(text+'\nSitemap: https://flyqdrone.in/store-sitemap.xml\n',{headers:{'Content-Type':'text/plain; charset=utf-8','Cache-Control':'no-cache'}});}
if(request.method==='GET'&&response.ok&&response.headers.get('Content-Type')?.includes('text/html')&&!path.startsWith('/learn/')){
let html=storeNavigation(await response.text());if(['/', '/products'].includes(path))html=html.replace('</main>',kitBanner()+'</main>');const h=new Headers(response.headers);for(const k of ['Content-Length','Content-Encoding','ETag'])h.delete(k);return new Response(html,{status:response.status,headers:h});
}return response;
}};
