import { createClient } from "@/utils/supabase/server";

export type SchoolSettings = {
  phone: string | null;
  email: string | null;
  address: string | null;
  map_url: string | null;
};

export async function getSchoolSettings(): Promise<SchoolSettings> {
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("school_settings").select("*").limit(1).single();
    if (data) return data as SchoolSettings;
  } catch (error) {
    // Return empty if table doesn't exist yet or query fails
  }
  return { phone: null, email: null, address: null, map_url: null };
}

export function getWhatsAppHref(phone: string | null, message?: string) {
  const defaultNumber = "910000000000"; // Fallback
  const cleanNumber = phone ? phone.replace(/\D/g, "") : defaultNumber;
  const base = `https://wa.me/${cleanNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
