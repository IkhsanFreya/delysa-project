import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { formatIDR, formatSold } from "~/features/shop/lib/format";
import type { UnifiedProduct } from "~/features/shop/types";
import { cn } from "~/lib/utils";

export type CardProductVariant = "flash-sale" | "catalog" | "default";

const LOW_STOCK_THRESHOLD = 5;

/**
 * Satu kartu produk seragam untuk seluruh toko (beranda, flash sale, katalog).
 * Menampilkan badge `Sisa X` saat stok ≤ 5 (sesuai PRD FR-02-01).
 */
export function CardProduct({
  item,
  variant,
}: {
  item: UnifiedProduct;
  variant: CardProductVariant;
}) {
  const left = item.stockLeft ?? item.stock;
  const soldOut = left !== undefined && left <= 0;
  const lowStock =
    left !== undefined && left > 0 && left <= LOW_STOCK_THRESHOLD;

  return (
    <Link
      to="/products/$slug"
      params={{ slug: item.slug }}
      aria-label={`Lihat detail ${item.name}`}
      className="glass-product-card group flex flex-col overflow-hidden rounded-2xl p-2 transition-[transform,background-color,border-color,box-shadow] duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BE185D] motion-reduce:transform-none motion-reduce:transition-none"
    >
      <div className="relative overflow-hidden rounded-xl bg-[#FAF7F5] ring-1 ring-black/5">
        <img
          src={item.image}
          alt={item.name}
          width={800}
          height={1000}
          loading="lazy"
          decoding="async"
          className="aspect-[4/5] w-full object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
        />
        {variant === "flash-sale" && item.discountPercent ? (
          <span className="absolute top-2 left-2 rounded-full bg-[#BE185D]/95 px-2.5 py-0.5 text-[11px] font-bold text-white shadow-sm ring-1 ring-white/35 backdrop-blur-sm tabular-nums">
            -{item.discountPercent}%
          </span>
        ) : null}
        {variant === "catalog" && item.badge ? (
          <span className="absolute top-2 left-2 rounded-full bg-[#1C1917]/85 px-2.5 py-0.5 text-[10px] font-bold tracking-wide text-white uppercase shadow-sm ring-1 ring-white/25 backdrop-blur-sm">
            {item.badge}
          </span>
        ) : null}
        {variant === "default" && item.isNew ? (
          <span className="absolute top-2 left-2 rounded-full bg-[#1C1917]/85 px-2.5 py-0.5 text-[10px] font-bold tracking-wide text-white uppercase shadow-sm ring-1 ring-white/25 backdrop-blur-sm">
            Baru
          </span>
        ) : null}
        {lowStock ? (
          <span className="absolute right-2 bottom-2 rounded-full bg-[#FEF3C7]/95 px-2.5 py-0.5 text-[10px] font-bold text-[#92400E] shadow-sm ring-1 ring-[#F59E0B]/40 backdrop-blur-sm tabular-nums">
            Sisa {left}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-1 px-1.5 pt-2.5 pb-1.5">
        <p
          className={cn(
            "text-[10px] font-semibold tracking-[0.08em] uppercase",
            variant === "catalog" ? "text-[#166534]" : "text-[#57534E]",
          )}
        >
          {item.category}
        </p>
        <h3 className="line-clamp-2 min-h-[2.5rem] text-[13px] leading-snug font-semibold text-[#1C1917] transition-colors group-hover:text-[#BE185D]">
          {item.name}
        </h3>
        {variant !== "flash-sale" ? (
          <p className="flex items-center gap-1 text-[11px] text-[#57534E]">
            <Star
              size={12}
              aria-hidden="true"
              className="fill-amber-400 text-amber-400"
            />
            <span className="font-semibold text-[#1C1917] tabular-nums">
              {item.rating.toFixed(1)}
            </span>
            {variant === "default" ? (
              <>
                <span aria-hidden="true">•</span>
                <span className="tabular-nums">
                  {formatSold(item.sold)} Terjual
                </span>
              </>
            ) : null}
          </p>
        ) : null}
        <p className="mt-auto flex flex-wrap items-baseline gap-x-1.5 border-t border-[#EAE2DE]/80 pt-2">
          {variant !== "default" && item.originalPrice ? (
            <s className="text-[11px] font-normal text-[#57534E] tabular-nums">
              {formatIDR(item.originalPrice)}
            </s>
          ) : null}
          <span
            className={cn(
              "text-sm font-extrabold tabular-nums",
              variant === "catalog" ? "text-[#1C1917]" : "text-[#BE185D]",
            )}
          >
            {formatIDR(item.price)}
          </span>
        </p>

        {soldOut ? (
          <p className="mt-1 inline-flex h-8 w-full items-center justify-center rounded-lg bg-[#F5F0ED]/90 text-xs font-semibold text-[#57534E]">
            Stok Habis
          </p>
        ) : null}
      </div>
    </Link>
  );
}

export function ProductCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="glass-product-card flex flex-col overflow-hidden rounded-2xl p-2"
    >
      <div className="aspect-[4/5] w-full animate-pulse rounded-xl bg-[#EAE2DE]/80" />
      <div className="flex flex-col gap-2 px-1.5 pt-2.5 pb-1.5">
        <div className="h-3 w-2/3 animate-pulse rounded bg-[#EAE2DE]/80" />
        <div className="h-4 w-1/2 animate-pulse rounded bg-[#EAE2DE]/80" />
        <div className="h-6 w-2/5 animate-pulse rounded bg-[#EAE2DE]/80" />
      </div>
    </div>
  );
}
