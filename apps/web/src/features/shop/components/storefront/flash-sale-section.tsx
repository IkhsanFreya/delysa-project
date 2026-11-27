import { Link } from "@tanstack/react-router";
import { Zap } from "lucide-react";
import {
  CardProduct,
  ProductCardSkeleton,
} from "~/features/shop/components/card-product";
import { endOfDay, useCountdown } from "~/features/shop/hooks/use-countdown";
import type { Product } from "~/features/shop/types";
import { cn } from "~/lib/utils";

function TimerDigit({
  value,
  urgent = false,
}: {
  value: string;
  urgent?: boolean;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "min-w-8 rounded-md px-1.5 py-1 text-center text-xs font-bold text-white tabular-nums sm:min-w-9 sm:text-sm",
        urgent ? "bg-[#BE185D]" : "bg-[#1C1917]",
      )}
    >
      {value}
    </span>
  );
}

function FlashSaleTimer() {
  const { hours, minutes, seconds } = useCountdown(endOfDay());

  return (
    <span className="flex items-center gap-2">
      <span className="text-[11px] font-bold tracking-wide text-[#57534E] uppercase">
        Berakhir dalam:
      </span>
      <span
        role="timer"
        aria-label={`Flash sale berakhir dalam ${hours} jam ${minutes} menit ${seconds} detik`}
        className="flex items-center gap-1"
      >
        <TimerDigit value={hours} />
        <span aria-hidden="true" className="text-sm font-bold text-[#1C1917]">
          :
        </span>
        <TimerDigit value={minutes} />
        <span aria-hidden="true" className="text-sm font-bold text-[#1C1917]">
          :
        </span>
        <TimerDigit value={seconds} urgent />
      </span>
    </span>
  );
}

type FlashSaleSectionProps = {
  products: Product[];
  isPending?: boolean;
  linkText?: string;
};

/**
 * Section promo waktu terbatas dengan permukaan blush khas Delysa Florist.
 */
export function FlashSaleSection({
  products,
  isPending = false,
  linkText = "Lihat Semua Promo",
}: FlashSaleSectionProps) {
  return (
    <section
      aria-label="Flash Sale Hari Ini"
      className="mx-auto max-w-7xl px-4 pt-8 sm:px-6"
    >
      <div className="rounded-2xl border border-[#FBCFE8] bg-gradient-to-br from-[#FDF2F8] via-white to-[#FCE7F3]/70 p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <span
              aria-hidden="true"
              className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#BE185D] text-white"
            >
              <Zap size={18} className="fill-white" />
            </span>
            <div>
              <h2 className="text-xl font-extrabold tracking-tight text-[#1C1917] sm:text-2xl">
                Flash Sale Hari Ini
              </h2>
              <p className="mt-0.5 text-xs text-[#57534E] sm:text-[13px]">
                Penawaran kilat stok bunga segar Tasikmalaya terbatas hari ini
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <FlashSaleTimer />
            {linkText ? (
              <Link
                to="/promo"
                className="shrink-0 text-xs font-semibold text-[#BE185D] underline-offset-4 hover:text-[#9D174D] hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BE185D]"
              >
                {linkText} ›
              </Link>
            ) : null}
          </div>
        </div>

        {isPending ? (
          <div
            className="grid grid-cols-2 gap-3.5 md:grid-cols-4"
            aria-label="Memuat produk flash sale"
          >
            {Array.from({ length: 4 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : products.length === 0 ? (
          <p className="rounded-xl border border-dashed border-[#FBCFE8] bg-white/90 p-8 text-center text-sm text-[#57534E]">
            Flash sale belum tersedia. Nantikan penawaran kilat berikutnya.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-3.5 md:grid-cols-4">
            {products.map((product) => (
              <CardProduct
                key={product.id}
                item={product}
                variant="flash-sale"
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
