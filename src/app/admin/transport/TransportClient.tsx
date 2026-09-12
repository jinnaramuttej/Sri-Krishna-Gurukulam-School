"use client"

import { useState } from "react"
import { addRoute, updateRoute, deleteRoute } from "./actions"
import { Pencil, Trash2, Check, X, Plus, Loader2 } from "lucide-react"

type Route = {
  id: string
  route_name: string
  area_covered: string
  notes: string | null
}

export function TransportClient({ initialRoutes }: { initialRoutes: Route[] }) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [loadingId, setLoadingId] = useState<string | null>(null)
  const [isAdding, setIsAdding] = useState(false)

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault()
    setLoadingId(id)
    const formData = new FormData(e.currentTarget)
    await updateRoute(id, formData)
    setEditingId(null)
    setLoadingId(null)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this route?")) return
    setLoadingId(id)
    await deleteRoute(id)
    setLoadingId(null)
  }

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoadingId("new")
    const formData = new FormData(e.currentTarget)
    await addRoute(formData)
    setIsAdding(false)
    setLoadingId(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-navy">Current Transport Routes</h2>
        <button 
          onClick={() => setIsAdding(true)} 
          className="btn-primary flex items-center gap-2 text-sm px-4 py-2"
          disabled={isAdding}
        >
          <Plus className="w-4 h-4" /> Add Route
        </button>
      </div>

      <div className="card overflow-hidden border border-brand/20">
        <table className="w-full text-left text-sm">
          <thead className="bg-cream-deep text-navy font-bold">
            <tr>
              <th className="p-4 border-b border-brand/10">Route Name/Number</th>
              <th className="p-4 border-b border-brand/10">Area Covered</th>
              <th className="p-4 border-b border-brand/10">Notes</th>
              <th className="p-4 border-b border-brand/10 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand/10 bg-white">
            {isAdding && (
              <tr>
                <td colSpan={4} className="p-4 bg-brand/5">
                  <form onSubmit={handleAdd} className="flex flex-col sm:flex-row gap-4 items-center">
                    <input name="route_name" placeholder="e.g. Route 1" required className="field-input py-2 text-sm" />
                    <input name="area_covered" placeholder="e.g. Downtown to School" required className="field-input py-2 text-sm" />
                    <input name="notes" placeholder="Optional notes" className="field-input py-2 text-sm" />
                    <div className="flex gap-2 min-w-max ml-auto">
                      <button type="submit" disabled={loadingId === "new"} className="p-2 bg-green-100 text-green-700 rounded hover:bg-green-200 transition">
                        {loadingId === "new" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                      </button>
                      <button type="button" onClick={() => setIsAdding(false)} className="p-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                </td>
              </tr>
            )}

            {initialRoutes.length === 0 && !isAdding && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-ink-soft">No transport routes added yet. Click "Add Route" to create one.</td>
              </tr>
            )}

            {initialRoutes.map(route => (
              <tr key={route.id} className="hover:bg-cream-soft/50 transition">
                {editingId === route.id ? (
                  <td colSpan={4} className="p-4 bg-brand/5">
                    <form onSubmit={(e) => handleUpdate(e, route.id)} className="flex flex-col sm:flex-row gap-4 items-center">
                      <input name="route_name" defaultValue={route.route_name} required className="field-input py-2 text-sm" />
                      <input name="area_covered" defaultValue={route.area_covered} required className="field-input py-2 text-sm" />
                      <input name="notes" defaultValue={route.notes || ""} className="field-input py-2 text-sm" />
                      <div className="flex gap-2 min-w-max ml-auto">
                        <button type="submit" disabled={loadingId === route.id} className="p-2 bg-green-100 text-green-700 rounded hover:bg-green-200 transition">
                          {loadingId === route.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                        </button>
                        <button type="button" onClick={() => setEditingId(null)} className="p-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </form>
                  </td>
                ) : (
                  <>
                    <td className="p-4 font-semibold text-navy">{route.route_name}</td>
                    <td className="p-4 text-ink-soft">{route.area_covered}</td>
                    <td className="p-4 text-ink-soft">{route.notes || "—"}</td>
                    <td className="p-4 text-right flex justify-end gap-2">
                      <button onClick={() => setEditingId(route.id)} className="p-2 text-brand hover:bg-brand/10 rounded transition">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(route.id)} disabled={loadingId === route.id} className="p-2 text-red-500 hover:bg-red-50 rounded transition disabled:opacity-50">
                        {loadingId === route.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
