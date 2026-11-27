import { LockKeyhole, ShieldCheck } from "lucide-react";
import { Button } from "~/components/ui/button";
import { OrderCodeLookupForm } from "./order-code-lookup-form";

export function OrderHistoryLocked({
  onSignIn,
  onLookup,
}: {
  onSignIn: () => void;
  onLookup: (code: string) => void;
}) {
  return (
    <section className="mx-auto max-w-xl rounded-2xl border border-[#EAE2DE] bg-white p-5 text-center shadow-sm sm:p-7">
      <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-[#FDF2F8] text-[#BE185D] ring-1 ring-[#FBCFE8]">
        <LockKeyhole size={23} aria-hidden="true" />
      </span>
      <h2 className="mt-3 text-lg font-extrabold tracking-tight text-[#1C1917]">
        Riwayat pesanan terkunci
      </h2>
      <p className="mx-auto mt-1 max-w-sm text-xs leading-relaxed text-[#57534E]">
        Masuk ke akun Anda untuk melihat seluruh riwayat pesanan. Anda juga
        tetap bisa melacak satu pesanan dengan kodenya.
      </p>

      <Button
        type="button"
        onClick={onSignIn}
        className="mt-4 h-10 rounded-lg bg-[#BE185D] px-4 text-sm font-semibold text-white hover:bg-[#9D174D]"
      >
        Masuk ke akun
      </Button>

      <div className="mx-auto mt-5 max-w-sm border-t border-[#F3F4F6] pt-4 text-left">
        <p className="mb-2 text-[11px] font-semibold tracking-wide text-[#6B7280] uppercase">
          Lacak dengan kode
        </p>
        <OrderCodeLookupForm onSubmit={onLookup} />
      </div>

      <p className="mt-4 inline-flex items-center gap-1.5 text-[11px] text-[#6B7280]">
        <ShieldCheck
          size={13}
          aria-hidden="true"
          className="text-emerald-600"
        />
        Pelacakan dengan kode tetap tersedia tanpa masuk.
      </p>
    </section>
  );
}
