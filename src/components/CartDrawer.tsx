import { useEffect } from 'react';
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import type { CartItem } from '../types/product';
import {
  FREE_SHIPPING_THRESHOLD,
  MAX_QUANTITY,
  calculateCartTotals,
  formatINR,
} from '../utils/commerce';
import { ResilientImage } from './ResilientImage';

interface CartDrawerProps {
  open: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (variantKey: string, nextQuantity: number) => void;
  onRemoveItem: (variantKey: string) => void;
  onCheckout: () => void;
}

export function CartDrawer({
  open,
  items,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}: CartDrawerProps) {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;

  const totals = calculateCartTotals(items);
  const freeShippingProgress = Math.min(
    100,
    Math.round((totals.subtotal / FREE_SHIPPING_THRESHOLD) * 100)
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Bag"
      className="fixed inset-0 z-50 flex justify-end"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#24221F]/45 transition-opacity"
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <aside className="relative z-10 w-full max-w-md bg-[#F7F5F0] text-[#24221F] h-full flex flex-col border-l border-[#E7E2DA] shadow-2xl">
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#E7E2DA] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-4 h-4 stroke-[1.5] text-[#8A542F]" aria-hidden="true" />
            <h2 className="font-serif text-2xl font-normal">
              Your Bag <span className="text-base text-[#77736C] tabular-nums">({totals.itemCount})</span>
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close shopping bag"
            className="p-2 -mr-2 text-[#77736C] hover:text-[#24221F] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A542F]"
          >
            <X className="w-5 h-5 stroke-[1.5]" aria-hidden="true" />
          </button>
        </div>

        {/* Free Shipping Meter */}
        {items.length > 0 && (
          <div className="px-6 py-3 bg-[#EFECE5]/75 border-b border-[#E7E2DA] space-y-2">
            <p className="text-xs text-[#524D46]">
              {totals.amountToFreeShipping === 0
                ? 'Complimentary insured shipping unlocked.'
                : `Add ${formatINR(totals.amountToFreeShipping)} more for complimentary shipping.`}
            </p>
            <div className="h-1 bg-[#E7E2DA] w-full overflow-hidden">
              <div
                className="h-full bg-[#8A542F] transition-all duration-300"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Item List */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
              <ShoppingBag className="w-9 h-9 stroke-[1.25] text-[#B49A70]" aria-hidden="true" />
              <div className="space-y-1">
                <p className="font-serif text-xl text-[#24221F]">Your bag is empty</p>
                <p className="text-xs text-[#77736C] max-w-xs">
                  Explore The Heritage Messenger or pair it with small handcrafted leather goods.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="h-10 px-6 bg-[#24221F] text-[#F7F5F0] text-xs uppercase tracking-[0.12em]"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.variantKey}
                className="flex gap-4 pb-5 border-b border-[#E7E2DA] last:border-b-0"
              >
                <div className="w-20 h-20 bg-[#EFECE5] border border-[#E7E2DA] shrink-0 overflow-hidden">
                  <ResilientImage
                    src={item.image}
                    alt={`${item.name} in ${item.colorName}`}
                    fallbackLabel={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0 space-y-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-medium text-[#24221F] truncate">{item.name}</h3>
                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.variantKey)}
                      aria-label={`Remove ${item.name} (${item.colorName}, ${item.sizeName})`}
                      className="text-[#77736C] hover:text-[#8A2F2F] p-1 -mr-1 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5 stroke-[1.5]" aria-hidden="true" />
                    </button>
                  </div>

                  <p className="text-xs text-[#77736C]">
                    {item.colorName} · {item.sizeName}
                  </p>
                  <p className="text-[11px] text-[#9A948B] tabular-nums">SKU: {item.sku}</p>

                  <div className="flex items-center justify-between pt-2">
                    <div className="inline-flex items-center border border-[#D6CFC4]">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.variantKey, item.quantity - 1)}
                        aria-label={`Decrease quantity for ${item.name}`}
                        className="w-7 h-7 flex items-center justify-center hover:bg-[#EFECE5]"
                      >
                        <Minus className="w-3 h-3" aria-hidden="true" />
                      </button>
                      <span className="w-8 text-center text-xs font-medium tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.variantKey, item.quantity + 1)}
                        disabled={item.quantity >= MAX_QUANTITY}
                        aria-label={`Increase quantity for ${item.name}`}
                        className="w-7 h-7 flex items-center justify-center hover:bg-[#EFECE5] disabled:opacity-35"
                      >
                        <Plus className="w-3 h-3" aria-hidden="true" />
                      </button>
                    </div>

                    <div className="text-right tabular-nums">
                      <span className="block text-sm font-medium text-[#24221F]">
                        {formatINR(item.unitPrice * item.quantity)}
                      </span>
                      {item.quantity > 1 && (
                        <span className="block text-[11px] text-[#77736C]">
                          {formatINR(item.unitPrice)} each
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Totals */}
        {items.length > 0 && (
          <div className="px-6 py-5 bg-[#EFECE5]/65 border-t border-[#E7E2DA] space-y-4">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-[#524D46]">
                <span>Subtotal</span>
                <span data-testid="cart-subtotal" className="tabular-nums font-medium text-[#24221F]">
                  {formatINR(totals.subtotal)}
                </span>
              </div>
              <div className="flex justify-between text-[#524D46]">
                <span>Estimated Shipping</span>
                <span className="tabular-nums">
                  {totals.shippingFee === 0 ? 'Complimentary' : formatINR(totals.shippingFee)}
                </span>
              </div>
              <div className="flex justify-between text-base font-medium text-[#24221F] pt-2 border-t border-[#D6CFC4]">
                <span>Order Total</span>
                <span className="tabular-nums">{formatINR(totals.total)}</span>
              </div>
            </div>

            <p className="text-[11px] text-[#77736C]">
              Frontend demo storefront — checkout is simulated and does not process payments.
            </p>

            <div className="space-y-2.5">
              <button
                type="button"
                onClick={onCheckout}
                className="w-full h-11 bg-[#24221F] hover:bg-[#3A3630] text-[#F7F5F0] text-xs font-medium uppercase tracking-[0.14em] transition-colors"
              >
                Proceed to Checkout
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full h-10 border border-[#D6CFC4] hover:border-[#24221F] text-[#24221F] text-xs uppercase tracking-[0.12em] transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
