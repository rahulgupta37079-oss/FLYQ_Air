// Enhanced Analytics Tracking Library
import type { Context } from 'hono';

// Types
export interface ConversionEvent {
  user_id?: number;
  session_id: string;
  event_type: 'product_view' | 'add_to_cart' | 'remove_from_cart' | 'checkout_start' | 'purchase' | 'signup' | 'login' | 'wishlist_add';
  event_data?: string; // JSON string
  product_id?: number;
  order_id?: number;
  revenue?: number;
  ip_address?: string;
  user_agent?: string;
  referrer?: string;
}

export interface UserSession {
  session_id: string;
  user_id?: number;
  ip_address?: string;
  user_agent?: string;
  device_type?: 'mobile' | 'tablet' | 'desktop';
  browser?: string;
  os?: string;
  referrer?: string;
  landing_page?: string;
}

export interface PageView {
  session_id: string;
  page_url: string;
  page_title?: string;
  referrer?: string;
  sequence_number: number;
}

// Helper: Generate or retrieve session ID from cookie
export function getSessionId(c: Context): string {
  const existingSession = c.req.header('cookie')?.match(/session_id=([^;]+)/)?.[1];
  if (existingSession) {
    return existingSession;
  }
  
  // Generate new session ID
  const sessionId = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
  c.header('Set-Cookie', `session_id=${sessionId}; Path=/; Max-Age=${60 * 60 * 24 * 30}; SameSite=Lax`);
  return sessionId;
}

// Helper: Parse user agent to extract device info
export function parseUserAgent(userAgent: string): {
  device_type: 'mobile' | 'tablet' | 'desktop';
  browser: string;
  os: string;
} {
  const ua = userAgent.toLowerCase();
  
  // Device type
  let device_type: 'mobile' | 'tablet' | 'desktop' = 'desktop';
  if (ua.includes('mobile') || ua.includes('android')) device_type = 'mobile';
  if (ua.includes('tablet') || ua.includes('ipad')) device_type = 'tablet';
  
  // Browser
  let browser = 'Unknown';
  if (ua.includes('chrome') && !ua.includes('edg')) browser = 'Chrome';
  else if (ua.includes('safari') && !ua.includes('chrome')) browser = 'Safari';
  else if (ua.includes('firefox')) browser = 'Firefox';
  else if (ua.includes('edg')) browser = 'Edge';
  else if (ua.includes('opera') || ua.includes('opr')) browser = 'Opera';
  
  // OS
  let os = 'Unknown';
  if (ua.includes('windows')) os = 'Windows';
  else if (ua.includes('mac')) os = 'macOS';
  else if (ua.includes('linux')) os = 'Linux';
  else if (ua.includes('android')) os = 'Android';
  else if (ua.includes('ios') || ua.includes('iphone') || ua.includes('ipad')) os = 'iOS';
  
  return { device_type, browser, os };
}

// Helper: Parse referrer to extract traffic source
export function parseTrafficSource(referrer: string): {
  source_type: 'direct' | 'search' | 'social' | 'referral' | 'email' | 'ads';
  source_name: string;
} {
  if (!referrer || referrer === '') {
    return { source_type: 'direct', source_name: 'direct' };
  }
  
  const ref = referrer.toLowerCase();
  
  // Search engines
  if (ref.includes('google.')) return { source_type: 'search', source_name: 'Google' };
  if (ref.includes('bing.')) return { source_type: 'search', source_name: 'Bing' };
  if (ref.includes('yahoo.')) return { source_type: 'search', source_name: 'Yahoo' };
  if (ref.includes('duckduckgo.')) return { source_type: 'search', source_name: 'DuckDuckGo' };
  
  // Social media
  if (ref.includes('facebook.') || ref.includes('fb.')) return { source_type: 'social', source_name: 'Facebook' };
  if (ref.includes('twitter.') || ref.includes('t.co')) return { source_type: 'social', source_name: 'Twitter' };
  if (ref.includes('instagram.')) return { source_type: 'social', source_name: 'Instagram' };
  if (ref.includes('linkedin.')) return { source_type: 'social', source_name: 'LinkedIn' };
  if (ref.includes('youtube.')) return { source_type: 'social', source_name: 'YouTube' };
  if (ref.includes('reddit.')) return { source_type: 'social', source_name: 'Reddit' };
  
  // Email
  if (ref.includes('mail.') || ref.includes('email')) return { source_type: 'email', source_name: 'Email' };
  
  // Ads
  if (ref.includes('ads.') || ref.includes('adwords')) return { source_type: 'ads', source_name: 'Ads' };
  
  // Referral (extract domain)
  try {
    const domain = new URL(referrer).hostname;
    return { source_type: 'referral', source_name: domain };
  } catch {
    return { source_type: 'referral', source_name: 'Unknown' };
  }
}

