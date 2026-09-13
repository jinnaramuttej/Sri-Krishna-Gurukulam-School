import { type Metadata } from "next"
import { createClient } from "@/utils/supabase/server"
import { SettingsClient } from "./SettingsClient"

export const metadata: Metadata = {
  title: "Site Settings | Admin",
  description: "Manage global site settings.",
}

export default async function ContactSettingsPage() {
  const supabase = await createClient()
  
  // We only expect one row of settings
  const { data } = await supabase
    .from("school_settings")
    .select("*")
    .limit(1)
    .single()
  
  return (
    <div className="p-8 sm:p-12 max-w-3xl mx-auto">
      <h1 className="font-heading text-3xl font-bold text-navy mb-8">Site Settings</h1>
      <p className="text-ink-soft mb-6">
        Update school details, leadership, and contact information. Changes will automatically reflect on the Header, Footer, and Contact page.
      </p>
      
      {/* If data is null (table is empty but exists), it won't throw an error, it will just pass null */}
      <SettingsClient settings={data || null} />
    </div>
  )
}
