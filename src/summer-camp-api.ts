// Summer Camp Registration API Endpoints
import { Hono } from 'hono'

type Bindings = {
  DB: D1Database;
}

const summerCampRouter = new Hono<{ Bindings: Bindings }>()

// Submit registration
summerCampRouter.post('/register', async (c) => {
  try {
    const { DB } = c.env
    
    const data = await c.req.json()
    
    // Validate required fields
    const required = ['student_name', 'age', 'email', 'phone', 'parent_name', 'parent_phone', 'city']
    for (const field of required) {
      if (!data[field]) {
        return c.json({ error: `${field} is required` }, 400)
      }
    }
    
    // Validate age
    const age = parseInt(data.age)
    if (isNaN(age) || age < 8 || age > 18) {
      return c.json({ error: 'Age must be between 8 and 18' }, 400)
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      return c.json({ error: 'Invalid email address' }, 400)
    }
    
    // Validate phone numbers (Indian format)
    const phoneRegex = /^[6-9]\d{9}$/
    if (!phoneRegex.test(data.phone.replace(/[\s\-\+]/g, '').slice(-10))) {
      return c.json({ error: 'Invalid phone number' }, 400)
    }
    
    // Insert into database
    const result = await DB.prepare(`
      INSERT INTO summer_camp_registrations 
      (student_name, age, email, phone, parent_name, parent_phone, city, school_name, previous_experience, special_requirements, batch_preference, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
    `).bind(
      data.student_name,
      age,
      data.email,
      data.phone,
      data.parent_name,
      data.parent_phone,
      data.city,
      data.school_name || null,
      data.previous_experience || 'none',
      data.special_requirements || null,
      data.batch_preference || 'Any'
    ).run()
    
    if (!result.success) {
      throw new Error('Failed to save registration')
    }
    
    return c.json({
      success: true,
      message: 'Registration submitted successfully! We will contact you soon.',
      registration_id: result.meta.last_row_id
    })
    
  } catch (error: any) {
    console.error('Registration error:', error)
    
    // Check for duplicate email
    if (error.message && error.message.includes('UNIQUE constraint failed')) {
      return c.json({ error: 'This email is already registered' }, 400)
    }
    
    return c.json({ error: 'Failed to process registration. Please try again.' }, 500)
  }
})

// Get all registrations (Admin only - with simple auth check)
summerCampRouter.get('/registrations', async (c) => {
  try {
    const { DB } = c.env
    
    // Simple admin check - you should implement proper authentication
    const authHeader = c.req.header('Authorization')
    if (!authHeader || authHeader !== 'Bearer admin-secret-key-2026') {
      return c.json({ error: 'Unauthorized' }, 401)
    }
    
    // Get query parameters for filtering
    const status = c.req.query('status')
    const city = c.req.query('city')
    const limit = parseInt(c.req.query('limit') || '100')
    const offset = parseInt(c.req.query('offset') || '0')
    
    let query = `
      SELECT * FROM summer_camp_registrations
      WHERE 1=1
    `
    const params: any[] = []
    
    if (status) {
      query += ` AND status = ?`
      params.push(status)
    }
    
    if (city) {
      query += ` AND city = ?`
      params.push(city)
    }
    
    query += ` ORDER BY created_at DESC LIMIT ? OFFSET ?`
    params.push(limit, offset)
    
    const result = await DB.prepare(query).bind(...params).all()
    
    // Get total count
    let countQuery = `SELECT COUNT(*) as total FROM summer_camp_registrations WHERE 1=1`
    const countParams: any[] = []
    
    if (status) {
      countQuery += ` AND status = ?`
      countParams.push(status)
    }
    
    if (city) {
      countQuery += ` AND city = ?`
      countParams.push(city)
    }
    
    const countResult = await DB.prepare(countQuery).bind(...countParams).first()
    
    return c.json({
      success: true,
      registrations: result.results,
      total: countResult?.total || 0,
      limit,
      offset
    })
    
  } catch (error: any) {
    console.error('Get registrations error:', error)
    return c.json({ error: 'Failed to fetch registrations' }, 500)
  }
})

// Get stats (Admin only)
summerCampRouter.get('/stats', async (c) => {
  try {
    const { DB } = c.env
    
    // Simple admin check
    const authHeader = c.req.header('Authorization')
    if (!authHeader || authHeader !== 'Bearer admin-secret-key-2026') {
      return c.json({ error: 'Unauthorized' }, 401)
    }
    
    // Get total registrations
    const total = await DB.prepare(`
      SELECT COUNT(*) as count FROM summer_camp_registrations
    `).first()
    
    // Get by status
    const byStatus = await DB.prepare(`
      SELECT status, COUNT(*) as count 
      FROM summer_camp_registrations 
      GROUP BY status
    `).all()
    
    // Get by city
    const byCity = await DB.prepare(`
      SELECT city, COUNT(*) as count 
      FROM summer_camp_registrations 
      GROUP BY city 
      ORDER BY count DESC 
      LIMIT 10
    `).all()
    
    // Get recent registrations
    const recent = await DB.prepare(`
      SELECT * FROM summer_camp_registrations 
      ORDER BY created_at DESC 
      LIMIT 5
    `).all()
    
    return c.json({
      success: true,
      stats: {
        total: total?.count || 0,
        by_status: byStatus.results,
        by_city: byCity.results,
        recent: recent.results
      }
    })
    
  } catch (error: any) {
    console.error('Get stats error:', error)
    return c.json({ error: 'Failed to fetch stats' }, 500)
  }
})

// Update registration status (Admin only)
summerCampRouter.put('/registration/:id/status', async (c) => {
  try {
    const { DB } = c.env
    
    // Simple admin check
    const authHeader = c.req.header('Authorization')
    if (!authHeader || authHeader !== 'Bearer admin-secret-key-2026') {
      return c.json({ error: 'Unauthorized' }, 401)
    }
    
    const id = c.req.param('id')
    const { status } = await c.req.json()
    
    if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
      return c.json({ error: 'Invalid status' }, 400)
    }
    
    const result = await DB.prepare(`
      UPDATE summer_camp_registrations 
      SET status = ? 
      WHERE id = ?
    `).bind(status, id).run()
    
    if (!result.success) {
      throw new Error('Failed to update status')
    }
    
    return c.json({
      success: true,
      message: 'Status updated successfully'
    })
    
  } catch (error: any) {
    console.error('Update status error:', error)
    return c.json({ error: 'Failed to update status' }, 500)
  }
})

export default summerCampRouter
