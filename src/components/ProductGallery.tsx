import { useState, type KeyboardEvent, type MouseEvent } from 'react';
import { ChevronLeft, ChevronRight, Expand, ZoomIn, ZoomOut } from 'lucide-react';
import type { GalleryImage } from '../types/product';
import { ResilientImage } from './ResilientImage';

interface ProductGalleryProps {
  images: GalleryImage[];
  activeIndex: number;
  onSelectImage: (index: number) => void;
  onOpenLightbox: () => void;
  colorName: string;
}

export function ProductGallery({
  images,
  activeIndex,
  onSelectImage,
  onOpenLightbox,
  colorName,
}: ProductGalleryProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });

  const safeIndex = activeIndex >= 0 && activeIndex < images.length ? activeIndex : 0;
  const activeImage = images[safeIndex];

  const handlePrev = () => {
    const next = safeIndex === 0 ? images.length - 1 : safeIndex - 1;
    onSelectImage(next);
  };

  const handleNext = () => {
    const next = safeIndex === images.length - 1 ? 0 : safeIndex + 1;
    onSelectImage(next);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    }
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.min(100, Math.max(0, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.min(100, Math.max(0, ((e.clientY - rect.top) / rect.height) * 100));
    setZoomOrigin({ x, y });
  };

  return (
    <div
      className="flex flex-col-reverse lg:flex-row gap-3 sm:gap-4"
      onKeyDown={handleKeyDown}
    >
      {/* Thumbnails: Horizontal strip on mobile/tablet, Vertical rail on desktop */}
      <div
        role="region"
        aria-label="Product image thumbnails"
        className="flex lg:flex-col gap-2.5 overflow-x-auto lg:overflow-visible no-scrollbar lg:w-20 shrink-0 pb-1 lg:pb-0"
      >
        {images.map((img, idx) => {
          const isActive = idx === safeIndex;
          return (
            <button
              key={img.id}
              type="button"
              onClick={() => onSelectImage(idx)}
              aria-label={`View image ${idx + 1}: ${img.label}`}
              aria-pressed={isActive}
              className={`relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 overflow-hidden bg-[#EFECE5] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A542F] ${
                isActive
                  ? 'ring-1 ring-[#24221F] opacity-100'
                  : 'border border-[#E7E2DA] opacity-70 hover:opacity-100'
              }`}
            >
              <ResilientImage
                src={img.src}
                alt={img.alt}
                fallbackLabel={img.label}
                className="w-full h-full object-cover"
              />
            </button>
          );
        })}
      </div>

      {/* Primary Image Stage */}
      <div className="relative flex-1 bg-[#EFECE5] border border-[#E7E2DA] overflow-hidden group">
        {/* Quiet editorial top-left text marker */}
        <div className="absolute top-4 left-4 z-10 pointer-events-none">
          <span className="text-[11px] uppercase tracking-[0.16em] text-[#24221F]/80 bg-[#F7F5F0]/85 px-2.5 py-1 border border-[#E7E2DA]">
            Handcrafted · {colorName}
          </span>
        </div>

        {/* Top-right gallery controls: Zoom & Lightbox */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsZoomed((prev) => !prev)}
            aria-label={isZoomed ? 'Zoom out image' : 'Zoom in image'}
            aria-pressed={isZoomed}
            className="w-9 h-9 flex items-center justify-center bg-[#F7F5F0]/90 hover:bg-[#F7F5F0] text-[#24221F] border border-[#E7E2DA] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A542F]"
          >
            {isZoomed ? (
              <ZoomOut className="w-4 h-4 stroke-[1.5]" aria-hidden="true" />
            ) : (
              <ZoomIn className="w-4 h-4 stroke-[1.5]" aria-hidden="true" />
            )}
          </button>
          <button
            type="button"
            onClick={onOpenLightbox}
            aria-label="Open fullscreen lightbox"
            className="w-9 h-9 flex items-center justify-center bg-[#F7F5F0]/90 hover:bg-[#F7F5F0] text-[#24221F] border border-[#E7E2DA] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A542F]"
          >
            <Expand className="w-4 h-4 stroke-[1.5]" aria-hidden="true" />
          </button>
        </div>

        {/* Image Viewport */}
        <div
          onClick={() => {
            if (!isZoomed) onOpenLightbox();
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setIsZoomed(false)}
          className={`relative aspect-[4/3] lg:aspect-[5/4] w-full overflow-hidden ${
            isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
          }`}
        >
          <div
            className="w-full h-full transition-transform duration-300 ease-out"
            style={
              isZoomed
                ? {
                    transform: 'scale(1.85)',
                    transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%`,
                  }
                : undefined
            }
          >
            <ResilientImage
              key={activeImage.id}
              src={activeImage.src}
              alt={activeImage.alt}
              fallbackLabel={activeImage.label}
              className="w-full h-full object-cover transition-opacity duration-300"
            />
          </div>
        </div>

        {/* Previous / Next Navigation Arrows */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous product image"
          className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-[#F7F5F0]/80 hover:bg-[#F7F5F0] text-[#24221F] border border-[#E7E2DA] opacity-85 lg:opacity-0 lg:group-hover:opacity-100 focus-visible:opacity-100 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A542F]"
        >
          <ChevronLeft className="w-4 h-4 stroke-[1.5]" aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Next product image"
          className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-[#F7F5F0]/80 hover:bg-[#F7F5F0] text-[#24221F] border border-[#E7E2DA] opacity-85 lg:opacity-0 lg:group-hover:opacity-100 focus-visible:opacity-100 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A542F]"
        >
          <ChevronRight className="w-4 h-4 stroke-[1.5]" aria-hidden="true" />
        </button>

        {/* Bottom Caption & Counter */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#F7F5F0] border-t border-[#E7E2DA] text-xs text-[#77736C]">
          <span className="truncate">{activeImage.label}</span>
          <span data-testid="gallery-counter" className="tabular-nums shrink-0 ml-4">
            {String(safeIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
          </span>
        </div>
      </div>
    </div>
  );
}
