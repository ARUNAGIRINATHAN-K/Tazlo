import type { ColorId, ProductColor } from '../types/product';

interface ColorSelectorProps {
  colors: ProductColor[];
  selectedColorId: ColorId;
  onSelectColor: (colorId: ColorId) => void;
}

export function ColorSelector({
  colors,
  selectedColorId,
  onSelectColor,
}: ColorSelectorProps) {
  const activeColor = colors.find((c) => c.id === selectedColorId) ?? colors[0];

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between text-xs">
        <span className="uppercase tracking-[0.1em] text-[#77736C]">
          Color — <span className="text-[#24221F] font-medium">{activeColor.name}</span>
        </span>
        <span className="text-[#77736C]">{activeColor.availability}</span>
      </div>

      <div role="radiogroup" aria-label="Select leather color" className="flex items-center gap-3.5">
        {colors.map((color) => {
          const isSelected = color.id === selectedColorId;
          return (
            <button
              key={color.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              aria-label={`Color: ${color.name}`}
              title={color.name}
              onClick={() => onSelectColor(color.id)}
              className={`group relative w-9 h-9 rounded-full flex items-center justify-center transition-transform duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A542F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F5F0] ${
                isSelected
                  ? 'ring-1 ring-[#24221F] ring-offset-2 ring-offset-[#F7F5F0]'
                  : 'hover:scale-105'
              }`}
            >
              <span
                className="w-7 h-7 rounded-full border border-black/15 shadow-inner block"
                style={{ backgroundColor: color.swatchHex }}
                aria-hidden="true"
              />
              <span className="sr-only">{color.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
