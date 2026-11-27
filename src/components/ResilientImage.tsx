import { useState } from 'react';
import { Briefcase } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
  loading?: 'eager' | 'lazy';
}

export function ResilientImage({
  src,
  alt,
  className = 'w-full h-full object-cover',
  fallbackLabel,
  loading = 'eager',
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#EDE8DF] to-[#DFD7CA] text-[#533621] p-6 text-center"
      >
        <Briefcase className="w-8 h-8 stroke-[1.25] mb-2 opacity-70" aria-hidden="true" />
        <span className="font-serif text-base tracking-wide">
          {fallbackLabel || 'TAZLO Heritage Leather'}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
