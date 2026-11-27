import { Award, Check, Lock, RotateCcw, ShieldCheck } from 'lucide-react';

const TRUST_ITEMS = [
  { icon: Lock, label: 'Secure checkout' },
  { icon: Award, label: 'Artisan craftsmanship' },
  { icon: ShieldCheck, label: '100% Full-grain leather' },
  { icon: RotateCcw, label: 'Easy eligible returns' },
  { icon: Check, label: 'Quality inspected' },
];

const PAYMENT_METHODS = ['UPI', 'Visa', 'Mastercard', 'RuPay'];

export function TrustBadges() {
  return (
    <div className="border-t border-[#E7E2DA] pt-4 space-y-3">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-[#77736C]">
        {TRUST_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <span key={item.label} className="inline-flex items-center gap-1.5">
              <Icon className="w-3.5 h-3.5 stroke-[1.5] text-[#8A542F]" aria-hidden="true" />
              <span>{item.label}</span>
            </span>
          );
        })}
      </div>

      <div className="flex items-center justify-between gap-3 pt-1">
        <span className="text-[11px] uppercase tracking-[0.08em] text-[#77736C]">
          Accepted Payments
        </span>
        <div className="flex items-center gap-2">
          {PAYMENT_METHODS.map((method) => (
            <span
              key={method}
              className="px-2 py-0.5 text-[10px] font-medium tracking-[0.06em] uppercase text-[#533621] border border-[#E7E2DA] bg-[#EFECE5]/60"
            >
              {method}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
