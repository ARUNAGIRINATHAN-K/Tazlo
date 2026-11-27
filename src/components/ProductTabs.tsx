import { useState } from 'react';
import { ChevronDown, PenLine } from 'lucide-react';
import type {
  FaqItem,
  ProductTabId,
  ReviewItem,
  ReviewSortOption,
} from '../types/product';
import { RATING_BREAKDOWN, SPECIFICATIONS_TABLE } from '../data/productData';
import { RatingStars } from './RatingStars';

interface ProductTabsProps {
  activeTab: ProductTabId;
  onSelectTab: (tab: ProductTabId) => void;
  storyParagraphs: string[];
  faqs: FaqItem[];
  reviews: ReviewItem[];
  reviewCount: number;
  rating: number;
  reviewSort: ReviewSortOption;
  onChangeReviewSort: (sort: ReviewSortOption) => void;
  onOpenWriteReview: () => void;
}

const TABS: { id: ProductTabId; label: string }[] = [
  { id: 'details', label: 'Details' },
  { id: 'shipping', label: 'Shipping & Returns' },
  { id: 'reviews', label: 'Reviews' },
];

export function ProductTabs({
  activeTab,
  onSelectTab,
  storyParagraphs,
  faqs,
  reviews,
  reviewCount,
  rating,
  reviewSort,
  onChangeReviewSort,
  onOpenWriteReview,
}: ProductTabsProps) {
  const [openFaqId, setOpenFaqId] = useState<string | null>(faqs[0]?.id ?? null);
  const [visibleReviewsCount, setVisibleReviewsCount] = useState(3);

  const displayedReviews = reviews.slice(0, visibleReviewsCount);
  const hasMoreReviews = visibleReviewsCount < reviews.length;

  return (
    <section
      id="product-details-tabs"
      aria-label="Product details, shipping, and reviews"
      className="max-w-[1440px] mx-auto px-4 sm:px-8 py-14 sm:py-20 border-t border-[#E7E2DA]"
    >
      {/* Tab Header */}
      <div
        role="tablist"
        aria-label="Product information tabs"
        className="flex items-center gap-6 sm:gap-10 border-b border-[#E7E2DA] overflow-x-auto no-scrollbar"
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              onClick={() => onSelectTab(tab.id)}
              className={`relative pb-3.5 text-xs sm:text-sm uppercase tracking-[0.14em] whitespace-nowrap shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A542F] ${
                isActive ? 'text-[#24221F] font-medium' : 'text-[#77736C] hover:text-[#24221F]'
              }`}
            >
              {tab.label}
              {tab.id === 'reviews' && (
                <span className="ml-1.5 text-xs tabular-nums text-[#77736C]">
                  ({reviewCount})
                </span>
              )}
              {isActive && (
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 inset-x-0 h-[1.5px] bg-[#24221F]"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Panel 1: Details */}
      {activeTab === 'details' && (
        <div
          id="panel-details"
          role="tabpanel"
          aria-labelledby="tab-details"
          className="pt-8 sm:pt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14"
        >
          <div className="lg:col-span-5 space-y-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#24221F]">
              Built for Quiet Utility
            </h2>
            <div className="space-y-4 text-sm sm:text-[15px] leading-[1.7] text-[#524D46] max-w-prose">
              {storyParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <h3 className="text-xs uppercase tracking-[0.14em] text-[#77736C] mb-4">
              Specifications
            </h3>
            <div className="border-t border-[#E7E2DA]">
              <table className="w-full text-left border-collapse">
                <tbody>
                  {SPECIFICATIONS_TABLE.map((row) => (
                    <tr key={row.label} className="border-b border-[#E7E2DA]">
                      <th
                        scope="row"
                        className="py-3.5 pr-6 text-xs uppercase tracking-[0.08em] font-medium text-[#77736C] w-2/5 align-top"
                      >
                        {row.label}
                      </th>
                      <td className="py-3.5 text-sm text-[#24221F]">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Panel 2: Shipping & Returns */}
      {activeTab === 'shipping' && (
        <div
          id="panel-shipping"
          role="tabpanel"
          aria-labelledby="tab-shipping"
          className="pt-8 sm:pt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14"
        >
          <div className="lg:col-span-6 space-y-8">
            <div>
              <h2 className="font-serif text-2xl font-normal text-[#24221F] mb-3">
                Shipping Policy
              </h2>
              <ul className="space-y-2 text-sm text-[#524D46] leading-relaxed list-disc pl-5">
                <li>Complimentary insured shipping on orders above ₹5,000.</li>
                <li>Workshop processing & finishing time: 5–7 business days.</li>
                <li>Transit delivery: 3–7 business days after dispatch across India.</li>
                <li>Shipment tracking link dispatched via email and SMS upon pickup.</li>
              </ul>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-[#E7E2DA]">
              <div>
                <h3 className="text-xs uppercase tracking-[0.12em] font-medium text-[#24221F] mb-2.5">
                  Returns & Exchanges
                </h3>
                <ul className="space-y-1.5 text-sm text-[#524D46] leading-relaxed">
                  <li>14-day return window from delivery</li>
                  <li>Product must be unused with tags</li>
                  <li>Original cotton dust bag & box required</li>
                  <li>Custom-made items may have restrictions</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xs uppercase tracking-[0.12em] font-medium text-[#24221F] mb-2.5">
                  Craftsmanship Warranty
                </h3>
                <ul className="space-y-1.5 text-sm text-[#524D46] leading-relaxed">
                  <li>1-year craftsmanship warranty included</li>
                  <li>Covers seam stitching & brass hardware</li>
                  <li>Covers manufacturing defects</li>
                  <li>Excludes normal wear, misuse, or accidental damage</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <h3 className="text-xs uppercase tracking-[0.14em] text-[#77736C] mb-4">
              Frequently Asked Questions
            </h3>
            <div className="border-t border-[#E7E2DA]">
              {faqs.map((faq) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <div key={faq.id} className="border-b border-[#E7E2DA]">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                      className="w-full py-4 flex items-center justify-between gap-4 text-left text-sm font-medium text-[#24221F] hover:text-[#8A542F] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A542F]"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`w-4 h-4 shrink-0 text-[#77736C] transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                    {isOpen && (
                      <p className="pb-4 text-sm leading-relaxed text-[#524D46]">{faq.answer}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Panel 3: Reviews */}
      {activeTab === 'reviews' && (
        <div
          id="panel-reviews"
          role="tabpanel"
          aria-labelledby="tab-reviews"
          className="pt-8 sm:pt-10 space-y-8"
        >
          {/* Rating Summary & Controls */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-8 border-b border-[#E7E2DA] items-start">
            <div className="lg:col-span-4 space-y-3">
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-5xl font-normal text-[#24221F] tabular-nums">
                  {rating.toFixed(1)}
                </span>
                <span className="text-sm text-[#77736C] tabular-nums">/ 5</span>
              </div>
              <div className="flex items-center gap-2.5">
                <RatingStars rating={rating} size="md" />
                <span className="text-sm text-[#524D46] tabular-nums">
                  {reviewCount} verified reviews
                </span>
              </div>
              <p className="text-xs text-[#77736C]">
                Sample data shown for storefront prototype demonstration. Submitted reviews save locally in your browser.
              </p>
            </div>

            <div className="lg:col-span-5 space-y-2">
              {RATING_BREAKDOWN.map((row) => (
                <div key={row.stars} className="flex items-center gap-3 text-xs">
                  <span className="w-12 text-[#524D46] tabular-nums shrink-0">
                    {row.stars} {row.stars === 1 ? 'star' : 'stars'}
                  </span>
                  <div className="flex-1 h-1.5 bg-[#E7E2DA] overflow-hidden">
                    <div
                      className="h-full bg-[#8A542F]"
                      style={{ width: `${row.percent}%` }}
                    />
                  </div>
                  <span className="w-9 text-right text-[#77736C] tabular-nums shrink-0">
                    {row.percent}%
                  </span>
                </div>
              ))}
            </div>

            <div className="lg:col-span-3 flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end justify-between gap-3">
              <button
                type="button"
                onClick={onOpenWriteReview}
                className="inline-flex items-center justify-center gap-2 h-10 px-5 bg-[#24221F] hover:bg-[#3A3630] text-[#F7F5F0] text-xs font-medium uppercase tracking-[0.12em] whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A542F]"
              >
                <PenLine className="w-3.5 h-3.5 stroke-[1.5]" aria-hidden="true" />
                <span>Write a Review</span>
              </button>

              <div className="flex items-center gap-2">
                <label htmlFor="review-sort-select" className="text-xs text-[#77736C]">
                  Sort by
                </label>
                <select
                  id="review-sort-select"
                  value={reviewSort}
                  onChange={(e) => onChangeReviewSort(e.target.value as ReviewSortOption)}
                  className="h-9 px-3 bg-[#F7F5F0] border border-[#D6CFC4] text-xs text-[#24221F] focus:outline-none focus:border-[#24221F]"
                >
                  <option value="newest">Most Recent</option>
                  <option value="highest">Highest Rating</option>
                  <option value="lowest">Lowest Rating</option>
                </select>
              </div>
            </div>
          </div>

          {/* Review Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayedReviews.map((review) => (
              <article
                key={review.id}
                className="p-6 bg-[#EFECE5]/45 border border-[#E7E2DA] flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <RatingStars rating={review.rating} />
                    <span className="text-[11px] text-[#77736C] tabular-nums">{review.date}</span>
                  </div>
                  <h3 className="text-sm font-medium text-[#24221F]">{review.title}</h3>
                  <p className="text-sm text-[#524D46] leading-relaxed">“{review.comment}”</p>
                </div>

                <div className="pt-3 border-t border-[#E7E2DA] text-xs space-y-0.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium text-[#24221F]">{review.author}</span>
                    <span className="text-[#8A542F]">Sample Purchase</span>
                  </div>
                  <p className="text-[#77736C]">Variant: {review.variant}</p>
                </div>
              </article>
            ))}
          </div>

          {hasMoreReviews && (
            <div className="flex justify-center pt-2">
              <button
                type="button"
                onClick={() => setVisibleReviewsCount((prev) => prev + 3)}
                className="h-10 px-6 border border-[#24221F] text-xs uppercase tracking-[0.12em] text-[#24221F] hover:bg-[#EFECE5] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A542F]"
              >
                Load More Reviews ({reviews.length - visibleReviewsCount} remaining)
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
