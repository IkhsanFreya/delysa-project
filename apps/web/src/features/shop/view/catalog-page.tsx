import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Camera,
  Clock,
  Flower2,
  RotateCcw,
  ShieldCheck,
  SlidersHorizontal,
  Truck,
  AlertCircle,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { Button } from "~/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from "~/components/ui/drawer";
import { Alert, AlertTitle, AlertDescription } from "~/components/ui/alert";
import { ActiveFilterChips } from "~/features/shop/components/catalog/active-filter-chips";
import { CatalogFilters } from "~/features/shop/components/catalog/catalog-filters";
import { CatalogGrid } from "~/features/shop/components/catalog/catalog-grid";
import { CatalogPagination } from "~/features/shop/components/catalog/catalog-pagination";
import { CatalogToolbar } from "~/features/shop/components/catalog/catalog-toolbar";
import { CATALOG_CATEGORIES } from "~/features/shop/data/catalog";
import { useProducts } from "~/features/shop/hooks/use-shop-queries";
import type { CatalogSearch } from "~/features/shop/schemas/catalog-query-schema";
import { CATALOG_PAGE_SIZE } from "~/features/shop/types";

const TRUST_ITEMS = [
  {
    icon: Clock,
    title: "BUKA 07.00–21.00 WIB",
    subtitle: "Respons chat cepat & siap terima pesanan dadakan.",
  },
  {
    icon: Truck,
    title: "BEBAS ONGKIR TASIKMALAYA",
    subtitle: "Gratis pengiriman area kota, min. belanja Rp200.000.",
  },
  {
    icon: ShieldCheck,
    title: "TRANSFER RESMI BCA",
    subtitle: "Pembayaran aman a.n. Kartinah.",
  },
  {
    icon: Camera,
    title: "FOTO SEBELUM KIRIM",
    subtitle: "Pratinjau via WhatsApp sebelum kurir jalan.",
  },
];

/**
 * Halaman katalog /katalog. Query param adalah state (baca via prop dari
 * route, tulis via navigate functional updater + reset page ke 1).
 */
