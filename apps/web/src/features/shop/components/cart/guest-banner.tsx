import { UserPlus, LogIn } from "lucide-react";
import { buttonVariants } from "~/components/ui/button";
import { Link } from "@tanstack/react-router";

export function GuestBanner() {
  return (
    <div className="mt-3 rounded-xl border border-[#FBCFE8] bg-[#FDF2F8] p-3.5">
      <div className="flex items-start gap-3">
        <UserPlus
          size={20}
          className="mt-0.5 shrink-0 text-[#BE185D]"
          aria-hidden="true"
        />
        <div className="flex-1">
          <p className="text-sm font-semibold text-[#831843]">
            Belanja Sebagai Tamu
          </p>
          <p className="mt-0.5 text-xs leading-relaxed text-[#9D174D] sm:text-sm">
            Masuk untuk simpan keranjang hingga 30 hari &amp; akses riwayat
            pesanan Anda.
          </p>
          <div className="mt-2.5 flex flex-wrap gap-2">
            <Link
              to="/sign-in"
              className={buttonVariants({
                size: "sm",
                className:
                  "rounded-full bg-[#BE185D] text-white hover:bg-[#9D174D]",
              })}
            >
              <LogIn size={14} aria-hidden="true" /> Masuk
            </Link>
            <Link
              to="/sign-up"
              className={buttonVariants({
                variant: "outline",
                size: "sm",
                className:
                  "rounded-full border-[#FBCFE8] bg-white text-[#9D174D] hover:bg-[#FCE7F3]",
              })}
            >
              <UserPlus size={14} aria-hidden="true" /> Buat Akun
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
