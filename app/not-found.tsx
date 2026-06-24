import Link from 'next/link'

export const metadata = { title: '404 — Page not found' }

export default function NotFound() {
  return (
    <main className="min-h-screen grid-bg flex items-center justify-center px-5">
      <div className="text-center max-w-lg">
        <p className="text-8xl font-extrabold grad-cyber">404</p>
        <h1 className="text-2xl font-bold mt-4">Lost the signal.</h1>
        <p className="text-premium/55 mt-3">This page drifted out of range. Let&rsquo;s get you back to a known waypoint.</p>
        <div className="flex flex-wrap gap-3 justify-center mt-8">
          <Link href="/" className="px-6 py-3 rounded-xl btn-cyber font-bold">Back to home</Link>
          <Link href="/products" className="px-6 py-3 rounded-xl glass font-semibold">Browse products</Link>
        </div>
      </div>
    </main>
  )
}
