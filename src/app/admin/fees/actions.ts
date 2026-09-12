"use server"

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"

export async function addFee(formData: FormData) {
  const supabase = await createClient()
  
  const class_name = formData.get("class_name") as string
  const amount = formData.get("amount") as string
  const notes = formData.get("notes") as string
  
  await supabase.from("fees").insert({ class_name, amount, notes })
  revalidatePath("/admin/fees")
  revalidatePath("/admissions") // Revalidate public page
}

export async function updateFee(id: string, formData: FormData) {
  const supabase = await createClient()
  
  const class_name = formData.get("class_name") as string
  const amount = formData.get("amount") as string
  const notes = formData.get("notes") as string
  
  await supabase.from("fees").update({ 
    class_name, 
    amount, 
    notes,
    updated_at: new Date().toISOString()
  }).eq("id", id)
  
  revalidatePath("/admin/fees")
  revalidatePath("/admissions")
}

export async function deleteFee(id: string) {
  const supabase = await createClient()
  await supabase.from("fees").delete().eq("id", id)
  revalidatePath("/admin/fees")
  revalidatePath("/admissions")
}
