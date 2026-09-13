"use client"

import { useState } from "react"
import { updateSchoolSettings } from "./actions"
import { Loader2, Save } from "lucide-react"
import { type SchoolSettings } from "@/lib/site"

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
      <form onSubmit={handleSubmit} className="space-y-10">
        
        {/* General Details */}
        <section className="space-y-6">
          <h2 className="text-xl font-heading font-bold text-navy border-b border-brand/10 pb-2">General Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="field-label" htmlFor="school_name">Full School Name</label>
              <input id="school_name" name="school_name" defaultValue={settings?.school_name || ""} placeholder="Sri Krishna Gurukulam School" className="field-input" />
            </div>
            <div>
              <label className="field-label" htmlFor="short_name">Short Name</label>
              <input id="short_name" name="short_name" defaultValue={settings?.short_name || ""} placeholder="Sri Krishna Gurukulam" className="field-input" />
            </div>
            <div className="sm:col-span-2">
              <label className="field-label" htmlFor="tagline">Tagline</label>
              <input id="tagline" name="tagline" defaultValue={settings?.tagline || ""} placeholder="A Right Choice for Your Children's Bright Future" className="field-input" />
            </div>
          </div>
        </section>

        {/* Academics */}
        <section className="space-y-6">
          <h2 className="text-xl font-heading font-bold text-navy border-b border-brand/10 pb-2">Academics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="field-label" htmlFor="board">Board</label>
              <input id="board" name="board" defaultValue={settings?.board || ""} placeholder="SSC Board" className="field-input" />
            </div>
            <div>
              <label className="field-label" htmlFor="classes">Classes</label>
              <input id="classes" name="classes" defaultValue={settings?.classes || ""} placeholder="Nursery to X Class" className="field-input" />
            </div>
            <div>
              <label className="field-label" htmlFor="established_year">Established Year</label>
              <input id="established_year" name="established_year" defaultValue={settings?.established_year || ""} placeholder="2026" className="field-input" />
            </div>
            <div>
              <label className="field-label" htmlFor="academic_year">Current Academic Year</label>
              <input id="academic_year" name="academic_year" defaultValue={settings?.academic_year || ""} placeholder="2026–27" className="field-input" />
            </div>
          </div>
        </section>

        {/* Leadership */}
        <section className="space-y-6">
          <h2 className="text-xl font-heading font-bold text-navy border-b border-brand/10 pb-2">Leadership</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="field-label" htmlFor="principal_name">Principal Name</label>
              <input id="principal_name" name="principal_name" defaultValue={settings?.principal_name || ""} placeholder="Swetha Bhumarapu" className="field-input" />
            </div>
            <div>
              <label className="field-label" htmlFor="correspondent_name">Correspondent Name</label>
              <input id="correspondent_name" name="correspondent_name" defaultValue={settings?.correspondent_name || ""} placeholder="Krishna Bhumarapu" className="field-input" />
            </div>
          </div>
        </section>

        {/* Contact Details */}
        <section className="space-y-6">
          <h2 className="text-xl font-heading font-bold text-navy border-b border-brand/10 pb-2">Contact & Location</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="field-label" htmlFor="phone">Phone Number</label>
              <input id="phone" name="phone" defaultValue={settings?.phone || ""} placeholder="+91 91213 17327" className="field-input" />
            </div>
            <div>
              <label className="field-label" htmlFor="email">Email Address</label>
              <input id="email" name="email" type="email" defaultValue={settings?.email || ""} placeholder="info@srikrishnagurukulam.com" className="field-input" />
            </div>
            <div className="sm:col-span-2">
              <label className="field-label" htmlFor="address">School Address (use Enter for new lines)</label>
              <textarea id="address" name="address" rows={3} defaultValue={settings?.address || ""} placeholder="M.L.A. Street, Mydukur Road&#10;Khajipet, Kadapa" className="field-input resize-y" />
            </div>
            <div className="sm:col-span-2">
              <label className="field-label" htmlFor="map_url">Google Maps Embed URL</label>
              <p className="text-xs text-ink-soft mb-2">Go to Google Maps {">"} Share {">"} Embed a map {">"} Copy the link inside the src="..." attribute.</p>
              <input id="map_url" name="map_url" defaultValue={settings?.map_url || ""} placeholder="https://www.google.com/maps/embed?pb=..." className="field-input" />
            </div>
          </div>
        </section>

        <div className="pt-4 border-t border-brand/10 flex items-center gap-4 sticky bottom-4 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-brand/20">
          <button type="submit" disabled={isLoading} className="btn-primary flex items-center gap-2">
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save All Settings
          </button>
          {saved && <span className="text-sm font-medium text-green-600">Successfully saved!</span>}
        </div>
      </form>
    </div>
  )
}
