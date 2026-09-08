"use client";

import { useState, useRef, type FormEvent } from "react";
import { CheckCircle2, Send, AlertCircle, Loader2 } from "lucide-react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { submitAdmissionEnquiry } from "@/app/actions/admissions";
import { site } from "@/lib/site";

const classOptions = [
  "Nursery",
  "LKG",
  "UKG",
  "Class I",
  "Class II",
  "Class III",
  "Class IV",
  "Class V",
  "Class VI",
  "Class VII",
  "Class VIII",
  "Class IX",
  "Class X",
];

/**
 * Admission enquiry form — UI only (no backend in this phase).
 * On submit it hands the enquiry to WhatsApp so the school actually
 * receives it while the online backend is being built.
 */
export function AdmissionForm() {
  const [form, setForm] = useState({
    studentName: "",
    parentName: "",
    phone: "",
    classApplying: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const turnstileRef = useRef<TurnstileInstance>(null);

  const update = (key: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const waMessage = [
    `Namaste! Admission enquiry for ${site.academicYear}:`,
    `• Student: ${form.studentName}`,
    `• Parent: ${form.parentName}`,
    `• Phone: ${form.phone}`,
    `• Class applying for: ${form.classApplying}`,
    form.message ? `• Message: ${form.message}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!turnstileToken) {
      setError("Please complete the anti-spam check.");
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    const result = await submitAdmissionEnquiry(formData, turnstileToken);
    
    setIsSubmitting(false);
    
    if (result.success) {
      setSubmitted(true);
    } else {
      setError(result.error || "An unexpected error occurred.");
      turnstileRef.current?.reset();
      setTurnstileToken("");
    }
  };

  if (submitted) {
    return (
      <div className="card border-brand/30 bg-brand/[0.04] p-7 text-center sm:p-9" role="status">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand/10">
          <CheckCircle2 className="h-7 w-7 text-brand" aria-hidden="true" />
        </span>
        <h3 className="mt-5 font-heading text-2xl font-bold text-navy">Enquiry Submitted Successfully</h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
          Thank you for your interest in {site.shortName}. Our admission team has received your details and will contact you shortly to guide you through the next steps.
        </p>
        <div className="mt-6 flex justify-center">
          <button 
            type="button" 
            onClick={() => { 
              setSubmitted(false); 
              setForm({ studentName: "", parentName: "", phone: "", classApplying: "", message: "" }); 
              setTurnstileToken(""); 
            }} 
            className="btn-outline-navy"
          >
            Submit Another Enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card p-6 sm:p-8" aria-label="Admission enquiry form">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="studentName" className="field-label">
            Student Name <span className="text-brand" aria-hidden="true">*</span>
          </label>
          <input
            id="studentName"
            name="studentName"
            type="text"
            required
            autoComplete="off"
            placeholder="e.g. Aarav Sharma"
            value={form.studentName}
            onChange={update("studentName")}
            className="field-input"
          />
        </div>
        <div>
          <label htmlFor="parentName" className="field-label">
            Parent Name <span className="text-brand" aria-hidden="true">*</span>
          </label>
          <input
            id="parentName"
            name="parentName"
            type="text"
            required
            autoComplete="off"
            placeholder="e.g. Rajesh Sharma"
            value={form.parentName}
            onChange={update("parentName")}
            className="field-input"
          />
        </div>
        <div>
          <label htmlFor="phone" className="field-label">
            Phone Number <span className="text-brand" aria-hidden="true">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            inputMode="tel"
            pattern="[0-9+ -]{10,15}"
            title="Please enter a valid 10-digit phone number"
            placeholder="10-digit mobile number"
            value={form.phone}
            onChange={update("phone")}
            className="field-input"
          />
        </div>
        <div>
          <label htmlFor="classApplying" className="field-label">
            Class Applying For <span className="text-brand" aria-hidden="true">*</span>
          </label>
          <select
            id="classApplying"
            name="classApplying"
            required
            value={form.classApplying}
            onChange={update("classApplying")}
            className="field-input appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2214%22 height=%2214%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%238b6f3f%22 stroke-width=%222.4%22%3E%3Cpath d=%22m6 9 6 6 6-6%22/%3E%3C/svg%3E')] bg-[length:14px] bg-[right_1rem_center] bg-no-repeat pr-10"
          >
            <option value="" disabled>
              Select a class
            </option>
            {classOptions.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className="field-label">
            Message <span className="font-medium normal-case tracking-normal text-ink-soft">(optional)</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="Any questions about transport, hostel, fees, or the admission process…"
            value={form.message}
            onChange={update("message")}
            className="field-input resize-y"
          />
        </div>
      </div>

      {error && (
        <div className="mt-6 rounded-lg bg-red-50 p-4 text-sm text-red-600 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      <div className="mt-7 flex flex-col items-center gap-6">
        <Turnstile
          ref={turnstileRef}
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""}
          onSuccess={(token) => {
            setTurnstileToken(token);
            setError(null);
          }}
          options={{ theme: "light" }}
        />

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="btn-primary group w-full sm:w-auto sm:px-10 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              Submit Enquiry
              <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" aria-hidden="true" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
