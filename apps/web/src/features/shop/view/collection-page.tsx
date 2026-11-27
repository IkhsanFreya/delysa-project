import { Link } from "@tanstack/react-router";
import { ArrowRight, Tag } from "lucide-react";
import { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { Button, buttonVariants } from "~/components/ui/button";
import {
  CardProduct,
  ProductCardSkeleton,
} from "~/features/shop/components/card-product";
import { STOREFRONT_CATEGORIES } from "~/features/shop/data/storefront";
import {
  useBestSellersProducts,
  useFlashSaleProducts,
  useNewArrivalsProducts,
  useProducts,
} from "~/features/shop/hooks/use-shop-queries";
import { cn } from "~/lib/utils";

type CollectionMode = "new-arrivals" | "best-sellers" | "promo" | "categories";

export default function CollectionPage({ mode }: { mode: CollectionMode }) {
  if (mode === "categories") return <CategoriesDirectoryView />;
  return <ProductCollectionView mode={mode} />;
}

function CategoriesDirectoryView() {
  const { counts, isPending } = useProducts({ page: 1 });

  return (
    <main className="mx-auto max-w-7xl px-4 pb-10 sm:px-6">
      <Breadcrumb className="pt-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link to="/" />}>Beranda</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Kategori Bunga</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-wide text-[#BE185D] uppercase">
            Koleksi Delysa Florist
          </p>
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-[#1C1917] sm:text-3xl">
            Kategori Rangkaian &amp; Buket
          </h1>
          <p className="mt-1 max-w-xl text-sm text-[#57534E]">
            Pilih kategori sesuai momen, mulai dari buket wisuda, mawar segar,
            buket jajanan &amp; uang, hingga karangan papan bunga Tasikmalaya.
          </p>
        </div>
        <Link
          to="/katalog"
          className={buttonVariants({
            variant: "outline",
            className:
              "rounded-full border-[#EAE2DE] bg-white text-xs font-semibold text-[#1C1917] hover:bg-[#FDF2F8]",
          })}
        >
          Lihat Semua Katalog
          <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>

      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STOREFRONT_CATEGORIES.map((category) => {
          const liveCount = category.catalogCategory
            ? counts[category.catalogCategory]
            : Object.values(counts).reduce((sum, n) => sum + n, 0);
          return (
            <li key={category.id}>
              <Link
                to="/katalog"
                search={
                  category.catalogCategory
                    ? { category: category.catalogCategory }
                    : {}
                }
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-[#EAE2DE] bg-white shadow-xs transition-all hover:border-[#FBCFE8] hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BE185D]"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#FAF7F5]">
                  <img
                    src={category.image}
                    alt={category.name}
                    width={600}
                    height={450}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {!isPending && liveCount !== undefined ? (
                    <span className="absolute right-2.5 bottom-2.5 rounded-full bg-white/95 px-2.5 py-0.5 text-[11px] font-bold text-[#1C1917] shadow-xs tabular-nums">
                      {liveCount} produk
                    </span>
                  ) : null}
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h2 className="text-base font-bold text-[#1C1917] group-hover:text-[#BE185D]">
                    {category.name}
                  </h2>
                  <p className="mt-1 flex-1 text-xs leading-relaxed text-[#57534E]">
                    {category.tagline}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#BE185D]">
                    Buka koleksi
                    <ArrowRight size={13} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}

const META = {
  "new-arrivals": {
    breadcrumb: "Koleksi Terbaru",
    eyebrow: "Baru Dirangkai",
    title: "Koleksi Terbaru Delysa Florist",
    description:
      "Rangkaian buket dan karangan terbaru yang siap dipesan untuk pengantaran area Tasikmalaya.",
    variant: "default" as const,
  },
  "best-sellers": {
    breadcrumb: "Produk Terlaris",
    eyebrow: "Favorit Pelanggan",
    title: "Produk Terlaris Minggu Ini",
    description:
      "Pilihan buket wisuda, mawar, dan kado paling sering dipesan pelanggan Delysa Florist.",
    variant: "default" as const,
  },
  promo: {
    breadcrumb: "Promo Spesial",
    eyebrow: "Penawaran Terbatas",
    title: "Promo & Flash Sale Hari Ini",
    description:
      "Nikmati potongan harga langsung dan gunakan kode kupon DELYSAWISUDA di keranjang belanja.",
    variant: "flash-sale" as const,
  },
};

function ProductCollectionView({
  mode,
}: {
  mode: Exclude<CollectionMode, "categories">;
}) {
  const fresh = useNewArrivalsProducts();
  const best = useBestSellersProducts();
  const flash = useFlashSaleProducts();
  const [activeCategory, setActiveCategory] = useState("Semua");

  const query =
    mode === "new-arrivals" ? fresh : mode === "best-sellers" ? best : flash;
  const meta = META[mode];
  const allProducts = query.data ?? [];
  const categories =
    mode === "best-sellers"
      ? ["Semua", ...Array.from(new Set(allProducts.map((p) => p.category)))]
      : [];
  const products =
    activeCategory === "Semua"
      ? allProducts
      : allProducts.filter((p) => p.category === activeCategory);

  return (
    <main className="mx-auto max-w-7xl px-4 pb-10 sm:px-6">
      <Breadcrumb className="pt-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link to="/" />}>Beranda</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{meta.breadcrumb}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-wide text-[#BE185D] uppercase">
            {meta.eyebrow}
          </p>
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-[#1C1917] sm:text-3xl">
            {meta.title}
          </h1>
          <p className="mt-1 max-w-xl text-sm text-[#57534E]">
            {meta.description}
          </p>
        </div>
        <Link
          to="/katalog"
          search={mode === "new-arrivals" ? { sort: "terbaru" } : {}}
          className={buttonVariants({
            variant: "outline",
            className:
              "rounded-full border-[#EAE2DE] bg-white text-xs font-semibold text-[#1C1917] hover:bg-[#FDF2F8]",
          })}
        >
          Buka Semua di Katalog
          <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>

      {mode === "promo" ? (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#FBCFE8] bg-[#FDF2F8] px-4 py-3">
          <p className="flex items-center gap-2 text-xs font-medium text-[#9D174D] sm:text-sm">
            <Tag size={15} aria-hidden="true" className="shrink-0" />
            <span>
              Gunakan kode kupon{" "}
              <strong className="font-mono font-bold">DELYSAWISUDA</strong> di
              keranjang + gratis ongkir Tasikmalaya min. belanja Rp200.000.
            </span>
          </p>
          <Link
            to="/keranjang"
            className="text-xs font-bold text-[#BE185D] underline underline-offset-4 hover:text-[#9D174D]"
          >
            Cek Keranjang
          </Link>
        </div>
      ) : null}

      {categories.length > 1 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Button
              key={cat}
              type="button"
              size="sm"
              variant={cat === activeCategory ? "default" : "outline"}
              onClick={() => setActiveCategory(cat)}
              aria-pressed={cat === activeCategory}
              className={cn(
                "rounded-full",
                cat === activeCategory
                  ? "bg-[#BE185D] text-white hover:bg-[#9D174D]"
                  : "border-[#EAE2DE] bg-white text-[#57534E] hover:bg-[#FDF2F8] hover:text-[#9D174D]",
              )}
            >
              {cat}
            </Button>
          ))}
        </div>
      ) : null}

      <div className="mt-6">
        {query.isPending ? (
          <div className="grid grid-cols-2 gap-3.5 md:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-xl border border-dashed border-[#EAE2DE] bg-white p-10 text-center">
            <p className="text-sm font-semibold text-[#1C1917]">
              Belum ada produk pada koleksi ini.
            </p>
            <Link
              to="/katalog"
              className={buttonVariants({
                className:
                  "mt-4 rounded-full bg-[#BE185D] text-white hover:bg-[#9D174D]",
              })}
            >
              Jelajahi Semua Produk
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3.5 md:grid-cols-4">
            {products.map((item) => (
              <CardProduct key={item.id} item={item} variant={meta.variant} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
