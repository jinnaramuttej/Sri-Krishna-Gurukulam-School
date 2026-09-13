"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { updateSiteImage } from "./actions"
import { Loader2, UploadCloud, Trash2, ImageIcon } from "lucide-react"
import { createClient } from "@/utils/supabase/client"
import imageCompression from "browser-image-compression"
import { type SchoolSettings } from "@/lib/site"

const SITE_IMAGES = [
  { field: "director_image_url", label: "Director Portrait", desc: "Used on the About page." },
  { field: "principal_image_url", label: "Principal Portrait", desc: "Used on the About page." },
  { field: "vehicle_image_url", label: "Vehicle Facility", desc: "Used on the Facilities page." },
  { field: "hostel_image_url", label: "Hostel Facility", desc: "Used on the Facilities page." },
  { field: "campus_image_url", label: "Campus / More Facilities", desc: "Used on the Facilities page." },
] as const

export function SiteImagesClient({ settings }: { settings: SchoolSettings | null }) {
  const [loadingField, setLoadingField] = useState<string | null>(null)
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({})
  const supabase = createClient()
  const router = useRouter()

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    setLoadingField(field)
    try {
      const options = {
        maxSizeMB: 2,
        maxWidthOrHeight: 1920,
        useWebWorker: true
      }
      const compressedFile = await imageCompression(file, options)
      
      const fileExt = compressedFile.name.split('.').pop()
      const fileName = `site_${field}_${Date.now()}.${fileExt}`
      
      const { error: uploadError } = await supabase.storage
        .from('gallery-photos')
        .upload(fileName, compressedFile)
        
      if (uploadError) throw uploadError
      
      const { data: { publicUrl } } = supabase.storage
        .from('gallery-photos')
        .getPublicUrl(fileName)
        
      await updateSiteImage(field, publicUrl)
      router.refresh()
      
    } catch (err) {
      console.error("Upload error:", err)
      alert("Failed to upload image.")
    } finally {
      setLoadingField(null)
    }
  }

  const handleDelete = async (field: string) => {
    if (!confirm("Are you sure you want to remove this image? The placeholder will be shown again.")) return
    
    setLoadingField(field)
    try {
      await updateSiteImage(field, null)
      router.refresh()
    } catch (err) {
      console.error("Delete error:", err)
      alert("Failed to remove image.")
    } finally {
      setLoadingField(null)
    }
  }

  return (
    <div className="card p-6 border-brand/20 bg-brand/5 mb-10">
      <h2 className="text-xl font-bold text-navy mb-2 flex items-center gap-2">
        <ImageIcon className="w-5 h-5 text-brand" /> Site Placeholders
      </h2>
      <p className="text-sm text-ink-soft mb-6">
        Replace the default placeholder images on the public website (like portraits and facilities) with your own real photos.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {SITE_IMAGES.map(({ field, label, desc }) => {
          const currentUrl = settings?.[field as keyof SchoolSettings] as string | null
          
          return (
            <div key={field} className="card bg-white p-4 flex flex-col items-center text-center border-brand/10">
              <h3 className="font-heading font-bold text-navy">{label}</h3>
              <p className="text-xs text-ink-soft mb-4">{desc}</p>
              
              {currentUrl ? (
                <div className="relative w-full aspect-square bg-cream-soft rounded-lg overflow-hidden mb-4 border border-brand/10 group">
                  <img src={currentUrl} alt={label} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <button 
                      onClick={() => handleDelete(field)}
                      disabled={loadingField === field}
                      className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition disabled:opacity-50"
                      title="Remove Image"
                    >
                      {loadingField === field ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="w-full aspect-square bg-cream border-2 border-dashed border-brand/20 rounded-lg flex flex-col items-center justify-center mb-4 text-ink-soft p-4">
                  <ImageIcon className="w-8 h-8 opacity-20 mb-2" />
                  <span className="text-xs font-semibold uppercase tracking-wider opacity-60">Placeholder Active</span>
                </div>
              )}
              
              <div className="w-full mt-auto">
                <input
                  type="file"
                  accept="image/*"
                  ref={(el) => { fileInputRefs.current[field] = el }}
                  onChange={(e) => handleUpload(e, field)}
                  disabled={loadingField === field}
                  className="hidden"
                />
                <button 
                  onClick={() => fileInputRefs.current[field]?.click()}
                  disabled={loadingField === field}
                  className="w-full flex items-center justify-center gap-2 h-[38px] bg-brand/10 text-brand font-semibold rounded hover:bg-brand/20 transition disabled:opacity-50"
                >
                  {loadingField === field ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <UploadCloud className="w-4 h-4" />
                      {currentUrl ? "Replace Image" : "Upload Image"}
                    </>
                  )}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
