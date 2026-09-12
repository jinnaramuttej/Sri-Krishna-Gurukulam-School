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
