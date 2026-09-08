"use server";

import { createClient } from "@supabase/supabase-js";

export async function submitAdmissionEnquiry(formData: FormData, turnstileToken: string) {
  try {
    // 1. Verify Turnstile token
    if (!turnstileToken) {
      return { success: false, error: "Please complete the anti-spam check." };
    }

    const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        secret: process.env.TURNSTILE_SECRET_KEY || "",
        response: turnstileToken,
      }),
    });

    const verifyData = await verifyRes.json();
    if (!verifyData.success) {
      return { success: false, error: "Anti-spam check failed. Please try again." };
    }

    // 2. Insert into Supabase
    const studentName = formData.get("studentName") as string;
    const parentName = formData.get("parentName") as string;
    const phone = formData.get("phone") as string;
    const classApplying = formData.get("classApplying") as string;
    const message = formData.get("message") as string;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error("Missing Supabase environment variables");
      return { success: false, error: "Server configuration error. Please try again later." };
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const { error } = await supabase.from("admissions").insert({
      student_name: studentName,
      parent_name: parentName,
      phone: phone,
      class_applying: classApplying,
      message: message || null,
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return { success: false, error: "Failed to submit your enquiry. Please try again or contact us via WhatsApp." };
    }

    return { success: true };
  } catch (err) {
    console.error("Admission submission error:", err);
    return { success: false, error: "An unexpected error occurred. Please try again." };
  }
}
