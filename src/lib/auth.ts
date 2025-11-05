import bcrypt from 'bcryptjs';
import { Context } from 'hono';
import { getCookie, setCookie, deleteCookie } from 'hono/cookie';

// Types
export interface User {
  id: number;
  email: string;
  name: string;
  created_at: string;
}

export interface Session {
  id: string;
  user_id: number;
  expires_at: string;
}

// Password hashing
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// Session management
export function generateSessionId(): string {
  return crypto.randomUUID();
}

export function getSessionExpiry(): string {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 7); // 7 days
  return expiry.toISOString();
}

// Get current user from session
export async function getCurrentUser(c: Context): Promise<User | null> {
  const sessionId = getCookie(c, 'flyq_session');
  if (!sessionId) return null;

  try {
    // @ts-ignore - DB binding
    const db = c.env?.DB;
    if (!db) {
      console.warn('Database not available');
      return null;
    }

    const result = await db.prepare(`
      SELECT u.* FROM users u
      INNER JOIN sessions s ON s.user_id = u.id
      WHERE s.id = ? AND s.expires_at > datetime('now')
    `).bind(sessionId).first();

    return result as User | null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

// Create session
export async function createSession(c: Context, userId: number): Promise<string> {
  const sessionId = generateSessionId();
  const expiresAt = getSessionExpiry();

  try {
    // @ts-ignore - DB binding
    const db = c.env?.DB;
    if (db) {
      await db.prepare(`
        INSERT INTO sessions (id, user_id, expires_at)
        VALUES (?, ?, ?)
      `).bind(sessionId, userId, expiresAt).run();
    }

    // Set cookie
    // secure: false for local dev (HTTP), true for production (HTTPS)
    const isProduction = c.req.url.startsWith('https://');
    setCookie(c, 'flyq_session', sessionId, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'Lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return sessionId;
  } catch (error) {
    console.error('Error creating session:', error);
    throw error;
  }
}

// Delete session
export async function deleteSession(c: Context): Promise<void> {
  const sessionId = getCookie(c, 'flyq_session');
  if (!sessionId) return;

  try {
    // @ts-ignore - DB binding
    const db = c.env?.DB;
    if (db) {
      await db.prepare('DELETE FROM sessions WHERE id = ?').bind(sessionId).run();
    }

    deleteCookie(c, 'flyq_session');
  } catch (error) {
    console.error('Error deleting session:', error);
  }
}

// Middleware to require authentication
export async function requireAuth(c: Context, next: () => Promise<void>) {
  const user = await getCurrentUser(c);
  if (!user) {
    return c.redirect('/login?redirect=' + encodeURIComponent(c.req.url));
  }
  // @ts-ignore
  c.set('user', user);
  await next();
}

// Clean up expired sessions (run periodically)
export async function cleanExpiredSessions(c: Context): Promise<void> {
  try {
    // @ts-ignore - DB binding
    const db = c.env?.DB;
    if (db) {
      await db.prepare(`
        DELETE FROM sessions WHERE expires_at < datetime('now')
      `).run();
    }
  } catch (error) {
    console.error('Error cleaning expired sessions:', error);
  }
}
