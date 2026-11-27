import { useEffect, useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { formatINR } from '../utils/commerce';

interface PurchaseActionsProps {
  unitPrice: number;
  quantity: number;
  selectedColorName: string;
  selectedSizeName: string;
  onAddToBag: () => void;
  onBuyNow: () => void;
}

export function PurchaseActions({
  unitPrice,
  quantity,
  selectedColorName,
  selectedSizeName,
  onAddToBag,
  onBuyNow,
}: PurchaseActionsProps) {
  const [showMobileSticky, setShowMobileSticky] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowMobileSticky(window.scrollY > 520);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <div className="space-y-3 pt-1">
        <button
          type="button"
          onClick={onAddToBag}
          className="w-full h-12 px-6 bg-[#24221F] hover:bg-[#3A3630] active:scale-[0.995] text-[#F7F5F0] text-xs font-medium uppercase tracking-[0.14em] inline-flex items-center justify-center gap-2.5 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A542F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F5F0]"
        >
          <ShoppingBag className="w-4 h-4 stroke-[1.5]" aria-hidden="true" />
          <span>Add to Bag</span>
          <span aria-hidden="true" className="text-[#B49A70]">
            ·
          </span>
          <span className="tabular-nums">{formatINR(unitPrice * quantity)}</span>
        </button>

        <button
          type="button"
          onClick={onBuyNow}
          className="w-full h-12 px-6 bg-transparent hover:bg-[#EFECE5] text-[#24221F] border border-[#24221F] text-xs font-medium uppercase tracking-[0.14em] inline-flex items-center justify-center transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A542F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F5F0]"
        >
          Buy It Now
        </button>
      </div>

      {/* Mobile Sticky Purchase Bar (shows when scrolled past primary CTA, <= 56px tall) */}
      {showMobileSticky && (
        <div className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-[#F7F5F0]/95 backdrop-blur-sm border-t border-[#E7E2DA] px-4 h-14 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="text-sm font-semibold text-[#24221F] tabular-nums leading-tight">
              {formatINR(unitPrice)}
            </div>
            <div className="text-[11px] text-[#77736C] truncate">
              {selectedColorName} · {selectedSizeName}
            </div>
          </div>
          <button
            type="button"
            onClick={onAddToBag}
            className="h-10 px-5 bg-[#24221F] text-[#F7F5F0] text-[11px] font-medium uppercase tracking-[0.12em] inline-flex items-center gap-2 shrink-0 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A542F]"
          >
            <ShoppingBag className="w-3.5 h-3.5 stroke-[1.5]" aria-hidden="true" />
            <span>Add to Bag</span>
          </button>
        </div>
      )}
    </>
  );
}
