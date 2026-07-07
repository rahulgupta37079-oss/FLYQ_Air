'use client'
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ background: '#0A0A0B', color: '#F5F5F7', fontFamily: 'system-ui', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Something went wrong</h1>
          <p style={{ opacity: 0.6, marginTop: '0.75rem' }}>A critical error occurred.</p>
          <button onClick={reset} style={{ marginTop: '1.5rem', padding: '0.75rem 1.5rem', borderRadius: '0.75rem', background: '#00E5FF', color: '#0A0A0B', fontWeight: 700, border: 0, cursor: 'pointer' }}>Try again</button>
        </div>
      </body>
    </html>
  )
}
