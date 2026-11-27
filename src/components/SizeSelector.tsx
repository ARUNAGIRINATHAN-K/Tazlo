import { Ruler } from 'lucide-react';
import type { ProductSize, SizeId } from '../types/product';
import { formatINR } from '../utils/commerce';

interface SizeSelectorProps {
  sizes: ProductSize[];
  selectedSizeId: SizeId;
  onSelectSize: (sizeId: SizeId) => void;
  onOpenSizeGuide: () => void;
}

export function SizeSelector({
  sizes,
  selectedSizeId,
  onSelectSize,
  onOpenSizeGuide,
}: SizeSelectorProps) {
  const activeSize = sizes.find((s) => s.id === selectedSizeId) ?? sizes[1];

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between text-xs">
        <span className="uppercase tracking-[0.1em] text-[#77736C]">
          Size — <span className="text-[#24221F] font-medium">{activeSize.name}</span>
        </span>
        <button
          type="button"
          onClick={onOpenSizeGuide}
          className="inline-flex items-center gap-1.5 text-[#533621] hover:text-[#8A542F] underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A542F]"
        >
          <Ruler className="w-3.5 h-3.5 stroke-[1.5]" aria-hidden="true" />
          <span>Size Guide</span>
        </button>
      </div>

      <div
        role="radiogroup"
        aria-label="Select bag size"
        className="grid grid-cols-3 gap-2.5"
      >
        {sizes.map((size) => {
          const isSelected = size.id === selectedSizeId;
          return (
            <button
              key={size.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelectSize(size.id)}
              className={`py-2.5 px-3 text-left border transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A542F] ${
                isSelected
                  ? 'bg-[#24221F] text-[#F7F5F0] border-[#24221F]'
                  : 'bg-transparent text-[#24221F] border-[#D6CFC4] hover:border-[#24221F]'
              }`}
            >
              <span className="block text-sm font-medium whitespace-nowrap">{size.name}</span>
              <span
                className={`block text-xs tabular-nums mt-0.5 ${
                  isSelected ? 'text-[#D6CFC4]' : 'text-[#77736C]'
                }`}
              >
                {formatINR(size.price)}
              </span>
            </button>
          );
        })}
      </div>

      <p className="text-xs text-[#77736C] tabular-nums">
        {activeSize.dimensions} · {activeSize.capacity} · {activeSize.idealFor}
      </p>
    </div>
  );
}
