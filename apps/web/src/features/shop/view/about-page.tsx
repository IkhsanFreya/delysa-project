import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Clock,
  Flower2,
  Landmark,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Truck,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { buttonVariants } from "~/components/ui/button";
import { DELYSA_CONTACT } from "~/features/shop/data/storefront";

const ORDER_STEPS = [
  {
    step: "1",
    title: "Pilih Rangkaian di Katalog",
    desc: "Cari berdasarkan momen (wisuda, mawar, jajanan, uang, papan bunga), pilih ukuran dan warna wrapping.",
  },
  {
    step: "2",
    title: "Isi Alamat & Jadwal Kirim",
    desc: "Masukkan alamat penerima di area Tasikmalaya, pilih tanggal serta slot jam pengantaran, dan tulis kartu ucapan.",
  },
  {
    step: "3",
    title: "Transfer BCA / QRIS & Unggah Bukti",
    desc: "Lakukan pembayaran non-COD ke rekening BCA a.n. Kartinah lalu unggah bukti bayar langsung di web.",
  },
  {
    step: "4",
    title: "Foto Sebelum Kirim & Antar",
    desc: "Setelah diverifikasi admin, buket dirangkai segar, difoto untuk konfirmasi via WhatsApp, lalu dikirim tepat waktu.",
  },
];

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 pb-10 sm:px-6">
      <Breadcrumb className="pt-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link to="/" />}>Beranda</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Tentang Kami</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <section className="mt-4 overflow-hidden rounded-2xl border border-[#EAE2DE] bg-white">
        <div className="grid lg:grid-cols-[1.2fr_1fr]">
          <div className="p-6 sm:p-10">
            <div className="flex items-center gap-3">
              <img
                src="/logo-delysa.jpg"
                alt="Logo resmi Delysa Florist"
                width={52}
                height={52}
                className="size-13 rounded-full object-cover ring-1 ring-[#EAE2DE]"
              />
              <p className="inline-flex items-center gap-1.5 rounded-full bg-[#FDF2F8] px-3 py-1 text-xs font-semibold text-[#9D174D] ring-1 ring-[#FBCFE8]">
                <Flower2 size={13} aria-hidden="true" />
                Beroperasi Sejak {DELYSA_CONTACT.sinceYear}
              </p>
            </div>
            <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-balance text-[#1C1917] sm:text-3xl">
              Delysa Florist: Toko Rangkaian Bunga &amp; Buket Pilihan di
              Tasikmalaya
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-[#57534E]">
              Delysa Florist hadir melayani kebutuhan rangkaian bunga untuk
              wisuda, ulang tahun, pernikahan, grand opening, hingga ucapan
              simpati di Tasikmalaya. Kami menyediakan buket bunga segar, bunga
              artifisial, buket jajanan, buket uang kustom, bunga meja, serta
              karangan papan bunga dengan pengerjaan rapi dan cepat.
            </p>
            <p className="mt-2.5 text-sm leading-relaxed text-[#57534E]">
              Melalui platform e-commerce terintegrasi ini, pelanggan kini dapat
              menjelajahi katalog, memantau ketersediaan stok harian, memilih
              detail kustom, mengunggah bukti pembayaran, dan melacak progres
              pesanan secara transparan.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/katalog"
                className={buttonVariants({
                  className:
                    "rounded-full bg-[#BE185D] px-5 font-semibold text-white hover:bg-[#9D174D]",
                })}
              >
                Jelajahi Katalog
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
              <a
                href={`https://wa.me/${DELYSA_CONTACT.whatsappNumber}?text=${encodeURIComponent("Halo Delysa Florist, saya ingin konsultasi pesanan rangkaian bunga.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({
                  variant: "outline",
                  className:
                    "rounded-full border-[#EAE2DE] bg-white px-5 font-semibold text-[#1C1917] hover:bg-[#FDF2F8]",
                })}
              >
                <MessageCircle size={15} aria-hidden="true" />
                Chat WhatsApp {DELYSA_CONTACT.whatsappDisplay}
              </a>
            </div>
          </div>

          <div className="relative min-h-[260px] bg-[#FAF7F5]">
            <img
              src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1200&q=80&auto=format&fit=crop"
              alt="Suasana rangkaian bunga segar Delysa Florist Tasikmalaya"
              width={1200}
              height={900}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section
        aria-label="Informasi toko"
        className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        <div className="rounded-xl border border-[#EAE2DE] bg-white p-4">
          <span className="flex size-9 items-center justify-center rounded-full bg-[#FDF2F8] text-[#BE185D] ring-1 ring-[#FBCFE8]">
            <MapPin size={17} aria-hidden="true" />
          </span>
          <h2 className="mt-3 text-sm font-bold text-[#1C1917]">Lokasi Toko</h2>
          <p className="mt-1 text-xs leading-relaxed text-[#57534E]">
            {DELYSA_CONTACT.address}
          </p>
          <a
            href={DELYSA_CONTACT.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-xs font-semibold text-[#BE185D] underline-offset-4 hover:underline"
          >
            Buka di Google Maps →
          </a>
        </div>

        <div className="rounded-xl border border-[#EAE2DE] bg-white p-4">
          <span className="flex size-9 items-center justify-center rounded-full bg-[#FDF2F8] text-[#BE185D] ring-1 ring-[#FBCFE8]">
            <Clock size={17} aria-hidden="true" />
          </span>
          <h2 className="mt-3 text-sm font-bold text-[#1C1917]">
            Jam Operasional
          </h2>
          <p className="mt-1 text-xs leading-relaxed text-[#57534E]">
            {DELYSA_CONTACT.hours}
          </p>
          <p className="mt-1 text-xs text-[#57534E]">
            Pengantaran same-day untuk pesanan sebelum 18.00 WIB.
          </p>
        </div>

        <div className="rounded-xl border border-[#EAE2DE] bg-white p-4">
          <span className="flex size-9 items-center justify-center rounded-full bg-[#FDF2F8] text-[#BE185D] ring-1 ring-[#FBCFE8]">
            <Landmark size={17} aria-hidden="true" />
          </span>
          <h2 className="mt-3 text-sm font-bold text-[#1C1917]">
            Pembayaran Resmi
          </h2>
          <p className="mt-1 text-xs leading-relaxed text-[#57534E]">
            {DELYSA_CONTACT.payment}
          </p>
          <p className="mt-1 text-xs text-[#57534E]">
            Sistem non-COD (Transfer BCA &amp; QRIS terverifikasi).
          </p>
        </div>

        <div className="rounded-xl border border-[#EAE2DE] bg-white p-4">
          <span className="flex size-9 items-center justify-center rounded-full bg-[#FDF2F8] text-[#BE185D] ring-1 ring-[#FBCFE8]">
            <Truck size={17} aria-hidden="true" />
          </span>
          <h2 className="mt-3 text-sm font-bold text-[#1C1917]">
            Area Pengiriman
          </h2>
          <p className="mt-1 text-xs leading-relaxed text-[#57534E]">
            Kota &amp; Kabupaten Tasikmalaya (radius 15 km dari Cikalang,
            Tawang). Gratis ongkir min. belanja Rp200.000.
          </p>
        </div>
      </section>

      <section
        aria-label="Cara pemesanan"
        className="mt-8 rounded-2xl border border-[#EAE2DE] bg-white p-6 sm:p-8"
      >
        <p className="text-xs font-semibold tracking-wide text-[#BE185D] uppercase">
          Mudah &amp; Terdokumentasi
        </p>
        <h2 className="mt-1 text-xl font-extrabold tracking-tight text-[#1C1917]">
          Cara Memesan di Delysa Florist
        </h2>
        <ol className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ORDER_STEPS.map((item) => (
            <li
              key={item.step}
              className="rounded-xl border border-[#EAE2DE] bg-[#FAF7F5] p-4"
            >
              <span className="inline-flex size-7 items-center justify-center rounded-full bg-[#BE185D] text-xs font-bold text-white">
                {item.step}
              </span>
              <h3 className="mt-2.5 text-sm font-bold text-[#1C1917]">
                {item.title}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-[#57534E]">
                {item.desc}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section
        id="ketentuan"
        aria-label="Ketentuan layanan dan privasi"
        className="mt-6 rounded-2xl border border-[#EAE2DE] bg-white p-6"
      >
        <div className="flex items-start gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200">
            <ShieldCheck size={18} aria-hidden="true" />
          </span>
          <div className="space-y-2 text-xs leading-relaxed text-[#57534E]">
            <h2 className="text-sm font-bold text-[#1C1917]">
              Garansi Kesegaran, Ketentuan &amp; Privasi
            </h2>
            <p>
              <strong>Garansi kesegaran:</strong> Jika bunga diterima dalam
              kondisi layu atau rusak, laporkan maksimal 1×24 jam disertai foto
              agar kami ganti atau selesaikan sesuai ketentuan.
            </p>
            <p>
              <strong>Pembayaran &amp; stok:</strong> Stok produk diperbarui
              otomatis saat pesanan dibuat dan diverifikasi. Pesanan yang belum
              dibayar melewati batas 1×24 jam akan dibatalkan otomatis dan stok
              dikembalikan.
            </p>
            <p>
              <strong>Privasi data:</strong> Nama penerima, nomor telepon, dan
              alamat pengiriman hanya digunakan untuk memproses pesanan dan
              koordinasi kurir Delysa Florist.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
