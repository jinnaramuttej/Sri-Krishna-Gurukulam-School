"use server"

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"

export async function addRoute(formData: FormData) {
  const supabase = await createClient()
  
  const route_name = formData.get("route_name") as string
  const area_covered = formData.get("area_covered") as string
  const notes = formData.get("notes") as string
  
  await supabase.from("transport_routes").insert({ route_name, area_covered, notes })
  revalidatePath("/admin/transport")
  revalidatePath("/facilities")
}

export async function updateRoute(id: string, formData: FormData) {
  const supabase = await createClient()
  
  const route_name = formData.get("route_name") as string
  const area_covered = formData.get("area_covered") as string
  const notes = formData.get("notes") as string
  
  await supabase.from("transport_routes").update({ 
    route_name, 
    area_covered, 
    notes,
    updated_at: new Date().toISOString()
  }).eq("id", id)
  
  revalidatePath("/admin/transport")
  revalidatePath("/facilities")
}

export async function deleteRoute(id: string) {
  const supabase = await createClient()
  await supabase.from("transport_routes").delete().eq("id", id)
  revalidatePath("/admin/transport")
  revalidatePath("/facilities")
}
