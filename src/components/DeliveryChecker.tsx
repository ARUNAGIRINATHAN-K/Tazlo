import { useState, type FormEvent } from 'react';
import {
  CheckCircle2,
  Clock,
  Hammer,
  Loader2,
  MapPin,
  RotateCcw,
  ShieldCheck,
  Truck,
} from 'lucide-react';
import type { DeliveryEstimate } from '../types/product';
import { simulateDeliveryEstimate, validateIndianPin } from '../utils/commerce';

interface DeliveryCheckerProps {
  orderAmount: number;
}

const FULFILLMENT_ITEMS = [
  {
    icon: Truck,
    title: 'Free Shipping',
    detail: 'Complimentary shipping on orders above ₹5,000.',
  },
  {
    icon: Hammer,
    title: 'Crafted to Order',
    detail: 'Prepared and quality-checked by our artisans.',
  },
  {
    icon: Clock,
    title: 'Dispatch',
    detail: 'Ships within 5–7 business days.',
  },
  {
    icon: MapPin,
    title: 'Delivery',
    detail: 'Estimated delivery in 3–7 business days after dispatch.',
  },
  {
    icon: RotateCcw,
    title: 'Returns',
    detail: '14-day return window for eligible unused products.',
  },
  {
    icon: ShieldCheck,
    title: 'Warranty',
    detail: '1-year craftsmanship warranty.',
  },
];

export function DeliveryChecker({ orderAmount }: DeliveryCheckerProps) {
  const [pinInput, setPinInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [estimate, setEstimate] = useState<DeliveryEstimate | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validation = validateIndianPin(pinInput);
    if (!validation.valid) {
      setError(validation.error ?? 'Enter a valid 6-digit PIN code.');
      setEstimate(null);
      return;
    }

    setError(null);
    setIsLoading(true);
    window.setTimeout(() => {
      const result = simulateDeliveryEstimate(validation.cleaned, orderAmount);
      setEstimate(result);
      setIsLoading(false);
    }, 320);
  };

  return (
    <div className="border-t border-[#E7E2DA] pt-5 space-y-5">
      {/* PIN Code Simulator */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between gap-2">
          <label
            htmlFor="delivery-pin-input"
            className="text-xs uppercase tracking-[0.1em] text-[#24221F] font-medium"
          >
            Check Delivery Estimate
          </label>
          <span className="text-[11px] text-[#77736C]">Simulated estimate</span>
        </div>

        <form onSubmit={handleSubmit} className="flex items-stretch gap-2" noValidate>
          <input
            id="delivery-pin-input"
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={pinInput}
            onChange={(e) => {
              const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 6);
              setPinInput(digitsOnly);
              if (error) setError(null);
            }}
            placeholder="Enter 6-digit PIN (e.g. 400001)"
            aria-describedby={error ? 'pin-error-message' : undefined}
            className="flex-1 min-w-0 h-10 px-3 bg-[#F7F5F0] border border-[#D6CFC4] text-sm text-[#24221F] placeholder:text-[#9A948B] tabular-nums focus:outline-none focus:border-[#24221F]"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="h-10 px-4 bg-[#EFECE5] hover:bg-[#E7E2DA] text-[#24221F] border border-[#D6CFC4] text-xs font-medium uppercase tracking-[0.1em] whitespace-nowrap shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A542F] disabled:opacity-60"
          >
            {isLoading ? (
              <span className="inline-flex items-center gap-1.5">
                <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />
                Checking
              </span>
            ) : (
              'Check'
            )}
          </button>
        </form>

        {error && (
          <p
            id="pin-error-message"
            role="alert"
            className="text-xs text-[#8A2F2F]"
          >
            {error}
          </p>
        )}

        {estimate && (
          <div
            data-testid="delivery-estimate-result"
            className="p-3 bg-[#EFECE5]/80 border border-[#E7E2DA] text-xs space-y-1 text-[#24221F]"
          >
            <div className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#533621] shrink-0" aria-hidden="true" />
              <span>
                Available for PIN {estimate.pin} ({estimate.cityRegion})
              </span>
            </div>
            <p className="text-[#77736C] pl-5">
              Estimated arrival: <strong className="text-[#24221F] font-medium">{estimate.estimatedArrival}</strong> ·{' '}
              {estimate.freeShippingEligible ? 'Free shipping applies' : 'Standard ₹250 shipping'}
            </p>
            <p className="text-[11px] text-[#77736C] pl-5">
              Note: Simulated delivery estimate based on 5–7 business days artisan crafting.
            </p>
          </div>
        )}
      </div>

      {/* Fulfillment Summary Grid */}
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-3 pt-1">
        {FULFILLMENT_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="flex items-start gap-2.5">
              <Icon className="w-4 h-4 stroke-[1.5] text-[#8A542F] mt-0.5 shrink-0" aria-hidden="true" />
              <div>
                <dt className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#24221F]">
                  {item.title}
                </dt>
                <dd className="text-xs text-[#77736C] leading-relaxed">{item.detail}</dd>
              </div>
            </div>
          );
        })}
      </dl>
    </div>
  );
}
