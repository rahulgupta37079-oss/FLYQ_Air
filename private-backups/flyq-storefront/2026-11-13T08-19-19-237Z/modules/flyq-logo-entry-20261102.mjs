import original from "./flyq-seo-entry-20261101.mjs";
export * from "./flyq-seo-entry-20261101.mjs";
import {applyLogo,logoResource} from './flyq-logo.mjs';
export default {...original,async fetch(request,env,ctx){
const asset=logoResource(request);if(asset)return asset;
return applyLogo(request,await original.fetch.call(original,request,env,ctx));
}};