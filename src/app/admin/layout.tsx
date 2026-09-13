import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  return (
    <div className="min-h-screen bg-cream-soft flex flex-col relative z-20">
      {user && (
        <header className="bg-navy text-white px-6 py-4 flex justify-between items-center shadow-md sticky top-0">
          <div className="flex gap-8 items-center">
            <span className="font-heading font-bold text-xl text-gold tracking-wide">Admin Panel</span>
            <nav className="text-sm font-medium flex gap-6 mt-1">
              <Link href="/admin" className="text-white/80 hover:text-gold transition">Dashboard</Link>
              <Link href="/admin/fees" className="text-white/80 hover:text-gold transition">Fees</Link>
              <Link href="/admin/transport" className="text-white/80 hover:text-gold transition">Transport</Link>
              <Link href="/admin/gallery" className="text-white/80 hover:text-gold transition">Gallery</Link>
              <Link href="/admin/contact-settings" className="text-white/80 hover:text-gold transition">Contact Details</Link>
            </nav>
          </div>
          <form action={async () => {
            "use server"
            const supabase = await createClient()
            await supabase.auth.signOut()
            redirect("/admin/login")
          }}>
            <button className="text-xs font-bold uppercase tracking-wider border border-white/20 px-4 py-2 rounded hover:bg-white/10 hover:text-gold transition">
              Sign Out
            </button>
          </form>
        </header>
      )}
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}
