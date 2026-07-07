import { NextRequest } from 'next/server'
import { handleLead } from '@/lib/server/lead-handler'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  return handleLead(req, { table: 'dealer_leads', label: 'Dealer application', requiredFields: ['company'], recaptchaAction: 'dealer' })
}
