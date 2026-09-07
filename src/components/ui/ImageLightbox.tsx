"use client";

import { useState, useEffect } from "react";
import { X, ZoomIn } from "lucide-react";

export function ImageLightbox({ children, triggerLabel = "View Full Details" }: { children: React.ReactNode; triggerLabel?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent scrolling on body when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <button 
        type="button"
        onClick={() => setIsOpen(true)}
        className="group relative flex w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-navy/10 bg-navy/[0.03] p-1 transition-all hover:border-gold/50 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"
        aria-label="Open image in lightbox"
      >
        <div className="relative w-full opacity-90 grayscale-[30%] transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0">
          {children}
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-navy/0 transition-all duration-300 group-hover:bg-navy/10">
          <span className="flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white shadow-xl translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <ZoomIn className="h-4 w-4 text-gold" aria-hidden="true" />
            {triggerLabel}
          </span>
        </div>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/95 p-4 sm:p-8 backdrop-blur-md">
          <div className="relative flex h-full w-full max-w-6xl flex-col rounded-2xl bg-white p-2 shadow-2xl">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute -right-3 -top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-navy border-2 border-white text-white shadow-lg transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gold"
              aria-label="Close lightbox"
            >
              <X className="h-5 w-5 text-gold" aria-hidden="true" />
            </button>
            <div className="flex h-full w-full items-center justify-center overflow-auto rounded-xl bg-navy/[0.02] p-4">
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
