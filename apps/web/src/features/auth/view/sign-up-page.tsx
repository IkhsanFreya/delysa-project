import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import type { AuthUser } from "@delysa/shared";
import { AuthConfigNotice } from "~/features/auth/components/auth-config-notice";
import { RegisterForm } from "~/features/auth/components/register-form";
import { SignupShowcase } from "~/features/auth/components/signup-showcase";
import { roleHome } from "~/features/auth/lib/role-home";

export default function SignUpPage() {
  const navigate = useNavigate();

  const handleSuccess = (user: AuthUser) => {
    // Berikan jeda 300ms agar toast "Registrasi berhasil" terlihat sebelum navigasi
    setTimeout(() => {
      void navigate({ to: roleHome(user.role), replace: true });
    }, 300);
  };

  return (
    <div className="grid min-h-dvh bg-[#FAF7F5] text-[#1C1917] lg:h-dvh lg:grid-cols-[1fr_1fr] lg:overflow-hidden">
      <aside className="relative hidden p-3 lg:block">
        <SignupShowcase
          imageSrc="https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=1200&auto=format&fit=crop"
          imageAlt="Rangkaian bunga segar Delysa Florist Tasikmalaya"
        />
      </aside>

      <section className="flex items-center justify-center px-6 py-4 sm:px-12 lg:overflow-y-auto lg:py-3">
        <div className="w-full max-w-[440px]">
          <Link
            to="/"
            className="mb-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#57534E] transition-colors hover:text-[#BE185D] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BE185D]"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            Kembali ke Delysa Florist
          </Link>

          <div className="flex items-center gap-2.5">
            <img
              src="/logo-delysa.jpg"
              alt="Logo Delysa Florist"
              width={40}
              height={40}
              className="size-10 rounded-full object-cover ring-1 ring-[#EAE2DE]"
            />
            <p className="text-xs font-semibold tracking-wide text-[#BE185D]">
              Delysa Florist · Tasikmalaya
            </p>
          </div>
          <h1 className="mt-1 text-[clamp(1.35rem,1.1rem+1vw,1.75rem)] leading-[1.12] font-bold tracking-tight text-balance">
            Buat Akun Baru
          </h1>
          <p className="mt-1 max-w-[44ch] text-[13px] leading-snug text-[#57534E]">
            Daftar untuk menyimpan keranjang, alamat pengiriman, dan riwayat
            pesanan Anda.
          </p>
          <AuthConfigNotice />

          <div className="mt-3.5">
            <RegisterForm onSuccess={handleSuccess} />
          </div>

          <p className="mt-3 text-center text-[13px] text-[#57534E]">
            Sudah punya akun?{" "}
            <Link
              to="/sign-in"
              className="font-semibold text-[#BE185D] underline-offset-4 hover:text-[#9D174D] hover:underline"
            >
              Masuk
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
