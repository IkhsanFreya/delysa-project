import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import type { AuthUser } from "@delysa/shared";
import { AuthConfigNotice } from "~/features/auth/components/auth-config-notice";
import { LoginForm } from "~/features/auth/components/login-form";
import { SigninShowcase } from "~/features/auth/components/signin-showcase";
import { roleHome } from "~/features/auth/lib/role-home";

export default function SignInPage() {
  const navigate = useNavigate();

  const handleSuccess = (user: AuthUser) => {
    // Berikan jeda 300ms agar toast "Login berhasil" terlihat sebelum navigasi
    setTimeout(() => {
      void navigate({ to: roleHome(user.role), replace: true });
    }, 300);
  };

  return (
    <div className="grid min-h-dvh bg-[#FAF7F5] text-[#1C1917] lg:h-dvh lg:grid-cols-[1fr_1fr] lg:overflow-hidden">
      <section className="flex items-center justify-center px-6 py-6 sm:px-12 lg:overflow-y-auto lg:py-4">
        <div className="w-full max-w-[440px]">
          <Link
            to="/"
            className="mb-5 inline-flex items-center gap-1.5 text-xs font-semibold text-[#57534E] transition-colors hover:text-[#BE185D] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BE185D]"
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
          <h1 className="mt-1.5 text-[clamp(1.5rem,1.2rem+1.2vw,2rem)] leading-[1.12] font-bold tracking-tight text-balance">
            Selamat Datang Kembali
          </h1>
          <p className="mt-1.5 max-w-[44ch] text-[13px] leading-snug text-[#57534E]">
            Masuk untuk melanjutkan pesanan buket dan memantau status pengiriman
            Anda.
          </p>

          <AuthConfigNotice />

          <div className="mt-4">
            <LoginForm onSuccess={handleSuccess} />
          </div>

          <p className="mt-4 text-center text-[13px] text-[#57534E]">
            Baru pertama kali di Delysa Florist?{" "}
            <Link
              to="/sign-up"
              className="font-semibold text-[#BE185D] underline-offset-4 hover:text-[#9D174D] hover:underline"
            >
              Buat Akun Baru
            </Link>
          </p>
        </div>
      </section>

      <aside className="relative hidden p-3 lg:block">
        <SigninShowcase
          imageSrc="https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=1200&auto=format&fit=crop"
          imageAlt="Rangkaian bunga segar Delysa Florist Tasikmalaya"
        />
      </aside>
    </div>
  );
}
