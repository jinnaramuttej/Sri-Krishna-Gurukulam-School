"use client"

import { useState } from "react"
import { addGalleryImage, deleteGalleryImage, updateGalleryCaption } from "./actions"
import { Trash2, Loader2, UploadCloud, Image as ImageIcon, Pencil, Check, X } from "lucide-react"
import { createClient } from "@/utils/supabase/client"
import imageCompression from "browser-image-compression"

type GalleryImage = {
  id: string
  image_url: string
  caption: string | null
  display_order: number
}

export function GalleryClient({ initialImages }: { initialImages: GalleryImage[] }) {
  const [isUploading, setIsUploading] = useState(false)
  const [loadingId, setLoadingId] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editCaptionValue, setEditCaptionValue] = useState("")
  const [caption, setCaption] = useState("")
  const [file, setFile] = useState<File | null>(null)
  
  const supabase = createClient()

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return
    
    setIsUploading(true)
    try {
      const options = {
        maxSizeMB: 2,
        maxWidthOrHeight: 1920,
        useWebWorker: true
      }
      const compressedFile = await imageCompression(file, options)
      
      const fileExt = compressedFile.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`
      
      const { error: uploadError } = await supabase.storage
        .from('gallery-photos')
        .upload(fileName, compressedFile)
        
      if (uploadError) throw uploadError
      
      const { data: { publicUrl } } = supabase.storage
        .from('gallery-photos')
        .getPublicUrl(fileName)
        
      await addGalleryImage(publicUrl, caption)
      
      setFile(null)
      setCaption("")
      
    } catch (err) {
      console.error("Upload error:", err)
      alert("Failed to upload image. Ensure the 'gallery-photos' bucket exists and RLS allows inserts.")
    } finally {
      setIsUploading(false)
    }
  }

  const handleDelete = async (id: string, url: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return
    setLoadingId(id)
    await deleteGalleryImage(id, url)
    setLoadingId(null)
  }

  const handleUpdateCaption = async (id: string) => {
    setLoadingId(id)
    await updateGalleryCaption(id, editCaptionValue)
    setEditingId(null)
    setLoadingId(null)
  }

  return (
    <div className="space-y-10">
      <div className="card p-6 border-brand/20 bg-brand/5">
        <h2 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">
          <UploadCloud className="w-5 h-5" /> Upload New Photo
        </h2>
        <form onSubmit={handleUpload} className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1 w-full">
            <label className="field-label">Select Image</label>
            <input 
              type="file" 
              accept="image/*"
              required
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="field-input py-2 text-sm bg-white" 
            />
          </div>
          <div className="flex-1 w-full">
            <label className="field-label">Caption (Optional)</label>
            <input 
              type="text" 
              placeholder="e.g. Annual Sports Day 2026"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="field-input py-2 text-sm bg-white" 
            />
          </div>
          <button 
            type="submit" 
            disabled={!file || isUploading}
            className="btn-primary flex items-center justify-center gap-2 px-6 h-[42px] min-w-[140px]"
          >
            {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Upload"}
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-xl font-bold text-navy mb-6">Gallery Images</h2>
        {initialImages.length === 0 ? (
          <div className="card p-12 text-center text-ink-soft border-dashed border-2 flex flex-col items-center">
            <ImageIcon className="w-12 h-12 text-brand/30 mb-3" />
            <p>No photos added yet. Upload your first photo above.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {initialImages.map((img) => (
              <div key={img.id} className="card overflow-hidden group relative">
                <img 
                  src={img.image_url} 
                  alt={img.caption || "Gallery photo"} 
                  className="w-full h-48 object-cover group-hover:scale-105 transition duration-500"
                />
                
                {editingId === img.id ? (
                  <div className="absolute inset-0 bg-navy/90 flex flex-col justify-center p-4">
                    <input 
                      autoFocus
                      value={editCaptionValue}
                      onChange={(e) => setEditCaptionValue(e.target.value)}
                      placeholder="Enter new caption"
                      className="field-input text-sm py-2 mb-3 bg-white/10 text-white border-white/20 placeholder:text-white/50 focus:border-white/50"
                    />
                    <div className="flex gap-2 justify-end">
                      <button 
                        onClick={() => handleUpdateCaption(img.id)}
                        disabled={loadingId === img.id}
                        className="bg-brand text-navy p-2 rounded hover:bg-brand/80 transition disabled:opacity-50"
                      >
                        {loadingId === img.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                      </button>
                      <button 
                        onClick={() => setEditingId(null)}
                        className="bg-white/10 text-white p-2 rounded hover:bg-white/20 transition"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-4">
                    <p className="text-white text-sm font-medium truncate mb-2">{img.caption || "No caption"}</p>
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => {
                          setEditCaptionValue(img.caption || "")
                          setEditingId(img.id)
                        }}
                        className="bg-white/20 text-white p-2 rounded hover:bg-white/30 transition"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(img.id, img.image_url)}
                        disabled={loadingId === img.id}
                        className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition disabled:opacity-50"
                      >
                        {loadingId === img.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
