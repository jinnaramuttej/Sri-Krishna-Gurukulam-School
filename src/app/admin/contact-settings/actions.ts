"use server"

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"

export async function updateSchoolSettings(formData: FormData) {
  const supabase = await createClient()
  
  const phone = formData.get("phone") as string
  const email = formData.get("email") as string
  const address = formData.get("address") as string
  const map_url = formData.get("map_url") as string
  
  // Try to get the existing row
  const { data } = await supabase.from("school_settings").select("id").limit(1)
  
  if (data && data.length > 0) {
    // Update existing row
    await supabase.from("school_settings").update({ 
      phone, 
      email, 
      address, 
      map_url,
      updated_at: new Date().toISOString()
    }).eq("id", data[0].id)
  } else {
    // Insert new row if none exists
    await supabase.from("school_settings").insert({ phone, email, address, map_url })
  }
  
  // Revalidate everything since contact details are in header/footer globally
  revalidatePath("/", "layout")
}
