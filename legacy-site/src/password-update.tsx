import { Hono } from 'hono'

type Bindings = {
  DB: D1Database
}

const passwordUpdateRouter = new Hono<{ Bindings: Bindings }>()

// Helper function to generate password (same as in email script)
async function generatePassword(email: string, userId: number): Promise<string> {
  const text = email + userId.toString()
  const encoder = new TextEncoder()
  const data = encoder.encode(text)
  const hashBuffer = await crypto.subtle.digest('MD5', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  return hashHex.substring(0, 12)
}

// Hash password using bcrypt (via bcryptjs which works in Workers)
async function hashPassword(password: string): Promise<string> {
  // Using simple SHA-256 for now since bcrypt doesn't work in Workers
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  // Prepend bcrypt-like format for compatibility
  return '$2b$10$' + hashHex
}

// Update all user passwords to match emailed credentials
passwordUpdateRouter.post('/update-all-passwords', async (c) => {
  try {
    const { DB } = c.env
    
    // Get all non-admin users
    const users = await DB.prepare(`
      SELECT id, email FROM users WHERE is_admin = 0
    `).all()
    
    if (!users.results || users.results.length === 0) {
      return c.json({ error: 'No users found' }, 404)
    }
    
    const updates: any[] = []
    
    // Update each user's password
    for (const user of users.results) {
      const plainPassword = generatePassword(user.email as string, user.id as number)
      const hashedPassword = hashSync(plainPassword, 10)
      
      await DB.prepare(`
        UPDATE users SET password_hash = ? WHERE id = ?
      `).bind(hashedPassword, user.id).run()
      
      updates.push({
        id: user.id,
        email: user.email,
        password: plainPassword
      })
    }
    
    return c.json({
      success: true,
      message: 'All passwords updated successfully',
      count: updates.length,
      users: updates
    })
    
  } catch (error: any) {
    return c.json({ 
      error: 'Failed to update passwords', 
      details: error.message 
    }, 500)
  }
})

// Get password for a specific user (for testing)
passwordUpdateRouter.get('/get-password/:email', async (c) => {
  try {
    const email = c.req.param('email')
    const { DB } = c.env
    
    const user = await DB.prepare(`
      SELECT id, email, name FROM users WHERE email = ?
    `).bind(email).first()
    
    if (!user) {
      return c.json({ error: 'User not found' }, 404)
    }
    
    const password = generatePassword(user.email as string, user.id as number)
    
    return c.json({
      id: user.id,
      name: user.name,
      email: user.email,
      password: password
    })
    
  } catch (error: any) {
    return c.json({ 
      error: 'Failed to get password', 
      details: error.message 
    }, 500)
  }
})

export default passwordUpdateRouter
