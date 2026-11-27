import { Textarea } from "~/components/ui/textarea";

interface CartInstructionsFieldProps {
  value: string;
  onChange: (v: string) => void;
}

export function CartInstructionsField({
  value,
  onChange,
}: CartInstructionsFieldProps) {
  return (
    <div className="rounded-xl border border-[#EAE2DE] bg-white p-3.5">
      <label
        htmlFor="cart-delivery-instructions"
        className="block text-sm font-semibold text-[#1C1917]"
      >
        Instruksi Jam Antar & Catatan Lokasi Tasikmalaya
      </label>
      <Textarea
        id="cart-delivery-instructions"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Contoh: Antar jam 10:00–11:00, rumah nomor 15 RT 03 RW 02, dekat masjid Al-Ikhlas"
        maxLength={300}
        rows={3}
        className="mt-1.5 w-full rounded-lg border border-[#D6CBC6] bg-white px-3 py-2 text-sm text-[#1C1917] placeholder:text-[#78716C] focus:border-[#BE185D] focus:outline-none focus:ring-1 focus:ring-[#BE185D] disabled:bg-[#FAF7F5]"
      />
      <p className="mt-1 text-right text-[11px] text-[#57534E] tabular-nums">
        {value.length}/300
      </p>
    </div>
  );
}
