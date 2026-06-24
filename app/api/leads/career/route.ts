import { NextRequest } from 'next/server'
import { handleLead } from '@/lib/server/lead-handler'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  return handleLead(req, { table: 'contact_messages', label: 'Career application', requiredFields: ['email'], recaptchaAction: 'career' })
}
