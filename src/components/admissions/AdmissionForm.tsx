"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { WhatsAppIcon } from "@/components/brand/WhatsAppIcon";
import { site, whatsappHref } from "@/lib/site";

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

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="card border-brand/30 bg-brand/[0.04] p-7 text-center sm:p-9" role="status">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand/10">
          <CheckCircle2 className="h-7 w-7 text-brand" aria-hidden="true" />
        </span>
        <h3 className="mt-5 font-heading text-2xl font-bold text-navy">Enquiry Noted — One Last Step</h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
          Our online form backend is being set up. To make sure the school receives your enquiry today, please
          send it instantly on WhatsApp — your details are already filled in.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={whatsappHref(waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn w-full border border-[#4fce5d]/50 bg-[#1fae53] text-white hover:-translate-y-0.5 hover:bg-[#23c05c] sm:w-auto"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Send Enquiry on WhatsApp
          </a>
          <button type="button" onClick={() => setSubmitted(false)} className="btn-outline-navy w-full sm:w-auto">
            Edit Details
          </button>
        </div>
        <p className="mt-5 text-[0.65rem] uppercase tracking-[0.18em] text-ink-soft/70">
          [Placeholder WhatsApp number — awaiting confirmation]
        </p>
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

      <div className="mt-7 flex flex-col items-center gap-4">
        <button type="submit" className="btn-primary group w-full sm:w-auto sm:px-10">
          Submit Enquiry
          <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" aria-hidden="true" />
        </button>
        <p className="max-w-md text-center text-xs leading-relaxed text-ink-soft">
          Online submission is being set up — after submitting, you can forward this enquiry to the school on
          WhatsApp in one tap.
        </p>
      </div>
    </form>
  );
}
