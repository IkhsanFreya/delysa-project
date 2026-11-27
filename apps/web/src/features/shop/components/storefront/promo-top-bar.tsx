export const PROMO_TOP_BAR_MESSAGE =
  "Gratis Ongkir Tasikmalaya min. Rp200.000 · Buka Setiap Hari 07.00–21.00 WIB · Same-Day sebelum 18.00 WIB";

/**
 * Bar pengumuman promo di atas header toko. Render statis di awal dokumen
 * (tanpa JS/state) sehingga tidak menyebabkan layout shift.
 */
export function PromoTopBar({
  message = PROMO_TOP_BAR_MESSAGE,
}: {
  message?: string;
}) {
  return (
    <div
      role="region"
      aria-label="Info promo"
      className="bg-[#1C1917] text-[#FAF7F5]"
    >
      <p className="mx-auto max-w-7xl px-4 py-2 text-center text-[11px] leading-snug font-medium tracking-wide sm:px-6 sm:text-xs">
        {message}
      </p>
    </div>
  );
}
