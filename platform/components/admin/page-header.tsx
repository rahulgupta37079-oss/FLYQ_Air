export default function AdminHeader({ title, sub, action }: { title: string; sub?: string; action?: React.ReactNode }) {
  return (
    <header className="flex items-start justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-extrabold">{title}</h1>
        {sub && <p className="text-premium/50 text-sm mt-1">{sub}</p>}
      </div>
      {action}
    </header>
  )
}