// Track conversion event
export async function trackConversion(
  db: D1Database,
  event: ConversionEvent
): Promise<void> {
  try {
    await db.prepare(`
      INSERT INTO conversion_events 
      (user_id, session_id, event_type, event_data, product_id, order_id, revenue, ip_address, user_agent, referrer)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      event.user_id || null,
      event.session_id,
      event.event_type,
      event.event_data || null,
      event.product_id || null,
      event.order_id || null,
      event.revenue || 0,
      event.ip_address || null,
      event.user_agent || null,
      event.referrer || null
    ).run();
    
    // Update product analytics if product-related
    if (event.product_id && (event.event_type === 'product_view' || event.event_type === 'add_to_cart' || event.event_type === 'purchase')) {
      await updateProductAnalytics(db, event.product_id, event.event_type, event.revenue || 0);
    }
  } catch (error) {
    console.error('Error tracking conversion:', error);
  }
}

// Update product analytics
async function updateProductAnalytics(
  db: D1Database,
  product_id: number,
  event_type: string,
  revenue: number
): Promise<void> {
  const today = new Date().toISOString().split('T')[0];
  
  const column = event_type === 'product_view' ? 'views' : 
                event_type === 'add_to_cart' ? 'add_to_cart' : 'purchases';
  
  await db.prepare(`
    INSERT INTO product_analytics (product_id, date, ${column}, revenue)
    VALUES (?, ?, 1, ?)
    ON CONFLICT(product_id, date) DO UPDATE SET
      ${column} = ${column} + 1,
      revenue = revenue + ?
  `).bind(product_id, today, revenue, revenue).run();
}

// Initialize or update user session
export async function trackSession(
  db: D1Database,
  session: UserSession
): Promise<void> {
  try {
    const { device_type, browser, os } = parseUserAgent(session.user_agent || '');
    const { source_type, source_name } = parseTrafficSource(session.referrer || '');
    
    // Check if session exists
    const existing = await db.prepare('SELECT id FROM user_sessions WHERE session_id = ?')
      .bind(session.session_id)
      .first();
    
    if (existing) {
      // Update existing session
      await db.prepare(`
        UPDATE user_sessions 
        SET last_activity = CURRENT_TIMESTAMP, page_count = page_count + 1
        WHERE session_id = ?
      `).bind(session.session_id).run();
    } else {
      // Create new session
      await db.prepare(`
        INSERT INTO user_sessions 
        (session_id, user_id, ip_address, user_agent, device_type, browser, os, referrer, landing_page)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(
        session.session_id,
        session.user_id || null,
        session.ip_address || null,
        session.user_agent || null,
        device_type,
        browser,
        os,
        session.referrer || null,
        session.landing_page || null
      ).run();
      
      // Track traffic source
      await db.prepare(`
        INSERT INTO traffic_sources (session_id, source_type, source_name)
        VALUES (?, ?, ?)
      `).bind(session.session_id, source_type, source_name).run();
    }
  } catch (error) {
    console.error('Error tracking session:', error);
  }
}

// Track page view
export async function trackPageView(
  db: D1Database,
  pageView: PageView
): Promise<void> {
  try {
    await db.prepare(`
      INSERT INTO session_page_views (session_id, page_url, page_title, referrer, sequence_number)
      VALUES (?, ?, ?, ?, ?)
    `).bind(
      pageView.session_id,
      pageView.page_url,
      pageView.page_title || null,
      pageView.referrer || null,
      pageView.sequence_number
    ).run();
    
    // Update popular pages
    await db.prepare(`
      INSERT INTO popular_pages (page_url, page_title, visit_count, unique_visitors)
      VALUES (?, ?, 1, 1)
      ON CONFLICT(page_url) DO UPDATE SET
        visit_count = visit_count + 1,
        last_updated = CURRENT_TIMESTAMP
    `).bind(pageView.page_url, pageView.page_title || null).run();
  } catch (error) {
    console.error('Error tracking page view:', error);
  }
}

