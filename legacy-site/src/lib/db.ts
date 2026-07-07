import { Context } from 'hono';

// Helper to check if database is available
export function isDatabaseAvailable(c: Context): boolean {
  // @ts-ignore
  return !!c.env?.DB;
}

// Get database instance
export function getDatabase(c: Context): D1Database | null {
  // @ts-ignore
  return c.env?.DB || null;
}

// User operations
export async function createUser(c: Context, email: string, passwordHash: string, name: string) {
  const db = getDatabase(c);
  if (!db) throw new Error('Database not available');

  const result = await db.prepare(`
    INSERT INTO users (email, password_hash, name)
    VALUES (?, ?, ?)
  `).bind(email, passwordHash, name).run();

  return result.meta.last_row_id;
}

export async function getUserByEmail(c: Context, email: string) {
  const db = getDatabase(c);
  if (!db) return null;

  const user = await db.prepare(`
    SELECT * FROM users WHERE email = ?
  `).bind(email).first();

  return user;
}

export async function getUserById(c: Context, id: number) {
  const db = getDatabase(c);
  if (!db) return null;

  const user = await db.prepare(`
    SELECT * FROM users WHERE id = ?
  `).bind(id).first();

  return user;
}

// Order operations
export async function createOrder(c: Context, userId: number, items: any[], total: number) {
  const db = getDatabase(c);
  if (!db) throw new Error('Database not available');

  const orderNumber = 'FLYQ' + Date.now() + Math.random().toString(36).substr(2, 9).toUpperCase();
  
  // Create order
  const orderResult = await db.prepare(`
    INSERT INTO orders (user_id, order_number, subtotal, total, status)
    VALUES (?, ?, ?, ?, 'pending')
  `).bind(userId, orderNumber, total, total).run();

  const orderId = orderResult.meta.last_row_id;

  // Create order items
  for (const item of items) {
    await db.prepare(`
      INSERT INTO order_items (order_id, product_id, quantity, price, product_name)
      VALUES (?, ?, ?, ?, ?)
    `).bind(orderId, item.id, item.quantity, item.price, item.name).run();
  }

  return { orderId, orderNumber };
}

export async function getOrdersByUserId(c: Context, userId: number) {
  const db = getDatabase(c);
  if (!db) return [];

  const orders = await db.prepare(`
    SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC
  `).bind(userId).all();

  return orders.results;
}

export async function getOrderWithItems(c: Context, orderId: number) {
  const db = getDatabase(c);
  if (!db) return null;

  const order = await db.prepare(`
    SELECT * FROM orders WHERE id = ?
  `).bind(orderId).first();

  if (!order) return null;

  const items = await db.prepare(`
    SELECT * FROM order_items WHERE order_id = ?
  `).bind(orderId).all();

  return {
    ...order,
    items: items.results
  };
}

// Update order status
export async function updateOrderStatus(c: Context, orderId: number, status: string, paymentId?: string) {
  const db = getDatabase(c);
  if (!db) throw new Error('Database not available');

  await db.prepare(`
    UPDATE orders 
    SET status = ?, payment_id = ?, payment_status = 'completed', updated_at = datetime('now')
    WHERE id = ?
  `).bind(status, paymentId || '', orderId).run();
}

// Grant curriculum access
export async function grantCurriculumAccess(c: Context, userId: number, productId: number, orderId: number) {
  const db = getDatabase(c);
  if (!db) throw new Error('Database not available');

  await db.prepare(`
    INSERT INTO curriculum_access (user_id, product_id, order_id, access_level)
    VALUES (?, ?, ?, 'full')
  `).bind(userId, productId, orderId).run();
}

// Check curriculum access
export async function hasCurriculumAccess(c: Context, userId: number, productId: number): Promise<boolean> {
  const db = getDatabase(c);
  if (!db) return false;

  const access = await db.prepare(`
    SELECT * FROM curriculum_access 
    WHERE user_id = ? AND product_id = ?
  `).bind(userId, productId).first();

  return !!access;
}
