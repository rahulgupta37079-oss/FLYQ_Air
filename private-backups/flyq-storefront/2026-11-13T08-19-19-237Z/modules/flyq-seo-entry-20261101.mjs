import original from "./kit-entry.js";
export * from "./kit-entry.js";
import {applySEO,seoResource} from './flyq-seo.mjs';
const allowedPreview = "rahulgupta37079.workers.dev";
export default {...original,async fetch(request,env,ctx){
const url=new URL(request.url);
const isPreview=url.hostname.endsWith('.'+allowedPreview)&&/^[a-f0-9]{8}-flyq-(storefront|workshops)[.]/.test(url.hostname);
const seoRequest=isPreview&&['GET','HEAD'].includes(request.method)?new Request('https://flyqdrone.in'+url.pathname+url.search,request):request;
const resource=seoResource(seoRequest);if(resource)return resource;
const response=await original.fetch.call(original,request,env,ctx);
const result=await applySEO(seoRequest,response);
if(isPreview&&result.status!==101&&result.headers.get('Content-Type')?.includes('text/html')){const out=new Response(result.body,result);out.headers.append('X-Robots-Tag','noindex');return out;}
return result;
}};
