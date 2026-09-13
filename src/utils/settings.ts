import { createClient } from "@/utils/supabase/server";
import { type SchoolSettings } from "@/lib/site";

export async function getSchoolSettings(): Promise<SchoolSettings> {
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("school_settings").select("*").limit(1).single();
    if (data) return data as SchoolSettings;
  } catch (error) {
    // Return empty if table doesn't exist yet or query fails
  }
  return { 
    school_name: null, 
    short_name: null,
    tagline: null,
    board: null,
    classes: null,
    established_year: null,
    academic_year: null,
    principal_name: null,
    correspondent_name: null,
    phone: null, 
    email: null, 
    address: null, 
    map_url: null 
  };

}
