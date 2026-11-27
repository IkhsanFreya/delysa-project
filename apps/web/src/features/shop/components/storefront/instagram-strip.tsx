import { AtSign } from "lucide-react";
import { SectionHeader } from "~/features/shop/components/storefront/section-header";
import { DELYSA_CONTACT } from "~/features/shop/data/storefront";
import bestSellersFixture from "~/mock/products/best-sellers.json";
import type { UnifiedProduct } from "~/features/shop/types";

export function InstagramStrip() {
  const photos = (bestSellersFixture as UnifiedProduct[]).slice(0, 5);

  return (
    <section
      aria-label="Koleksi Instagram"
      className="mx-auto max-w-7xl px-4 pt-8 sm:px-6"
    >
      <SectionHeader
        eyebrow={DELYSA_CONTACT.instagramHandle}
        title="Koleksi Harian Instagram"
        linkText={`Follow ${DELYSA_CONTACT.instagramHandle}`}
        externalHref={DELYSA_CONTACT.instagramUrl}
      />
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {photos.map((photo) => (
          <li key={photo.id} className="overflow-hidden rounded-xl">
            <a
              href={DELYSA_CONTACT.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Lihat ${photo.name} di Instagram ${DELYSA_CONTACT.instagramHandle}`}
              className="group block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BE185D]"
            >
              <img
                src={photo.image}
                alt={photo.name}
                width={600}
                height={600}
                loading="lazy"
                decoding="async"
                className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-[#57534E]">
        <AtSign size={14} aria-hidden="true" />
        Tag {DELYSA_CONTACT.instagramHandle} untuk berbagi momen buket Anda
      </p>
    </section>
  );
}
