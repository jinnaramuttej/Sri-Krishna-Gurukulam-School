import { createClient } from "@/utils/supabase/server";
import { type SchoolSettings } from "@/lib/site";
import { unstable_noStore as noStore } from "next/cache";

export async function getSchoolSettings(): Promise<SchoolSettings> {
  noStore();
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("school_settings").select("*").limit(1);
    if (error) console.error("getSchoolSettings error:", error);
    if (data && data.length > 0) return data[0] as SchoolSettings;
  } catch (error) {
    console.error("getSchoolSettings exception:", error);
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
    map_url: null,
    director_image_url: null,
    principal_image_url: null,
    vehicle_image_url: null,
    hostel_image_url: null,
    campus_image_url: null
  };

}