// Track funnel stage
export async function trackFunnelStage(
  db: D1Database,
  session_id: string,
  stage_name: 'landing' | 'product_view' | 'cart' | 'checkout' | 'purchase',
  stage_number: number
): Promise<void> {
  try {
    await db.prepare(`
      INSERT INTO funnel_stages (session_id, stage_name, stage_number, completed, completed_at)
      VALUES (?, ?, ?, 1, CURRENT_TIMESTAMP)
    `).bind(session_id, stage_name, stage_number).run();
    
    // If purchase, mark session as converted
    if (stage_name === 'purchase') {
      await db.prepare(`
        UPDATE user_sessions SET converted = 1 WHERE session_id = ?
      `).bind(session_id).run();
    }
  } catch (error) {
    console.error('Error tracking funnel stage:', error);
  }
}

// Get conversion funnel data
export async function getConversionFunnel(db: D1Database): Promise<any> {
  try {
    const funnel = await db.prepare(`
      SELECT 
        stage_name,
        COUNT(DISTINCT session_id) as sessions,
        COUNT(CASE WHEN completed = 1 THEN 1 END) as completed
      FROM funnel_stages
      GROUP BY stage_name, stage_number
      ORDER BY stage_number
    `).all();
    
    return funnel.results;
  } catch (error) {
    console.error('Error getting funnel data:', error);
    return [];
  }
}

// Get product performance
export async function getProductPerformance(db: D1Database, days: number = 30): Promise<any> {
  try {
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    const performance = await db.prepare(`
      SELECT 
        p.id,
        p.name,
        SUM(pa.views) as total_views,
        SUM(pa.add_to_cart) as total_add_to_cart,
        SUM(pa.purchases) as total_purchases,
        SUM(pa.revenue) as total_revenue,
        ROUND(CAST(SUM(pa.purchases) AS FLOAT) / NULLIF(SUM(pa.views), 0) * 100, 2) as conversion_rate
      FROM products p
      LEFT JOIN product_analytics pa ON p.id = pa.product_id
      WHERE pa.date >= ?
      GROUP BY p.id, p.name
      ORDER BY total_revenue DESC
    `).bind(since).all();
    
    return performance.results;
  } catch (error) {
    console.error('Error getting product performance:', error);
    return [];
  }
}

// Get user journey for a session
export async function getUserJourney(db: D1Database, session_id: string): Promise<any> {
  try {
    const journey = await db.prepare(`
      SELECT page_url, page_title, time_spent_seconds, sequence_number, created_at
      FROM session_page_views
      WHERE session_id = ?
      ORDER BY sequence_number
    `).bind(session_id).all();
    
    return journey.results;
  } catch (error) {
    console.error('Error getting user journey:', error);
    return [];
  }
}

// Get traffic sources breakdown
export async function getTrafficSources(db: D1Database, days: number = 30): Promise<any> {
  try {
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
    
    const sources = await db.prepare(`
      SELECT 
        ts.source_type,
        ts.source_name,
        COUNT(DISTINCT ts.session_id) as sessions,
        COUNT(DISTINCT CASE WHEN us.converted = 1 THEN us.session_id END) as conversions,
        ROUND(CAST(COUNT(DISTINCT CASE WHEN us.converted = 1 THEN us.session_id END) AS FLOAT) / 
              NULLIF(COUNT(DISTINCT ts.session_id), 0) * 100, 2) as conversion_rate
      FROM traffic_sources ts
      LEFT JOIN user_sessions us ON ts.session_id = us.session_id
      WHERE ts.created_at >= ?
      GROUP BY ts.source_type, ts.source_name
      ORDER BY sessions DESC
    `).bind(since).all();
    
    return sources.results;
  } catch (error) {
    console.error('Error getting traffic sources:', error);
    return [];
  }
}
