import { Minus, Plus } from 'lucide-react';
import { MAX_QUANTITY, MIN_QUANTITY, formatINR } from '../utils/commerce';

interface QuantitySelectorProps {
  quantity: number;
  unitPrice: number;
  onChange: (nextQuantity: number) => void;
}

export function QuantitySelector({
  quantity,
  unitPrice,
  onChange,
}: QuantitySelectorProps) {
  const canDecrement = quantity > MIN_QUANTITY;
  const canIncrement = quantity < MAX_QUANTITY;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="uppercase tracking-[0.1em] text-[#77736C]">Quantity</span>
        <span className="text-[#77736C] tabular-nums">
          Subtotal: <span className="text-[#24221F] font-medium">{formatINR(unitPrice * quantity)}</span>
        </span>
      </div>

      <div className="inline-flex items-center border border-[#D6CFC4] bg-[#F7F5F0]">
        <button
          type="button"
          onClick={() => canDecrement && onChange(quantity - 1)}
          disabled={!canDecrement}
          aria-label="Decrease quantity"
          className="w-11 h-11 flex items-center justify-center text-[#24221F] hover:bg-[#EFECE5] disabled:opacity-35 disabled:hover:bg-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A542F]"
        >
          <Minus className="w-3.5 h-3.5 stroke-[1.5]" aria-hidden="true" />
        </button>
        <span
          data-testid="product-quantity-value"
          aria-live="polite"
          className="w-12 text-center text-sm font-medium tabular-nums select-none"
        >
          {quantity}
        </span>
        <button
          type="button"
          onClick={() => canIncrement && onChange(quantity + 1)}
          disabled={!canIncrement}
          aria-label="Increase quantity"
          className="w-11 h-11 flex items-center justify-center text-[#24221F] hover:bg-[#EFECE5] disabled:opacity-35 disabled:hover:bg-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A542F]"
        >
          <Plus className="w-3.5 h-3.5 stroke-[1.5]" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
