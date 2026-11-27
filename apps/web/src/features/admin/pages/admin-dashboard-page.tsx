import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  ClipboardList,
  ShieldCheck,
  Users,
} from "lucide-react";
import type { AuthUser } from "@delysa/shared";
import { buttonVariants } from "~/components/ui/button";

const ACTIONS = [
  {
    title: "Pengguna",
    description: "Kelola pelanggan, pemilik toko, dan admin.",
    icon: Users,
  },
  {
    title: "Toko",
    description: "Tinjau dan atur profil toko mitra.",
    icon: Building2,
  },
  {
    title: "Pesanan",
    description: "Awasi pesanan dan verifikasi pembayaran.",
    icon: ClipboardList,
  },
] as const;

export function AdminDashboardPage({ user }: { user: AuthUser }) {
  const firstName = user.name.split(" ")[0] ?? user.name;

  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-[#EAE2DE] bg-white p-5 shadow-sm sm:p-6">
        <p className="inline-flex items-center gap-1.5 rounded-full bg-[#FDF2F8] px-3 py-1 text-[11px] font-semibold text-[#9D174D] ring-1 ring-[#FBCFE8]">
          <ShieldCheck size={13} aria-hidden="true" />
          Admin
        </p>
        <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-[#1C1917] sm:text-3xl">
          Halo, {firstName}
        </h1>
        <p className="mt-1 max-w-xl text-sm leading-relaxed text-[#57534E]">
          Kelola operasional Delysa Florist dari satu tempat. Menu pengguna,
          toko, dan pesanan akan tersedia bertahap.
        </p>
        <Link
          to="/"
          className={buttonVariants({
            className:
              "mt-4 h-11 rounded-full bg-[#BE185D] px-5 text-sm font-semibold text-white hover:bg-[#9D174D] sm:h-10",
          })}
        >
          Buka storefront
          <ArrowRight size={15} aria-hidden="true" className="ml-1.5" />
        </Link>
      </section>

      <div className="grid gap-3 sm:grid-cols-3">
        {ACTIONS.map((action) => {
          const Icon = action.icon;

          return (
            <div
              key={action.title}
              className="rounded-2xl border border-[#EAE2DE] bg-white p-4 shadow-sm"
            >
              <span className="flex size-9 items-center justify-center rounded-full bg-[#FDF2F8] text-[#BE185D] ring-1 ring-[#FBCFE8]">
                <Icon size={17} aria-hidden="true" />
              </span>
              <div className="mt-3 flex items-center justify-between gap-2">
                <p className="text-sm font-bold">{action.title}</p>
                <span className="rounded-full bg-[#F3F4F6] px-2 py-0.5 text-[10px] font-semibold text-[#6B7280]">
                  Segera
                </span>
              </div>
              <p className="mt-1 text-xs leading-relaxed text-[#6B7280]">
                {action.description}
              </p>
            </div>
          );
        })}
      </div>

      <p className="rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-xs leading-relaxed text-[#6B7280]">
        Akun admin dibuat melalui seeder. Manajemen pengguna berbasis UI belum
        termasuk dalam fase ini.
      </p>
    </div>
  );
}
