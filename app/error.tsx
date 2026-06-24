'use client'
import Link from 'next/link'
import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error) }, [error])
  return (
    <main className="min-h-screen grid-bg flex items-center justify-center px-5">
      <div className="text-center max-w-lg">
        <p className="text-8xl font-extrabold text-danger">500</p>
        <h1 className="text-2xl font-bold mt-4">Telemetry fault.</h1>
        <p className="text-premium/55 mt-3">Something went wrong on our end. Our team has been notified. You can retry or head home.</p>
        <div className="flex flex-wrap gap-3 justify-center mt-8">
          <button onClick={reset} className="px-6 py-3 rounded-xl btn-cyber font-bold">Try again</button>
          <Link href="/" className="px-6 py-3 rounded-xl glass font-semibold">Back to home</Link>
        </div>
        {error?.digest && <p className="text-premium/30 text-xs mt-6">Ref: {error.digest}</p>}
      </div>
    </main>
  )
}
