import { Heart, ShoppingBag } from "lucide-react";
import { Button } from "~/components/ui/button";
import { QuantityStepper } from "~/features/shop/components/product/quantity-stepper";
import { formatIDR } from "~/features/shop/lib/format";
import { cn } from "~/lib/utils";

/**
 * Bar pembelian PDP: stepper + ATC + wishlist + Beli Langsung + opsi foto WA.
 * Stok-0 → semua disabled dengan label "Stok Habis".
 */
export function PurchaseBar({
  qty,
  max,
  price,
  onQty,
  onAdd,
  onBuyNow,
  wishlisted,
  onWishlist,
  requestPhoto = true,
  onRequestPhotoChange,
}: {
  qty: number;
  max: number;
  price: number;
  onQty: (v: number) => void;
  onAdd: () => void;
  onBuyNow: () => void;
  wishlisted: boolean;
  onWishlist: () => void;
  requestPhoto?: boolean;
  onRequestPhotoChange?: (checked: boolean) => void;
}) {
  const soldOut = max <= 0;

  return (
    <div>
      <div className="flex items-stretch gap-2">
        <QuantityStepper value={qty} max={max} onChange={onQty} />
        <Button
          type="button"
          onClick={onAdd}
          disabled={soldOut}
          className="h-11 flex-1 rounded-lg bg-[#BE185D] text-xs font-extrabold tracking-wide text-white uppercase hover:bg-[#9D174D] disabled:bg-[#EAE2DE] disabled:text-[#57534E]"
        >
          <ShoppingBag size={16} aria-hidden="true" />
          {soldOut
            ? "Stok Habis"
            : `Tambah ke Keranjang • ${formatIDR(price * qty)}`}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon-lg"
          onClick={onWishlist}
          aria-label={wishlisted ? "Hapus dari wishlist" : "Simpan ke wishlist"}
          aria-pressed={wishlisted}
          className={cn(
            "h-11 w-11 shrink-0 rounded-lg border-[#EAE2DE]",
            wishlisted && "border-[#FBCFE8] bg-[#FDF2F8]",
          )}
        >
          <Heart
            size={18}
            aria-hidden="true"
            className={wishlisted ? "fill-[#BE185D] text-[#BE185D]" : ""}
          />
        </Button>
      </div>
      <Button
        type="button"
        variant="outline"
        onClick={onBuyNow}
        disabled={soldOut}
        className="mt-2 h-11 w-full rounded-lg border-[#BE185D] bg-white text-xs font-bold text-[#BE185D] hover:bg-[#FDF2F8] hover:text-[#9D174D] disabled:border-[#EAE2DE] disabled:text-[#57534E]"
      >
        {soldOut ? "Stok Habis" : "Beli Langsung Sekarang"}
      </Button>
      <label className="mt-2.5 flex cursor-pointer items-start gap-2 text-xs text-[#57534E]">
        <input
          type="checkbox"
          checked={requestPhoto}
          onChange={(event) => onRequestPhotoChange?.(event.target.checked)}
          className="mt-0.5 size-4 accent-[#BE185D]"
        />
        <span>
          Minta foto hasil buket ke WhatsApp sebelum dikirim oleh kurir
        </span>
      </label>
    </div>
  );
}