export default function CatalogPage({ query }: { query: CatalogSearch }) {
  const navigate = useNavigate({ from: "/katalog" });
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const { items, total, counts, isPending, isError } = useProducts(query);
  const pageCount = Math.max(1, Math.ceil(total / CATALOG_PAGE_SIZE));

  const activeFilterCount =
    (query.category ? 1 : 0) +
    (query.minPrice !== undefined || query.maxPrice !== undefined ? 1 : 0);

  const update = (patch: Record<string, string | number | undefined>) => {
    void navigate({
      search: (prev) => ({ ...prev, ...patch, page: 1 }),
      resetScroll: false,
    });
  };
  const resetAll = () => {
    void navigate({ search: {}, resetScroll: false });
  };

  if (query.demo === "error" || isError) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <Alert variant="destructive" className="mx-auto max-w-md">
          <AlertCircle className="h-5 w-5" aria-hidden="true" />
          <AlertTitle className="text-base font-bold text-[#1C1917]">
            Gagal memuat katalog
          </AlertTitle>
          <AlertDescription className="text-sm text-[#57534E]">
            Periksa koneksi lalu coba lagi.
          </AlertDescription>
          <Button
            type="button"
            onClick={resetAll}
            className="mt-4 rounded-full bg-[#BE185D] text-white hover:bg-[#9D174D]"
          >
            <RotateCcw size={16} aria-hidden="true" />
            Coba lagi
          </Button>
        </Alert>
      </main>
    );
  }

  const visibleItems = query.demo === "empty" ? [] : items;
  const loading = query.demo === "loading" || isPending;

  return (
    <main className="mx-auto max-w-7xl px-4 pb-6 sm:px-6" aria-label="Katalog">
      <Breadcrumb className="pt-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link to="/" />}>Beranda</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Katalog</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-[#1C1917] sm:text-2xl">
            Katalog Rangkaian Bunga &amp; Buket Delysa
          </h1>
          <p className="mt-0.5 text-xs text-[#57534E] sm:text-[13px]">
            Menampilkan {total} pilihan buket &amp; karangan segar siap kirim di
            Tasikmalaya
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {[
            { icon: Truck, label: "Pengiriman Cepat Tasikmalaya" },
            { icon: Flower2, label: "Bunga Segar Terawat" },
          ].map((chip) => (
            <span
              key={chip.label}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#EAE2DE] bg-white px-2.5 py-1 text-[11px] font-medium text-[#1C1917]"
            >
              <chip.icon
                size={12}
                aria-hidden="true"
                className="text-[#166534]"
              />
              {chip.label}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-3">
        <ActiveFilterChips
          query={query}
          onRemove={(key) => {
            if (key === "search") update({ search: undefined });
            else if (key === "category") update({ category: undefined });
            else update({ minPrice: undefined, maxPrice: undefined });
          }}
          onResetAll={resetAll}
        />
      </div>

      <div className="mt-3 flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2 lg:hidden">
          <Button
            type="button"
            variant="outline"
            onClick={() => setMobileFilterOpen(true)}
            className="h-10 gap-2 rounded-lg border-[#EAE2DE] bg-white px-3.5 text-xs font-semibold text-[#1C1917] hover:bg-[#FDF2F8] hover:text-[#9D174D]"
          >
            <SlidersHorizontal size={15} aria-hidden="true" />
            Filter Kategori &amp; Harga
            {activeFilterCount > 0 ? (
              <span className="inline-flex size-5 items-center justify-center rounded-full bg-[#BE185D] text-[10px] font-bold text-white tabular-nums">
                {activeFilterCount}
              </span>
            ) : null}
          </Button>
          {activeFilterCount > 0 ? (
            <button
              type="button"
              onClick={resetAll}
              className="text-xs font-semibold text-[#BE185D] underline-offset-4 hover:underline"
            >
              Reset
            </button>
          ) : null}
        </div>

        <CatalogToolbar
          query={query}
          categories={CATALOG_CATEGORIES}
          counts={counts}
          onSearch={(value) => update({ search: value || undefined })}
          onCategory={(value) => update({ category: value })}
          onSort={(value) => update({ sort: value })}
          resultCount={total}
        />
      </div>

      <Drawer open={mobileFilterOpen} onOpenChange={setMobileFilterOpen}>
        <DrawerContent className="max-w-sm p-0">
          <div className="flex h-full flex-col">
            <div className="border-b border-[#EAE2DE] pb-3">
              <DrawerTitle className="text-base font-bold text-[#1C1917]">
                Filter Produk
              </DrawerTitle>
              <DrawerDescription className="mt-0.5 text-xs text-[#57534E]">
                Saring buket berdasarkan kategori dan rentang harga.
              </DrawerDescription>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto py-3">
              <CatalogFilters
                query={query}
                categories={CATALOG_CATEGORIES}
                counts={counts}
                onCategory={(value) => update({ category: value })}
                onApplyPrice={(min, max) =>
                  update({ minPrice: min, maxPrice: max })
                }
                onReset={resetAll}
              />
            </div>
            <div className="border-t border-[#EAE2DE] pt-3">
              <Button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="h-10 w-full rounded-full bg-[#BE185D] text-xs font-bold text-white hover:bg-[#9D174D]"
              >
                Tampilkan {total} Produk
              </Button>
            </div>
          </div>
        </DrawerContent>
      </Drawer>

      <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-start">
        <div className="hidden w-60 shrink-0 lg:block">
          <CatalogFilters
            query={query}
            categories={CATALOG_CATEGORIES}
            counts={counts}
            onCategory={(value) => update({ category: value })}
            onApplyPrice={(min, max) =>
              update({ minPrice: min, maxPrice: max })
            }
            onReset={resetAll}
          />
        </div>
        <div className="min-w-0 flex-1">
          <CatalogGrid
            items={visibleItems}
            isPending={loading}
            onReset={resetAll}
          />
          <div className="mt-5">
            <CatalogPagination
              page={query.page}
              pageCount={pageCount}
              total={total}
              pageSize={CATALOG_PAGE_SIZE}
              onPage={(p) => {
                void navigate({
                  search: (prev) => ({ ...prev, page: p }),
                });
              }}
            />
          </div>
        </div>
      </div>

      <section aria-label="Jaminan belanja" className="mt-8">
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST_ITEMS.map((item) => (
            <li
              key={item.title}
              className="flex items-start gap-2.5 rounded-xl border border-[#EAE2DE] bg-white p-3.5"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#FDF2F8] text-[#BE185D] ring-1 ring-[#FBCFE8]">
                <item.icon size={18} aria-hidden="true" />
              </span>
              <span>
                <span className="block text-xs font-bold text-[#1C1917]">
                  {item.title}
                </span>
                <span className="block text-[11px] text-[#57534E]">
                  {item.subtitle}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
