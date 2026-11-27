import { cn } from "cn";
import { ORDER_TABS } from "~/features/shop/lib/order-filters";
import type { OrderTab } from "~/features/shop/types";

export function OrderHistoryTabs({
  value,
  counts,
  onChange,
}: {
  value: OrderTab;
  counts: Record<OrderTab, number>;
  onChange: (tab: OrderTab) => void;
}) {
  return (
    <div
      role="group"
      aria-label="Filter status pesanan"
      className="flex gap-2 overflow-x-auto pb-1"
    >
      {ORDER_TABS.map((tab) => {
        const active = tab.value === value;
        return (
          <button
            key={tab.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(tab.value)}
            className={cn(
              "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#BE185D]/40",
              active
                ? "border-[#BE185D] bg-[#BE185D] text-white"
                : "border-[#EAE2DE] bg-white text-[#57534E] hover:border-[#FBCFE8] hover:bg-[#FDF2F8]",
            )}
          >
            {tab.label}
            <span
              className={cn(
                "rounded-full px-1.5 py-0.5 text-[10px] font-bold tabular-nums",
                active
                  ? "bg-white/20 text-white"
                  : "bg-[#F5F0ED] text-[#57534E]",
              )}
            >
              {counts[tab.value]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
