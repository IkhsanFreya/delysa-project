import { DownloadIcon, PlusIcon } from "lucide-react";
import { Button } from "~/components/ui/button";

export function ProductsPageHeader({
  onAdd,
  onExport,
}: {
  onAdd: () => void;
  onExport: () => void;
}) {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
      <div className="min-w-0">
        <p className="text-[11px] font-semibold tracking-[0.14em] text-[#BE185D] uppercase">
          Katalog &amp; Inventaris
        </p>
        <h1 className="mt-1 text-2xl font-extrabold tracking-tight sm:text-3xl">
          Produk
        </h1>
        <p className="mt-1 max-w-xl text-sm leading-relaxed text-[#6B7280]">
          Kelola produk, pantau stok, dan atur tampilan katalog toko Anda.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onExport}
          className="h-10 gap-1.5 rounded-lg border-[#E5E7EB] px-3 text-xs font-semibold text-[#4B5563]"
        >
          <DownloadIcon size={14} aria-hidden="true" />
          Export
        </Button>

        <Button
          type="button"
          onClick={onAdd}
          className="h-10 gap-1.5 rounded-lg bg-[#BE185D] px-4 text-xs font-semibold text-white hover:bg-[#9D174D]"
        >
          <PlusIcon size={15} aria-hidden="true" />
          Tambah Produk
        </Button>
      </div>
    </div>
  );
}
