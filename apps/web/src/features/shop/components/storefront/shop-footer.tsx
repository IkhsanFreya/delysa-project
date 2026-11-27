import { Link } from "@tanstack/react-router";
import { MapPin, MessageCircle } from "lucide-react";
import {
  DELYSA_CONTACT,
  STOREFRONT_FOOTER,
} from "~/features/shop/data/storefront";

const SHOP_CATEGORY_LINKS: { label: string; category?: string }[] = [
  { label: "Buket Wisuda & Graduation", category: "Wisuda" },
  { label: "Buket Mawar & Kasih Sayang", category: "Mawar" },
  { label: "Buket Jajanan & Buket Uang", category: "Kado" },
  { label: "Karangan & Bunga Papan", category: "Papan" },
  { label: "Anggrek & Bunga Pot", category: "Anggrek" },
  { label: "Bunga Meja & Dekorasi", category: "Meja" },
];

export function ShopFooter() {
  return (
    <footer className="mt-10 bg-[#1C1917] text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2.5 text-sm font-extrabold tracking-tight text-white hover:text-[#FBCFE8]"
          >
            <img
              src="/logo-delysa.jpg"
              alt=""
              width={36}
              height={36}
              className="size-9 rounded-full bg-white object-cover ring-1 ring-white/20"
            />
            DELYSA FLORIST
          </Link>
          <p className="mt-3 text-[13px] leading-relaxed text-[#D6D3D1]">
            {STOREFRONT_FOOTER.address}
          </p>
          <p className="mt-2 text-[13px] leading-relaxed text-[#D6D3D1]">
            {STOREFRONT_FOOTER.hours}
          </p>
          <div className="mt-3 flex flex-wrap gap-3 text-xs">
            <a
              href={DELYSA_CONTACT.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium text-[#FBCFE8] underline-offset-4 hover:underline"
            >
              <MapPin size={13} aria-hidden="true" />
              Lihat Peta
            </a>
            <a
              href={`https://wa.me/${DELYSA_CONTACT.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium text-[#FBCFE8] underline-offset-4 hover:underline"
            >
              <MessageCircle size={13} aria-hidden="true" />
              WA {DELYSA_CONTACT.whatsappDisplay}
            </a>
          </div>
        </div>

        <nav aria-label="Kategori belanja">
          <p className="text-xs font-bold tracking-wider text-white uppercase">
            Kategori Belanja
          </p>
          <ul className="mt-3 space-y-2">
            {SHOP_CATEGORY_LINKS.map((item) => (
              <li key={item.label}>
                <Link
                  to="/katalog"
                  search={item.category ? { category: item.category } : {}}
                  className="text-[13px] text-[#D6D3D1] transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/promo"
                className="text-[13px] text-[#FBCFE8] transition-colors hover:text-white"
              >
                Promo Flash Sale Hari Ini
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Layanan pelanggan">
          <p className="text-xs font-bold tracking-wider text-white uppercase">
            Layanan Pelanggan
          </p>
          <ul className="mt-3 space-y-2">
            <li>
              <Link
                to="/riwayat-pesanan"
                className="text-[13px] text-[#D6D3D1] transition-colors hover:text-white"
              >
                Lacak &amp; Riwayat Pesanan
              </Link>
            </li>
            <li>
              <Link
                to="/keranjang"
                className="text-[13px] text-[#D6D3D1] transition-colors hover:text-white"
              >
                Keranjang Belanja
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-[13px] text-[#D6D3D1] transition-colors hover:text-white"
              >
                Tentang Delysa Florist
              </Link>
            </li>
            <li>
              <Link
                to="/sign-in"
                className="text-[13px] text-[#D6D3D1] transition-colors hover:text-white"
              >
                Masuk / Daftar Akun
              </Link>
            </li>
            <li>
              <a
                href={`https://wa.me/${DELYSA_CONTACT.whatsappNumber}?text=${encodeURIComponent("Halo Delysa Florist, saya ingin menanyakan info pengiriman atau pesan buket kustom.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] text-[#D6D3D1] transition-colors hover:text-white"
              >
                Hubungi Admin via WhatsApp
              </a>
            </li>
          </ul>
        </nav>

        <div>
          <p className="text-xs font-bold tracking-wider text-white uppercase">
            Pembayaran Resmi (Non-COD)
          </p>
          <p className="mt-3 text-[13px] leading-relaxed text-[#D6D3D1]">
            {STOREFRONT_FOOTER.payment}
          </p>
          <p className="mt-2 text-xs leading-relaxed text-[#A8A29E]">
            Tersedia juga QRIS. Unggah bukti pembayaran langsung di halaman
            Status Pesanan untuk verifikasi cepat oleh admin.
          </p>
          <a
            href={DELYSA_CONTACT.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-xs font-medium text-[#FBCFE8] underline-offset-4 hover:underline"
          >
            Instagram {DELYSA_CONTACT.instagramHandle}
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-[#D6D3D1] sm:flex-row sm:px-6">
          <p>
            © 2026 Delysa Florist · Capstone Project Informatika Universitas
            Siliwangi (Dosen Pengampu Dr. Ir. Eka Wahyu Hidayat, S.T., M.T.,
            MCE.)
          </p>
          <p className="flex gap-4">
            <Link to="/about" className="hover:text-white">
              Kebijakan Privasi
            </Link>
            <Link to="/about" className="hover:text-white">
              Syarat &amp; Ketentuan
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
