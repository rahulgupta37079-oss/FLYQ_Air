import type { Field } from '@/components/admin/crud-form'

// Field definitions + coercion hints per table, shared by new/edit pages.

export const PRODUCT_FIELDS: Field[] = [
  { name: 'name', label: 'Name', full: true },
  { name: 'slug', label: 'Slug' },
  { name: 'category_id', label: 'Category ID', help: 'UUID from categories' },
  { name: 'price_inr', label: 'Price (₹)', type: 'number' },
  { name: 'mrp_inr', label: 'MRP (₹)', type: 'number' },
  { name: 'stock', label: 'Stock', type: 'number' },
  { name: 'short_desc', label: 'Short description', type: 'textarea' },
  { name: 'long_desc', label: 'Long description', type: 'textarea' },
  { name: 'features', label: 'Features (one per line)', type: 'array' },
  { name: 'in_the_box', label: 'In the box (one per line)', type: 'array' },
  { name: 'specs', label: 'Specs (JSON)', type: 'json' },
  { name: 'datasheet_url', label: 'Datasheet URL' },
  { name: 'is_featured', label: 'Featured', type: 'checkbox', help: 'Show on homepage' },
  { name: 'is_published', label: 'Published', type: 'checkbox', help: 'Visible on site' },
]
export const PRODUCT_HINTS = { jsonFields: ['specs'], arrayFields: ['features', 'in_the_box'], numberFields: ['price_inr', 'mrp_inr', 'stock'], boolFields: ['is_featured', 'is_published'] }

export const WORKSHOP_FIELDS: Field[] = [
  { name: 'title', label: 'Title', full: true },
  { name: 'slug', label: 'Slug' },
  { name: 'event_date', label: 'Date', type: 'date' },
  { name: 'city', label: 'City' },
  { name: 'venue', label: 'Venue' },
  { name: 'level', label: 'Level', type: 'select', options: ['Beginner', 'Intermediate', 'Advanced', 'School', 'Educators', 'Professional'] },
  { name: 'type', label: 'Type', type: 'select', options: ['School', 'College', 'Public', 'Corporate', 'Online'] },
  { name: 'seats', label: 'Seats', type: 'number' },
  { name: 'fee_inr', label: 'Fee (₹)', type: 'number' },
  { name: 'instructor_name', label: 'Instructor' },
  { name: 'instructor_bio', label: 'Instructor bio', type: 'textarea' },
  { name: 'prerequisites', label: 'Prerequisites', type: 'textarea' },
  { name: 'what_youll_build', label: "What you'll build", type: 'textarea' },
  { name: 'poster_url', label: 'Poster URL' },
  { name: 'map_embed', label: 'Map embed URL' },
  { name: 'published', label: 'Published', type: 'checkbox' },
]
export const WORKSHOP_HINTS = { numberFields: ['seats', 'fee_inr'], boolFields: ['published'] }

export const BLOG_FIELDS: Field[] = [
  { name: 'title', label: 'Title', full: true },
  { name: 'slug', label: 'Slug' },
  { name: 'author', label: 'Author' },
  { name: 'cover_url', label: 'Cover URL' },
  { name: 'excerpt', label: 'Excerpt', type: 'textarea' },
  { name: 'body_mdx', label: 'Body (MDX/Markdown)', type: 'textarea' },
  { name: 'published', label: 'Published', type: 'checkbox' },
]
export const BLOG_HINTS = { boolFields: ['published'] }

export const FAQ_FIELDS: Field[] = [
  { name: 'category', label: 'Category' },
  { name: 'sort_order', label: 'Sort order', type: 'number' },
  { name: 'question', label: 'Question', full: true },
  { name: 'answer', label: 'Answer', type: 'textarea' },
  { name: 'published', label: 'Published', type: 'checkbox' },
]
export const FAQ_HINTS = { numberFields: ['sort_order'], boolFields: ['published'] }

export const TESTIMONIAL_FIELDS: Field[] = [
  { name: 'name', label: 'Name' },
  { name: 'role', label: 'Role' },
  { name: 'city', label: 'City' },
  { name: 'segment', label: 'Segment', type: 'select', options: ['farmer', 'student', 'educator', 'fpv', 'enterprise', 'researcher', 'dealer'] },
  { name: 'message', label: 'Message', type: 'textarea' },
  { name: 'avatar_url', label: 'Avatar URL' },
  { name: 'attachment_url', label: 'Attachment URL' },
  { name: 'voice_url', label: 'Voice note URL' },
  { name: 'voice_seconds', label: 'Voice seconds', type: 'number' },
  { name: 'screenshot_url', label: 'Screenshot URL' },
  { name: 'timestamp_label', label: 'Timestamp label', placeholder: 'Today 14:32' },
  { name: 'sort_order', label: 'Sort order', type: 'number' },
  { name: 'approved', label: 'Approved', type: 'checkbox' },
]
export const TESTIMONIAL_HINTS = { numberFields: ['voice_seconds', 'sort_order'], boolFields: ['approved'] }

export const BANNER_FIELDS: Field[] = [
  { name: 'title', label: 'Title', full: true },
  { name: 'subtitle', label: 'Subtitle', type: 'textarea' },
  { name: 'image_url', label: 'Image URL' },
  { name: 'cta_label', label: 'CTA label' },
  { name: 'cta_href', label: 'CTA link' },
  { name: 'sort_order', label: 'Sort order', type: 'number' },
  { name: 'active', label: 'Active', type: 'checkbox' },
]
export const BANNER_HINTS = { numberFields: ['sort_order'], boolFields: ['active'] }

export const COUPON_FIELDS: Field[] = [
  { name: 'code', label: 'Code' },
  { name: 'kind', label: 'Kind', type: 'select', options: ['percent', 'flat'] },
  { name: 'value', label: 'Value', type: 'number', help: 'Percent (0-100) or flat ₹' },
  { name: 'expires_at', label: 'Expires', type: 'date' },
  { name: 'active', label: 'Active', type: 'checkbox' },
]
export const COUPON_HINTS = { numberFields: ['value'], boolFields: ['active'] }

export const PAGE_FIELDS: Field[] = [
  { name: 'slug', label: 'Slug', help: 'terms | privacy | refund | shipping | warranty' },
  { name: 'title', label: 'Title' },
  { name: 'body_mdx', label: 'Body (MDX/Markdown)', type: 'textarea' },
]
export const PAGE_HINTS = {}

export const MEDIA_FIELDS: Field[] = [
  { name: 'url', label: 'URL', full: true },
  { name: 'kind', label: 'Kind', type: 'select', options: ['image', 'video', 'document'] },
  { name: 'alt', label: 'Alt text' },
]
export const MEDIA_HINTS = {}

export const FAQ_TABLE = 'faqs'
