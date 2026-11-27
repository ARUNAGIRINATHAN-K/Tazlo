import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Eye, ShoppingBag } from 'lucide-react';
import type { RelatedProduct } from '../types/product';
import { formatINR } from '../utils/commerce';
import { ResilientImage } from './ResilientImage';

interface RelatedProductsCarouselProps {
  products: RelatedProduct[];
  onQuickView: (product: RelatedProduct) => void;
  onAddRelatedToBag: (product: RelatedProduct) => void;
}

export function RelatedProductsCarousel({
  products,
  onQuickView,
  onAddRelatedToBag,
}: RelatedProductsCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const scrollTrack = (direction: 'prev' | 'next') => {
    const el = trackRef.current;
    if (!el) return;
    const step = Math.max(280, el.clientWidth * 0.65);
    el.scrollBy({
      left: direction === 'next' ? step : -step,
      behavior: 'smooth',
    });
  };

  return (
    <section
      id="related-collection"
      aria-label="Complete Your Collection"
      className="max-w-[1440px] mx-auto px-4 sm:px-8 py-16 sm:py-24"
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
        <div className="space-y-2">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#8A542F]">
            Curated Companions
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#24221F]">
            Complete Your Collection
          </h2>
          <p className="text-sm text-[#77736C]">
            Discover pieces made with the same attention to detail.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-end">
          <button
            type="button"
            onClick={() => scrollTrack('prev')}
            aria-label="Scroll related products left"
            className="w-10 h-10 flex items-center justify-center border border-[#D6CFC4] text-[#24221F] hover:border-[#24221F] hover:bg-[#EFECE5] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A542F]"
          >
            <ChevronLeft className="w-4 h-4 stroke-[1.5]" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => scrollTrack('next')}
            aria-label="Scroll related products right"
            className="w-10 h-10 flex items-center justify-center border border-[#D6CFC4] text-[#24221F] hover:border-[#24221F] hover:bg-[#EFECE5] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A542F]"
          >
            <ChevronRight className="w-4 h-4 stroke-[1.5]" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Horizontal Carousel */}
      <div
        ref={trackRef}
        className="flex lg:grid lg:grid-cols-4 gap-6 overflow-x-auto lg:overflow-visible snap-x snap-mandatory no-scrollbar pb-2 lg:pb-0"
      >
        {products.map((product) => {
          const isHovered = hoveredId === product.id;
          return (
            <article
              key={product.id}
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="w-[78vw] sm:w-[46vw] lg:w-auto shrink-0 snap-start flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-[4/3] bg-[#EFECE5] border border-[#E7E2DA] overflow-hidden mb-3.5">
                  <button
                    type="button"
                    onClick={() => onQuickView(product)}
                    aria-label={`Inspect ${product.name}`}
                    className="block w-full h-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#8A542F]"
                  >
                    <ResilientImage
                      src={isHovered ? product.hoverImage : product.image}
                      alt={`${product.name} — ${product.subtitle}`}
                      fallbackLabel={product.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </button>

                  <button
                    type="button"
                    onClick={() => onQuickView(product)}
                    aria-label={`Quick view ${product.name}`}
                    className="absolute top-3 right-3 h-8 px-2.5 bg-[#F7F5F0]/90 hover:bg-[#F7F5F0] border border-[#E7E2DA] text-[11px] uppercase tracking-[0.08em] text-[#24221F] inline-flex items-center gap-1.5 opacity-95 lg:opacity-0 lg:group-hover:opacity-100 focus-visible:opacity-100 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A542F]"
                  >
                    <Eye className="w-3.5 h-3.5 stroke-[1.5]" aria-hidden="true" />
                    <span>Quick View</span>
                  </button>
                </div>

                <div className="space-y-1">
                  <p className="text-[11px] uppercase tracking-[0.12em] text-[#77736C]">
                    {product.category}
                  </p>
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="text-base font-medium text-[#24221F]">
                      <button
                        type="button"
                        onClick={() => onQuickView(product)}
                        className="text-left hover:text-[#8A542F] transition-colors focus-visible:outline-none focus-visible:underline"
                      >
                        {product.name}
                      </button>
                    </h3>
                    <div className="flex items-baseline gap-2 shrink-0 tabular-nums">
                      <span className="text-sm font-medium text-[#24221F]">
                        {formatINR(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-[#77736C] line-through">
                          {formatINR(product.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-[#77736C]">{product.subtitle}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onAddRelatedToBag(product)}
                className="mt-4 w-full h-10 px-4 border border-[#D6CFC4] hover:border-[#24221F] hover:bg-[#24221F] hover:text-[#F7F5F0] text-[#24221F] text-xs uppercase tracking-[0.12em] inline-flex items-center justify-center gap-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A542F]"
              >
                <ShoppingBag className="w-3.5 h-3.5 stroke-[1.5]" aria-hidden="true" />
                <span>Add to Bag</span>
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}
