"use server";

import { createClient } from "@/utils/supabase/server";
import nodemailer from "nodemailer";

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

    // 3. Send Emails via Nodemailer
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      });

      // Email to Parent
      const parentMailOptions = {
        from: `"Sri Krishna Gurukulam" <${process.env.GMAIL_USER}>`,
        to: email,
        subject: "Admission Enquiry Received - Sri Krishna Gurukulam",
        text: `Dear ${parentName},\n\nThank you for your interest in Sri Krishna Gurukulam.\nWe have received your admission enquiry for ${studentName} (Class: ${classApplying}). Our admissions team will review your details and contact you shortly at ${phone}.\n\nWarm Regards,\nAdmissions Team\nSri Krishna Gurukulam`,
        html: `
          <div style="font-family: sans-serif; line-height: 1.6; color: #333;">
            <h2>Thank You for Your Interest</h2>
            <p>Dear ${parentName},</p>
            <p>We have received your admission enquiry for <strong>${studentName}</strong> (Class: ${classApplying}).</p>
            <p>Our admissions team will review your details and contact you shortly at <strong>${phone}</strong>.</p>
            ${message ? `<p><strong>Your Message:</strong> ${message}</p>` : ""}
            <p>Warm Regards,<br/><strong>Admissions Team</strong><br/>Sri Krishna Gurukulam</p>
          </div>
        `,
      };

      // Notification Email to School Admin
      const adminMailOptions = {
        from: `"Website Enquiries" <${process.env.GMAIL_USER}>`,
        to: process.env.GMAIL_USER,
        subject: `New Admission Enquiry: ${studentName}`,
        text: `New Enquiry Received:\n\nStudent: ${studentName}\nParent: ${parentName}\nPhone: ${phone}\nEmail: ${email}\nClass: ${classApplying}\nMessage: ${message || "N/A"}`,
      };

      await Promise.all([
        transporter.sendMail(parentMailOptions),
        transporter.sendMail(adminMailOptions),
      ]);
    } catch (emailError) {
      console.error("Failed to send emails:", emailError);
      // We don't fail the whole submission if email fails, just log it.
    }

    return { success: true };
  } catch (err) {
    console.error("Admission submission error:", err);
    return { success: false, error: "An unexpected error occurred. Please try again." };
  }
}
