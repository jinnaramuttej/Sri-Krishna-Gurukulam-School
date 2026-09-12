import { createClient } from "@/utils/supabase/server"
import { GalleryClient } from "./GalleryClient"

export default async function GalleryPage() {
  const supabase = await createClient()
  const { data: images } = await supabase
    .from("gallery")
    .select("*")
    .order("display_order", { ascending: true }) 
  
  return (
    <div className="p-8 sm:p-12 max-w-5xl mx-auto">
      <h1 className="font-heading text-3xl font-bold text-navy mb-8">Manage Photo Gallery</h1>
      <GalleryClient initialImages={images || []} />
    </div>
  )
}
