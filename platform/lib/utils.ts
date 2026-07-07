import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const inr = (n: number) =>
  '₹' + Number(n || 0).toLocaleString('en-IN')

export const SITE = {
  name: 'FLYQ',
  brand: 'FLYQ by Passion3D World',
  tagline: 'Engineering Mastery. Forged in India.',
  sub: 'Indigenous programmable drone platform powering the next million pilots, makers and innovators.',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || '+919137361474',
  phone: '+91 9137361474',
  email: 'info@passion3dworld.com',
  supportEmail: 'support@flyqdrones.com',
  ordersEmail: 'orders@flyqdrones.com',
  store: 'https://passion3dworld.com',
  github: 'https://github.com/passion3d/flyq-air',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://flyqdrone.in',
  adminSlug: process.env.NEXT_PUBLIC_ADMIN_SLUG || 'control-tower-x9k2',
}

export const waLink = (msg = "Hi FLYQ, I'd like to know more.") =>
  `https://wa.me/${SITE.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(msg)}`
