import { Star } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { formatIDR } from "~/features/shop/lib/format";
import type { ProductDetail } from "~/features/shop/types";

/**
 * Blok info PDP: kategori dinamis, rating, nama, harga + coret + hemat,
 * stok live (termasuk penanda stok menipis ≤ 5), dan ringkasan produk.
 */
export function ProductInfo({
  detail,
  price,
}: {
  detail: ProductDetail;
  price: number;
}) {
  const discount =
    detail.originalPrice && detail.originalPrice > price
      ? Math.round((1 - price / detail.originalPrice) * 100)
      : detail.discountPercent;
  const inStock = detail.stock > 0;
  const lowStock = inStock && detail.stock <= 5;

  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <p className="text-[11px] font-semibold tracking-[0.08em] text-[#BE185D] uppercase">
          Koleksi {detail.category} · Delysa Florist
        </p>
        <a
          href="#ulasan"
          className="flex shrink-0 items-center gap-1 text-[11px] text-[#57534E] underline-offset-4 hover:text-[#BE185D] hover:underline"
          aria-label={`Lihat ${detail.reviewCount} ulasan, rating ${detail.rating.toFixed(1)} dari 5`}
        >
          <Star
            size={12}
            aria-hidden="true"
            className="fill-amber-400 text-amber-400"
          />
          <span className="font-bold text-[#1C1917] tabular-nums">
            {detail.rating.toFixed(1)}
          </span>
          <span>({detail.reviewCount} Ulasan)</span>
        </a>
      </div>
      <h1 className="mt-1 text-2xl leading-tight font-extrabold tracking-tight text-balance text-[#1C1917] sm:text-[28px]">
        {detail.name}
      </h1>
      <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-[#57534E]">
        {detail.description}
      </p>
      <p className="mt-3 flex flex-wrap items-baseline gap-x-2">
        <span className="text-2xl font-extrabold text-[#BE185D] tabular-nums">
          {formatIDR(price)}
        </span>
        {detail.originalPrice && detail.originalPrice > price ? (
          <>
            <s className="text-sm text-[#57534E] tabular-nums">
              {formatIDR(detail.originalPrice)}
            </s>
            <Badge className="rounded-full bg-[#FDF2F8] px-2 py-0.5 text-[11px] font-bold text-[#9D174D] ring-1 ring-[#FBCFE8]">
              Hemat {discount}%
            </Badge>
          </>
        ) : null}
      </p>
      <p className="mt-1 text-[11px] text-[#57534E]">
        Sudah termasuk pita satin &amp; pelindung pengiriman area Tasikmalaya
      </p>
      <p
        className={`mt-3 flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold ${
          lowStock
            ? "border-amber-200 bg-amber-50 text-amber-900"
            : inStock
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border-[#EAE2DE] bg-[#F5F0ED] text-[#57534E]"
        }`}
        role="status"
      >
        <span
          aria-hidden="true"
          className={`size-2 rounded-full ${
            lowStock
              ? "bg-amber-600"
              : inStock
                ? "bg-emerald-600"
                : "bg-[#57534E]"
          }`}
        />
        {lowStock
          ? `Stok Terbatas: Sisa ${detail.stock} rangkaian hari ini — segera pesan!`
          : inStock
            ? `Stok Tersedia: ${detail.stock} rangkaian siap dirangkai hari ini`
            : "Stok Habis — hubungi admin WhatsApp untuk pre-order"}
      </p>
    </div>
  );
}
