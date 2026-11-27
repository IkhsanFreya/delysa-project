import { PackageOpen } from "lucide-react";
import { Button } from "~/components/ui/button";
import { OrderCodeLookupForm } from "./order-code-lookup-form";

export function OrderHistoryEmpty({
  onBrowse,
  onLookup,
}: {
  onBrowse: () => void;
  onLookup: (code: string) => void;
}) {
  return (
    <section className="rounded-2xl border border-dashed border-[#EAE2DE] bg-white p-6 text-center sm:p-8">
      <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-[#FDF2F8] text-[#BE185D] ring-1 ring-[#FBCFE8]">
        <PackageOpen size={23} aria-hidden="true" />
      </span>
      <h2 className="mt-3 text-lg font-extrabold tracking-tight text-[#1C1917]">
        Belum ada pesanan
      </h2>
      <p className="mx-auto mt-1 max-w-sm text-xs leading-relaxed text-[#57534E]">
        Mulai dari satu rangkaian kecil, lalu pantau perjalanannya di sini.
        Sudah punya kode pesanan? Lacak langsung tanpa login.
      </p>

      <Button
        type="button"
        onClick={onBrowse}
        className="mt-4 h-10 rounded-lg bg-[#BE185D] px-4 text-sm font-semibold text-white hover:bg-[#9D174D]"
      >
        Jelajahi katalog
      </Button>

      <div className="mx-auto mt-5 max-w-sm border-t border-[#F3F4F6] pt-4 text-left">
        <p className="mb-2 text-[11px] font-semibold tracking-wide text-[#6B7280] uppercase">
          Lacak dengan kode
        </p>
        <OrderCodeLookupForm onSubmit={onLookup} />
      </div>
    </section>
  );
}
