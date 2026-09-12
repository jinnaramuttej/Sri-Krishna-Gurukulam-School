import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { createClient } from "@/utils/supabase/server";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gallery",
  description: `Photo gallery of ${site.name}.`,
};

export default async function GalleryPage() {
  const supabase = await createClient();
  const { data: images } = await supabase
    .from("gallery")
    .select("*")
    .order("display_order", { ascending: true });
    
  return (
    <>
      <PageHero
        eyebrow="Photo Gallery"
        title={
          <>
            Life at <span className="italic text-gold-pale">Gurukulam</span>
          </>
        }
        lead="A glimpse into the daily life, activities, and campus of our school."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Gallery" }]}
      />
      
      <section className="py-16 sm:py-20">
        <div className="wrap">
          {images && images.length > 0 ? (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {images.map((img) => (
                <div key={img.id} className="break-inside-avoid">
                  <figure className="card overflow-hidden group">
                    <img 
                      src={img.image_url} 
                      alt={img.caption || "Gallery photo"} 
                      className="w-full h-auto object-cover group-hover:scale-105 transition duration-500"
                    />
                    {img.caption && (
                      <figcaption className="p-4 text-sm text-center text-ink-soft bg-white border-t border-brand/10">
                        {img.caption}
                      </figcaption>
                    )}
                  </figure>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-ink-soft bg-cream-soft rounded-2xl border border-brand/10">
              <p>Photos will be updated soon!</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
