import { Hono } from 'hono'

type Bindings = {
  DB: D1Database
}

const quotationsRouter = new Hono<{ Bindings: Bindings }>()

// List quotations
quotationsRouter.get('/', async (c) => {
  const status = c.req.query('status') || 'all'
  const page = parseInt(c.req.query('page') || '1')
  const limit = 20
  const offset = (page - 1) * limit

  let query = 'SELECT * FROM quotations'
  let countQuery = 'SELECT COUNT(*) as total FROM quotations'
  
  if (status !== 'all') {
    query += ' WHERE status = ?'
    countQuery += ' WHERE status = ?'
  }
  
  query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?'

  const quotesPromise = status !== 'all' 
    ? c.env.DB.prepare(query).bind(status, limit, offset).all()
    : c.env.DB.prepare(query).bind(limit, offset).all()

  const countPromise = status !== 'all'
    ? c.env.DB.prepare(countQuery).bind(status).first()
    : c.env.DB.prepare(countQuery).first()

  const [quotes, count] = await Promise.all([quotesPromise, countPromise])
  const totalPages = Math.ceil((count?.total || 0) / limit)

  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Quotations | FLYQ Admin</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    </head>
    <body class="bg-gray-50">
        ${renderAdminSidebar('quotations')}
        
        <div class="ml-64 p-8">
            <div class="mb-8">
                <h1 class="text-3xl font-bold text-gray-800">Quotations</h1>
                <p class="text-gray-600 mt-2">Manage quote requests and proposals</p>
            </div>

            <!-- Filter Tabs -->
            <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6">
                <div class="flex space-x-2">
                    ${['all', 'pending', 'reviewed', 'quoted', 'accepted', 'rejected', 'expired'].map(s => `
                        <a href="/admin/quotations?status=${s}" 
                           class="px-4 py-2 rounded-lg ${status === s ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} transition">
                            ${s.charAt(0).toUpperCase() + s.slice(1)}
                        </a>
                    `).join('')}
                </div>
            </div>

            <!-- Quotations Table -->
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table class="w-full">
                    <thead class="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Quote #</th>
                            <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Customer</th>
                            <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Project</th>
                            <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Budget</th>
                            <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Timeline</th>
                            <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                            <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                        ${quotes.results?.length ? quotes.results.map((quote: any) => `
                            <tr class="hover:bg-gray-50">
                                <td class="px-6 py-4">
                                    <span class="font-mono text-sm font-semibold text-gray-800">${quote.quote_number}</span>
                                    <p class="text-xs text-gray-500 mt-1">${new Date(quote.created_at).toLocaleDateString()}</p>
                                </td>
                                <td class="px-6 py-4">
                                    <div>
                                        <p class="font-medium text-gray-800">${quote.name}</p>
                                        <p class="text-sm text-gray-500">${quote.email}</p>
                                        ${quote.company ? `<p class="text-xs text-gray-400">${quote.company}</p>` : ''}
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">${formatProjectType(quote.project_type)}</span>
                                    <p class="text-sm text-gray-600 mt-1">${quote.description.substring(0, 50)}...</p>
                                </td>
                                <td class="px-6 py-4 text-sm text-gray-600">
                                    ${formatBudgetRange(quote.budget_range)}
                                </td>
                                <td class="px-6 py-4 text-sm text-gray-600">
                                    ${formatTimeline(quote.timeline)}
                                </td>
                                <td class="px-6 py-4">
                                    ${getQuoteStatusBadge(quote.status)}
                                </td>
                                <td class="px-6 py-4">
                                    <div class="flex space-x-2">
                                        <a href="/admin/quotations/${quote.id}" class="text-purple-600 hover:text-purple-800">
                                            <i class="fas fa-eye"></i>
                                        </a>
                                        <button onclick="respondToQuote(${quote.id})" class="text-green-600 hover:text-green-800">
                                            <i class="fas fa-reply"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        `).join('') : `
                            <tr>
                                <td colspan="7" class="px-6 py-12 text-center text-gray-500">
                                    <i class="fas fa-file-invoice text-4xl mb-4 block"></i>
                                    <p>No quotation requests found</p>
                                </td>
                            </tr>
                        `}
                    </tbody>
                </table>
            </div>

            <!-- Pagination -->
            ${totalPages > 1 ? `
            <div class="mt-6 flex justify-center space-x-2">
                ${page > 1 ? `<a href="?status=${status}&page=${page - 1}" class="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Previous</a>` : ''}
                ${page < totalPages ? `<a href="?status=${status}&page=${page + 1}" class="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Next</a>` : ''}
            </div>
            ` : ''}
        </div>

        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script>
            function respondToQuote(quoteId) {
                window.location.href = \`/admin/quotations/\${quoteId}/respond\`
            }
        </script>
    </body>
    </html>
  `)
})

// Helper functions
function formatProjectType(type: string) {
  const types: any = {
    'aerial_survey': 'Aerial Survey',
    'inspection': 'Inspection',
    'photography': 'Photography',
    'custom': 'Custom'
  }
  return types[type] || type
}

function formatBudgetRange(range: string) {
  const ranges: any = {
    'under_5k': 'Under $5,000',
    '5k_10k': '$5,000 - $10,000',
    '10k_25k': '$10,000 - $25,000',
    '25k_50k': '$25,000 - $50,000',
    'above_50k': 'Above $50,000'
  }
  return ranges[range] || range
}

function formatTimeline(timeline: string) {
  const timelines: any = {
    'urgent': 'Urgent',
    '1_week': '1 Week',
    '1_month': '1 Month',
    '3_months': '3 Months',
    'flexible': 'Flexible'
  }
  return timelines[timeline] || timeline
}

function getQuoteStatusBadge(status: string) {
  const colors: any = {
    'pending': 'bg-yellow-100 text-yellow-800',
    'reviewed': 'bg-blue-100 text-blue-800',
    'quoted': 'bg-purple-100 text-purple-800',
    'accepted': 'bg-green-100 text-green-800',
    'rejected': 'bg-red-100 text-red-800',
    'expired': 'bg-gray-100 text-gray-800'
  }
  
  return `<span class="px-3 py-1 rounded-full text-xs font-semibold ${colors[status] || 'bg-gray-100 text-gray-800'}">${status.charAt(0).toUpperCase() + status.slice(1)}</span>`
}

function renderAdminSidebar(activePage: string) {
  return '<div class="fixed left-0 top-0 h-full w-64 bg-gray-900"></div>'
}

export default quotationsRouter
