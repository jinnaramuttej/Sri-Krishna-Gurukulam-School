"use server";

import { createClient } from "@/utils/supabase/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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
    const email = formData.get("email") as string;
    const classApplying = formData.get("classApplying") as string;
    const message = formData.get("message") as string;

    const supabase = createClient();

    const { error } = await supabase.from("admissions").insert({
      student_name: studentName,
      parent_name: parentName,
      phone: phone,
      email: email,
      class_applying: classApplying,
      message: message || null,
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return { success: false, error: "Failed to save data. Please try again." };
    }

    // 3. Send Notification Email via Resend
    try {
      await resend.emails.send({
        from: "Website Enquiries <onboarding@resend.dev>",
        to: ["admissions.skgs@gmail.com"], // Must match your verified Resend account email for testing
        subject: `New Admission Enquiry: ${studentName}`,
        text: `New Enquiry Received:\n\nStudent: ${studentName}\nParent: ${parentName}\nPhone: ${phone}\nEmail: ${email}\nClass: ${classApplying}\nMessage: ${message || "N/A"}`,
      });
    } catch (emailError) {
      console.error("Failed to send email:", emailError);
      // We don't fail the whole submission if email fails, just log it.
    }

    return { success: true };
  } catch (err) {
    console.error("Admission submission error:", err);
    return { success: false, error: "An unexpected error occurred. Please try again." };
  }
}
