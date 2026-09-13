"use server"

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"

export async function addGalleryImage(image_url: string, caption: string) {
  const supabase = await createClient()
  
  // Get current max display_order
  const { data } = await supabase.from("gallery").select("display_order").order("display_order", { ascending: false }).limit(1)
  const display_order = data && data.length > 0 ? (data[0].display_order || 0) + 1 : 1
  
  await supabase.from("gallery").insert({ image_url, caption, display_order })
  revalidatePath("/admin/gallery")
  revalidatePath("/gallery")
}

export async function deleteGalleryImage(id: string, image_url: string) {
  const supabase = await createClient()
  
  // Extract path from public URL to delete from storage
  try {
    const urlParts = image_url.split('/gallery-photos/')
    if (urlParts.length > 1) {
      const filePath = urlParts[1]
      await supabase.storage.from("gallery-photos").remove([filePath])
    }
  } catch (e) {
    console.error("Failed to delete from storage", e)
  }
  
  await supabase.from("gallery").delete().eq("id", id)
  revalidatePath("/admin/gallery")
  revalidatePath("/gallery")
}

export async function updateGalleryCaption(id: string, caption: string) {
  const supabase = await createClient()
  await supabase.from("gallery").update({ caption }).eq("id", id)
  revalidatePath("/admin/gallery")
  revalidatePath("/gallery")
}

export async function updateSiteImage(field: string, image_url: string | null) {
  const supabase = await createClient()
  
  const { data } = await supabase.from("school_settings").select("id").limit(1)
  
  if (data && data.length > 0) {
    const { error } = await supabase.from("school_settings").update({ 
      [field]: image_url,
      updated_at: new Date().toISOString()
    } as any).eq("id", data[0].id)
    if (error) {
      console.error("Update site image error:", error)
      throw new Error(`Database Update Error: ${error.message}`)
    }
  } else {
    const { error } = await supabase.from("school_settings").insert({ 
      [field]: image_url 
    } as any)
    if (error) {
      console.error("Insert site image error:", error)
      throw new Error(`Database Insert Error: ${error.message}`)
    }
  }
  
  revalidatePath("/", "layout")
}
