import { ProductSize } from "@/types/product";
import clsx from "clsx";

interface SizeSelectorProps {
  sizes: ProductSize[];
  selectedSizeId: number | null;
  onSelect: (sizeId: number) => void;
}

export const SizeSelector = ({
  sizes,
  selectedSizeId,
  onSelect,
}: SizeSelectorProps) => {
  return (
    <div className="mt-8">
      <h3 className="text-sm font-semibold mb-2">Sizes</h3>

      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => {
          const isOutOfStock = size.stock === 0;
          const isSelected = size.id === selectedSizeId;
          return (
            <button
              key={size.id}
              type="button"
              disabled={isOutOfStock}
              onClick={() => onSelect(size.id)}
              className={clsx(
                "h-11 w-11 rounded-xl border text-sm font-semibold transition cursor-pointer",
                isSelected
                  ? "bg-zinc-900 text-white border-zinc-900"
                  : "bg-white text-zinc-900 border-zinc-200 hover:border-zinc-400",
                isOutOfStock &&
                  "cursor-not-allowed! opacity-30 hover:border-zinc-400",
              )}
            >
              {size.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
