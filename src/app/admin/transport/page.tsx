import { createClient } from "@/utils/supabase/server"
import { TransportClient } from "./TransportClient"

export default async function TransportPage() {
  const supabase = await createClient()
  const { data: routes } = await supabase
    .from("transport_routes")
    .select("*")
    .order("route_name", { ascending: true }) 
  
  return (
    <div className="p-8 sm:p-12 max-w-5xl mx-auto">
      <h1 className="font-heading text-3xl font-bold text-navy mb-8">Manage Transport Routes</h1>
      <TransportClient initialRoutes={routes || []} />
    </div>
  )
}
