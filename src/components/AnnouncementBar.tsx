import { X } from 'lucide-react';

interface AnnouncementBarProps {
  visible: boolean;
  onDismiss: () => void;
}

export function AnnouncementBar({ visible, onDismiss }: AnnouncementBarProps) {
  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Store announcements"
      className="bg-[#24221F] text-[#F7F5F0] text-xs tracking-wide border-b border-[#3A3631]"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 h-9 flex items-center justify-between gap-4">
        <div className="w-6 hidden sm:block" aria-hidden="true" />
        <p className="flex items-center justify-center gap-3 text-center truncate w-full sm:w-auto">
          <span className="font-medium">Complimentary shipping on orders above ₹5,000</span>
          <span className="hidden md:inline text-[#B49A70]" aria-hidden="true">
            ·
          </span>
          <span className="hidden md:inline text-[#D6CFC4]">Crafted slowly. Made to last.</span>
        </p>
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss announcement"
          className="text-[#D6CFC4] hover:text-white transition-colors p-1 -mr-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B49A70]"
        >
          <X className="w-3.5 h-3.5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
