import { createClient } from "@/utils/supabase/server"
import { FeesClient } from "./FeesClient"

export default async function FeesPage() {
  const supabase = await createClient()
  const { data: fees } = await supabase
    .from("fees")
    .select("*")
    .order("class_name", { ascending: true })
  
  return (
    <div className="p-8 sm:p-12 max-w-5xl mx-auto">
      <h1 className="font-heading text-3xl font-bold text-navy mb-8">Manage Fees Structure</h1>
      <FeesClient initialFees={fees || []} />
    </div>
  )
}
