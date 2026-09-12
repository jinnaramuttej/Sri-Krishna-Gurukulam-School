"use client"

import { useState } from "react"
import { login } from "./actions"
import { Loader2 } from "lucide-react"

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    
    const formData = new FormData(e.currentTarget)
    const result = await login(formData)
    
    if (result?.error) {
      setError(result.error)
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center p-4">
      <div className="card w-full max-w-md p-8 shadow-xl border-brand/20 bg-white">
        <h1 className="font-heading text-3xl font-bold text-navy mb-6 text-center">Admin Login</h1>
        
        {error && (
          <div className="mb-6 rounded-md bg-red-50 p-4 text-sm text-red-600 border border-red-100">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="field-label" htmlFor="email">Email</label>
            <input 
              id="email" 
              name="email" 
              type="email" 
              required 
              className="field-input"
              placeholder="admin@example.com"
            />
          </div>
          <div>
            <label className="field-label" htmlFor="password">Password</label>
            <input 
              id="password" 
              name="password" 
              type="password" 
              required 
              className="field-input"
              placeholder="••••••••"
            />
          </div>
          <button 
            type="submit" 
            disabled={isLoading}
            className="btn-primary w-full flex justify-center mt-2 h-11 items-center"
          >
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  )
}
