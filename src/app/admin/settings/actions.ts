"use server"

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"

export async function updateSchoolSettings(formData: FormData) {
  const supabase = await createClient()
  
  const school_name = formData.get("school_name") as string
  const short_name = formData.get("short_name") as string
  const tagline = formData.get("tagline") as string
  const board = formData.get("board") as string
  const classes = formData.get("classes") as string
  const established_year = formData.get("established_year") as string
  const academic_year = formData.get("academic_year") as string
  const principal_name = formData.get("principal_name") as string
  const correspondent_name = formData.get("correspondent_name") as string
  const phone = formData.get("phone") as string
  const email = formData.get("email") as string
  const address = formData.get("address") as string
  const map_url = formData.get("map_url") as string
  
  const payload = {
    school_name, short_name, tagline, board, classes, established_year, academic_year,
    principal_name, correspondent_name, phone, email, address, map_url
  }
  
  // Try to get the existing row
  const { data } = await supabase.from("school_settings").select("id").limit(1)
  
  if (data && data.length > 0) {
    // Update existing row
    await supabase.from("school_settings").update({ 
      ...payload,
      updated_at: new Date().toISOString()
    }).eq("id", data[0].id)
  } else {
    // Insert new row if none exists
    await supabase.from("school_settings").insert({ ...payload })
  }
  
  // Revalidate everything since contact details are in header/footer globally
  revalidatePath("/", "layout")
}
