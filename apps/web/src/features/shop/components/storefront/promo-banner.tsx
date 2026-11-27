import { Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle } from "lucide-react";
import { buttonVariants } from "~/components/ui/button";
import { DELYSA_CONTACT } from "~/features/shop/data/storefront";
import flashSaleFixture from "~/mock/products/flash-sale.json";
import type { UnifiedProduct } from "~/features/shop/types";

export function PromoBanner() {
  const customMessage =
    "Halo Delysa Florist, saya ingin memesan rangkaian kustom (buket jajanan/uang atau bunga papan) untuk area Tasikmalaya.";

  return (
    <section
      aria-label="Pesan custom"
      className="mx-auto max-w-7xl px-4 pt-8 sm:px-6"
    >
      <div className="relative overflow-hidden rounded-2xl bg-[#1C1917] text-white">
        <img
          src={(flashSaleFixture as UnifiedProduct[])[4].image}
          alt=""
          width={1600}
          height={500}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#1C1917]/90 via-[#1C1917]/60 to-[#831843]/40"
        />
        <div className="relative flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div>
            <p className="text-[11px] font-bold tracking-[0.14em] text-[#FBCFE8] uppercase">
              Rangkaian Khusus Tasikmalaya
            </p>
            <h2 className="mt-1 max-w-[26ch] text-2xl font-extrabold tracking-tight text-balance sm:text-3xl">
              Karangan Bunga Papan, Buket Jajanan &amp; Buket Uang By Request
            </h2>
            <p className="mt-1.5 max-w-[52ch] text-xs leading-relaxed text-white/85 sm:text-sm">
              Sesuaikan nominal, isi snack, warna wrapping, atau kalimat ucapan
              papan bunga langsung bersama tim Delysa Florist.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2.5">
            <Link
              to="/katalog"
              search={{ category: "Papan" }}
              className={buttonVariants({
                variant: "secondary",
                className:
                  "h-11 rounded-full bg-white px-5 text-xs font-bold text-[#1C1917] shadow-md ring-1 ring-black/10 hover:bg-[#FDF2F8] hover:text-[#9D174D] sm:text-sm",
              })}
            >
              Lihat Bunga Papan
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
            <a
              href={`https://wa.me/${DELYSA_CONTACT.whatsappNumber}?text=${encodeURIComponent(customMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({
                variant: "default",
                className:
                  "h-11 rounded-full bg-[#BE185D] px-5 text-xs font-bold text-white shadow-md ring-1 ring-white/25 hover:bg-[#9D174D] sm:text-sm",
              })}
            >
              <MessageCircle size={15} aria-hidden="true" />
              Pesan Custom via WA
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
