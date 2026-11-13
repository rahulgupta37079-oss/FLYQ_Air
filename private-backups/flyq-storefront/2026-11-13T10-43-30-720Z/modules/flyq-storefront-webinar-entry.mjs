import original from './kit-entry.js';
import { mainPage } from './worker.js';
import { storeNavigation } from './store-seo.js';
import { applySEO, seoResource } from './flyq-seo.mjs';
import { applyLogo, logoResource } from './flyq-logo.mjs';
import {
  WEBINAR_PATH,
  WEBINAR_JS_PATH,
  KIT_GUIDE_PDF_PATH,
  applyWebinarNav,
  webinarHomepageBanner,
  webinarContent,
  webinarScript
} from './flyq-webinar-page.mjs';
import { webinarImageResource } from './flyq-webinar-assets.mjs';
import kitGuidePdf from './kit-guide.pdf';

const allowedPreview = 'rahulgupta37079.workers.dev';

export default {
  ...original,
  async fetch(request, env, ctx) {
    const asset = logoResource(request);
    if (asset) return asset;

    const wbImg = webinarImageResource(request);
    if (wbImg) return wbImg;

    const url = new URL(request.url);
    const path = url.pathname;
    const isPreview =
      url.hostname.endsWith('.' + allowedPreview) &&
      /^[a-f0-9]{8}-flyq-(storefront|workshops)[.]/.test(url.hostname);
    const seoRequest =
      isPreview && ['GET', 'HEAD'].includes(request.method)
        ? new Request('https://flyqdrone.in' + path + url.search, request)
        : request;

    const sResource = seoResource(seoRequest);
    if (sResource) return sResource;

    if (['GET', 'HEAD'].includes(request.method)) {
      if (path === '/webinar/') {
        return Response.redirect(new URL('/webinar' + url.search, request.url), 308);
      }
      if (path === '/webinar/admin' || path === '/webinar/admin/') {
        return Response.redirect(new URL('/workshops/webinar-admin', request.url), 302);
      }
      if (path === WEBINAR_JS_PATH) {
        return new Response(request.method === 'HEAD' ? null : webinarScript, {
          headers: {
            'Content-Type': 'text/javascript; charset=utf-8',
            'Cache-Control': 'public, max-age=300',
            'X-Content-Type-Options': 'nosniff'
          }
        });
      }
      if (path === KIT_GUIDE_PDF_PATH) {
        return new Response(request.method === 'HEAD' ? null : kitGuidePdf, {
          headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'inline; filename="FLYQ-Drone-Kit-Guide.pdf"',
            'Cache-Control': 'public, max-age=86400',
            'X-Content-Type-Options': 'nosniff'
          }
        });
      }
      if (path === WEBINAR_PATH) {
        let html = mainPage('/about', env.PLATFORM_ORIGIN).replace(
          /<main id="main">[\s\S]*?<\/main>/,
          () => '<main id="main">' + webinarContent() + '</main>'
        );
        html = storeNavigation(html);
        html = applyWebinarNav(html, '/webinar');
        const rawResp = new Response(request.method === 'HEAD' ? null : html, {
          status: 200,
          headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'no-cache',
            'X-Content-Type-Options': 'nosniff',
            'Referrer-Policy': 'strict-origin-when-cross-origin'
          }
        });
        const withSeo = await applySEO(seoRequest, rawResp);
        return applyLogo(request, withSeo);
      }
    }

    let response = await original.fetch.call(original, request, env, ctx);

    // Inject Webinar nav link across HTML pages + Homepage Webinar banner
    if (
      request.method === 'GET' &&
      !request.headers.has('Range') &&
      response.status === 200 &&
      response.headers.get('Content-Type')?.includes('text/html') &&
      !path.startsWith('/learn/')
    ) {
      let html = await response.text();
      html = applyWebinarNav(html, path);
      if (path === '/' && !html.includes('aria-label="Live Drone Bootcamp Webinar"')) {
        html = html.replace('<main id="main">', '<main id="main">' + webinarHomepageBanner());
      }
      const h = new Headers(response.headers);
      for (const k of ['Content-Length', 'Content-Encoding', 'ETag', 'Content-MD5', 'Digest']) {
        h.delete(k);
      }
      response = new Response(html, { status: response.status, headers: h });
    }

    let result = await applySEO(seoRequest, response);
    if (
      isPreview &&
      result.status !== 101 &&
      result.headers.get('Content-Type')?.includes('text/html')
    ) {
      const out = new Response(result.body, result);
      out.headers.append('X-Robots-Tag', 'noindex');
      result = out;
    }
    return applyLogo(request, result);
  }
};
