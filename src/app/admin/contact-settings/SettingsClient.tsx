"use client"

import { useState } from "react"
import { updateSchoolSettings } from "./actions"
import { Loader2, Save } from "lucide-react"

type SchoolSettings = {
  id?: string
  phone: string | null
  email: string | null
  address: string | null
  map_url: string | null
}

export function SettingsClient({ settings }: { settings: SchoolSettings | null }) {
  const [isLoading, setIsLoading] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setSaved(false)
    const formData = new FormData(e.currentTarget)
    await updateSchoolSettings(formData)
    setIsLoading(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="card p-6 border-brand/20">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="field-label" htmlFor="phone">Phone Number (with country code)</label>
          <input 
            id="phone" 
            name="phone" 
            defaultValue={settings?.phone || ""} 
            placeholder="+91 9876543210"
            className="field-input" 
          />
        </div>
        
        <div>
          <label className="field-label" htmlFor="email">Email Address</label>
          <input 
            id="email" 
            name="email" 
            type="email"
            defaultValue={settings?.email || ""} 
            placeholder="info@srikrishnagurukulam.com"
            className="field-input" 
          />
        </div>
        
        <div>
          <label className="field-label" htmlFor="address">School Address (use Enter for new lines)</label>
          <textarea 
            id="address" 
            name="address" 
            rows={4}
            defaultValue={settings?.address || ""} 
            placeholder="School Campus Address&#10;Village / Town, District&#10;State – PIN Code"
            className="field-input resize-y" 
          />
        </div>

        <div>
          <label className="field-label" htmlFor="map_url">Google Maps Embed URL</label>
          <p className="text-xs text-ink-soft mb-2">
            Go to Google Maps {">"} Share {">"} Embed a map {">"} Copy the link inside the src="..." attribute.
          </p>
          <input 
            id="map_url" 
            name="map_url" 
            defaultValue={settings?.map_url || ""} 
            placeholder="https://www.google.com/maps/embed?pb=..."
            className="field-input" 
          />
        </div>

        <div className="pt-4 border-t border-brand/10 flex items-center gap-4">
          <button 
            type="submit" 
            disabled={isLoading}
            className="btn-primary flex items-center gap-2"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Settings
          </button>
          
          {saved && <span className="text-sm font-medium text-green-600">Successfully saved!</span>}
        </div>
      </form>
    </div>
  )
}
