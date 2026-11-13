import original, {mainPage} from './worker.js';
import {androidAppContent, androidPrivacyContent} from './android-app-page.js';
import appStyles from './android-app.css';
import cameraApk from './camera.apk';
import benchApk from './bench.apk';
import benchPreview4Apk from './bench-preview4.apk';
import benchPreview5Apk from './bench-preview5.apk';
import cameraExpanded from './camera-expanded.png';
import {androidRelease, benchRelease, previousBenchRelease, preview4BenchRelease} from './android-release.js';

const prefix='/flyq-design/brand/';
const downloads=new Map([
  [androidRelease.url.replace('/static/brand/',prefix),{data:cameraApk,release:androidRelease}],
  [previousBenchRelease.url.replace('/static/brand/',prefix),{data:benchApk,release:previousBenchRelease}],
  [preview4BenchRelease.url.replace('/static/brand/',prefix),{data:benchPreview4Apk,release:preview4BenchRelease}],
  [benchRelease.url.replace('/static/brand/',prefix),{data:benchPreview5Apk,release:benchRelease}]
]);
function appDocument(path,env){
  const body=(path==='/app'?androidAppContent():androidPrivacyContent()).replaceAll('/static/brand/',prefix);
  const base=mainPage(path,env.PLATFORM_ORIGIN);
  if(!base.includes('<main id="main">'))throw Error('Unexpected existing page shell');
  return base.replace(/<main id="main">[\s\S]*?<\/main>/,()=>'<main id="main">'+body+'</main>')
    .replace('<body>','<body class="android-app-page">')
    .replace(/<meta name="theme-color" content="[^"]*">/,'<meta name="theme-color" content="#080b12">')
    .replace(/<meta name="description" content="[^"]*">/,'<meta name="description" content="Download one FLYQ Android app for live camera, photos, video recording and propeller-free hardware control testing.">');
}
export default {
  async fetch(request,env,context){
    const path=new URL(request.url).pathname;
    if(request.method==='GET'||request.method==='HEAD'){
      if(path==='/app/'||path==='/app/privacy/'){
        const redirect=new URL(request.url);redirect.pathname=path.slice(0,-1);return Response.redirect(redirect.href,308);
      }
      if(path==='/app'||path==='/app/privacy'){
        return new Response(request.method==='HEAD'?null:appDocument(path,env),{headers:{
          'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-cache',
          'X-Content-Type-Options':'nosniff','Referrer-Policy':'strict-origin-when-cross-origin',
          'X-FLYQ-App-Release':'3.0.0-preview.5','X-FLYQ-App-Mode':'combined'
        }});
      }
      if(path===prefix+'android-app.css'){
        return new Response(request.method==='HEAD'?null:appStyles,{headers:{
          'Content-Type':'text/css; charset=utf-8','Cache-Control':'no-cache','X-Content-Type-Options':'nosniff'
        }});
      }
      if(path===prefix+'camera-expanded-preview5.png')return new Response(request.method==='HEAD'?null:cameraExpanded,{headers:{'Content-Type':'image/png','Cache-Control':'public, max-age=31536000, immutable','X-Content-Type-Options':'nosniff'}});
      const download=downloads.get(path);
      if(download){
        const etag='"'+download.release.sha256+'"';
        const headers={'Content-Type':'application/vnd.android.package-archive',
          'Content-Disposition':'attachment; filename="'+path.split('/').pop()+'"',
          'Cache-Control':'public, max-age=31536000, immutable','ETag':etag,
          'X-Content-Type-Options':'nosniff'};
        if(request.headers.get('If-None-Match')===etag)return new Response(null,{status:304,headers});
        headers['Content-Length']=String(download.data.byteLength);
        return new Response(request.method==='HEAD'?null:download.data,{headers});
      }
    }
    return original.fetch(request,env,context);
  }
};
