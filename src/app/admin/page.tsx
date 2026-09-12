export default function AdminDashboard() {
  return (
    <div className="p-8 sm:p-12 max-w-5xl mx-auto">
      <div className="card p-8 sm:p-12 border-brand/20 bg-white">
        <h1 className="font-heading text-3xl font-bold text-navy mb-4">Welcome to the Admin Panel</h1>
        <p className="text-ink-soft leading-relaxed max-w-2xl">
          You are successfully logged in. Use the navigation bar above to manage the school's Fees structure, Transport routes, and Photo Gallery.
        </p>
      </div>
    </div>
  )
}
