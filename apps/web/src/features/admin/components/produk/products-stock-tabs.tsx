import { Tabs, TabsList, TabsTab } from "~/components/ui/tabs";
import type {
  ProductStockFilter,
  ProductStockStatus,
} from "../../lib/products/product.types";

export type StockTabCounts = Record<ProductStockFilter, number>;

const TABS: { value: ProductStockFilter; label: string }[] = [
  { value: "all", label: "Semua Produk" },
  { value: "aman", label: "Aman" },
  { value: "habis", label: "Habis" },
  { value: "menipis", label: "Menipis" },
];

/** Tab filter stok berbentuk pill; nilai tab memakai status stok yang sama dengan filter. */
export function ProductsStockTabs({
  value,
  counts,
  onChange,
}: {
  value: ProductStockStatus | "all";
  counts: StockTabCounts;
  onChange: (next: ProductStockStatus | "all") => void;
}) {
  return (
    <Tabs
      value={value}
      onValueChange={(next) => onChange(next as ProductStockFilter)}
    >
      <TabsList
        aria-label="Filter status stok produk"
        className="flex w-full flex-wrap gap-2 border-b-0 sm:w-auto"
      >
        {TABS.map((tab) => (
          <TabsTab
            key={tab.value}
            value={tab.value}
            className="-mb-0 rounded-full border border-[#EAE2DE] bg-white px-3 py-2 text-[11px] font-semibold text-[#57534E] transition-colors hover:border-[#BE185D]/40 hover:text-[#9D174D] data-[active]:border-[#BE185D] data-[active]:bg-[#FDF2F8] data-[active]:text-[#9D174D] sm:px-4 sm:text-xs"
          >
            {tab.label} ({counts[tab.value]})
          </TabsTab>
        ))}
      </TabsList>
    </Tabs>
  );
}
