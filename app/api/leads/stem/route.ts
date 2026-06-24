import { NextRequest } from 'next/server'
import { handleLead } from '@/lib/server/lead-handler'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  return handleLead(req, { table: 'stem_lab_leads', label: 'STEM Lab enquiry', requiredFields: ['email'], recaptchaAction: 'stem' })
}
