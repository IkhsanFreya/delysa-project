import { useEffect, useState } from "react";
import { LayoutGrid, Search } from "lucide-react";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import type { CatalogQuery, CatalogSortKey } from "~/features/shop/types";

const SORT_OPTIONS: { value: CatalogSortKey; label: string }[] = [
  { value: "termurah", label: "Harga: Termurah ke Termahal" },
  { value: "termahal", label: "Harga: Termahal ke Termurah" },
  { value: "terbaru", label: "Paling Baru" },
];

/**
 * Toolbar katalog: search (debounce 300ms), select kategori cepat,
 * select sort, dan hitungan hasil (aria-live). Tanpa import router —
 * semua perubahan diteruskan via callback.
 */
export function CatalogToolbar({
  query,
  categories,
  counts,
  onSearch,
  onCategory,
  onSort,
  resultCount,
}: {
  query: CatalogQuery;
  categories: string[];
  counts: Record<string, number>;
  onSearch: (value: string) => void;
  onCategory: (value: string | undefined) => void;
  onSort: (value: CatalogSortKey | undefined) => void;
  resultCount: number;
}) {
  const [draft, setDraft] = useState(query.search ?? "");

  useEffect(() => {
    setDraft(query.search ?? "");
  }, [query.search]);

  useEffect(() => {
    const id = setTimeout(() => {
      if (draft.trim() !== (query.search ?? "")) onSearch(draft.trim());
    }, 300);
    return () => clearTimeout(id);
  }, [draft]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2 md:flex-row md:flex-wrap md:items-center">
        <div className="flex h-11 w-full items-center overflow-hidden rounded-xl border-[1.5px] border-[#8C7E77] bg-white shadow-[0_1px_2px_rgba(28,25,23,0.05)] transition-[border-color,box-shadow] focus-within:border-[#BE185D] focus-within:ring-3 focus-within:ring-[#BE185D]/20 md:w-auto md:min-w-44 md:flex-1">
          <span
            aria-hidden="true"
            className="flex h-full shrink-0 items-center border-r border-[#D6CBC6] bg-[#FAF7F5] px-3 text-[#57534E]"
          >
            <Search size={16} />
          </span>
          <Input
            type="search"
            aria-label="Filter nama buket"
            placeholder="Filter nama buket…"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            className="h-full flex-1 rounded-none border-0 bg-transparent px-3 text-sm text-[#1C1917] placeholder:text-[#6B625C] focus-visible:border-0 focus-visible:ring-0"
          />
        </div>
        <Label className="w-full flex-col items-stretch gap-1.5 text-[11px] font-semibold tracking-wide text-[#57534E] uppercase md:w-auto md:flex-row md:items-center">
          Kategori:
          <Select
            value={query.category ?? null}
            onValueChange={(value) => onCategory(value ?? undefined)}
          >
            <SelectTrigger
              aria-label="Filter kategori cepat"
              className="h-11 w-full rounded-xl border-[1.5px] border-[#8C7E77]/80 bg-white px-3 text-xs font-medium normal-case text-[#1C1917] md:w-auto md:min-w-52"
            >
              <SelectValue placeholder="Semua" />
            </SelectTrigger>
            <SelectContent alignItemWithTrigger={false} className="rounded-lg">
              <SelectItem className="rounded-md text-xs">Semua</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c} value={c} className="rounded-md text-xs">
                  {c} ({counts[c] ?? 0})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Label>
        <Label className="w-full flex-col items-stretch gap-1.5 text-[11px] font-semibold tracking-wide text-[#57534E] uppercase md:w-auto md:flex-row md:items-center">
          Urutkan:
          <Select
            value={query.sort ?? null}
            onValueChange={(value) => onSort(value ?? undefined)}
          >
            <SelectTrigger
              aria-label="Urutkan produk"
              className="h-11 w-full rounded-xl border-[1.5px] border-[#8C7E77]/80 bg-white px-3 text-xs font-medium normal-case text-[#1C1917] md:w-auto md:min-w-52"
            >
              <SelectValue placeholder="Paling Relevan" />
            </SelectTrigger>
            <SelectContent alignItemWithTrigger={false} className="rounded-lg">
              <SelectItem className="rounded-md text-xs">
                Paling Relevan
              </SelectItem>
              {SORT_OPTIONS.map((o) => (
                <SelectItem
                  key={o.value}
                  value={o.value}
                  className="rounded-md text-xs"
                >
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Label>
      </div>
      <p aria-live="polite" className="text-xs text-[#6B7280]">
        Menampilkan{" "}
        <span className="font-bold text-[#1A1A1A]">{resultCount}</span> produk
        buket &amp; rangkaian
      </p>
    </div>
  );
}
