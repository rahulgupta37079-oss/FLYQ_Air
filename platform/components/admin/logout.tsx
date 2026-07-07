'use client'
export default function AdminLogout() {
  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    window.location.href = '/'
  }
  return (
    <button onClick={logout} className="block w-full text-left text-xs text-danger/80 hover:text-danger px-3 py-1.5">
      ⎋ Lock session
    </button>
  )
}
