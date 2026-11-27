import type { ColorId, ProductColor, ProductSize, SizeId } from '../types/product';
import { formatINR } from '../utils/commerce';
import { ColorSelector } from './ColorSelector';
import { DeliveryChecker } from './DeliveryChecker';
import { PurchaseActions } from './PurchaseActions';
import { QuantitySelector } from './QuantitySelector';
import { RatingStars } from './RatingStars';
import { SizeSelector } from './SizeSelector';
import { TrustBadges } from './TrustBadges';

interface ProductInformationProps {
  collection: string;
  name: string;
  rating: number;
  reviewCount: number;
  shortDescription: string;
  tags: string[];
  colors: ProductColor[];
  sizes: ProductSize[];
  selectedColorId: ColorId;
  selectedSizeId: SizeId;
  selectedColor: ProductColor;
  selectedSize: ProductSize;
  sku: string;
  discountPercent: number;
  availability: string;
  quantity: number;
  onSelectColor: (colorId: ColorId) => void;
  onSelectSize: (sizeId: SizeId) => void;
  onChangeQuantity: (quantity: number) => void;
  onOpenSizeGuide: () => void;
  onJumpToReviews: () => void;
  onAddToBag: () => void;
  onBuyNow: () => void;
}

export function ProductInformation({
  collection,
  name,
  rating,
  reviewCount,
  shortDescription,
  tags,
  colors,
  sizes,
  selectedColorId,
  selectedSizeId,
  selectedColor,
  selectedSize,
  sku,
  discountPercent,
  availability,
  quantity,
  onSelectColor,
  onSelectSize,
  onChangeQuantity,
  onOpenSizeGuide,
  onJumpToReviews,
  onAddToBag,
  onBuyNow,
}: ProductInformationProps) {
  return (
    <div className="lg:sticky lg:top-24 space-y-6">
      {/* Header Identity */}
      <div className="space-y-3 border-b border-[#E7E2DA] pb-5">
        <div className="flex items-center justify-between gap-4">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#8A542F] font-medium">
            {collection}
          </p>
          <span
            data-testid="product-sku"
            className="text-[11px] uppercase tracking-[0.08em] text-[#77736C] tabular-nums"
          >
            SKU: {sku}
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-normal leading-[1.12] text-[#24221F] [text-wrap:balance]">
          {name}
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-0.5">
          <button
            type="button"
            onClick={onJumpToReviews}
            className="inline-flex items-center gap-2 text-xs text-[#24221F] hover:text-[#8A542F] transition-colors focus-visible:outline-none focus-visible:underline"
          >
            <RatingStars rating={rating} />
            <span className="font-medium tabular-nums">{rating.toFixed(1)}</span>
            <span className="text-[#77736C] underline underline-offset-4">
              ({reviewCount} verified reviews)
            </span>
          </button>

          <span className="text-xs font-medium text-[#533621]">{availability}</span>
        </div>

        {/* Pricing Block */}
        <div className="flex items-baseline gap-3 pt-2">
          <span
            data-testid="product-price"
            className="text-2xl font-medium text-[#24221F] tabular-nums"
          >
            {formatINR(selectedSize.price)}
          </span>
          <span className="text-sm text-[#77736C] line-through tabular-nums">
            {formatINR(selectedSize.originalPrice)}
          </span>
          {discountPercent > 0 && (
            <span className="text-[11px] uppercase tracking-[0.12em] font-medium text-[#8A542F]">
              Save {discountPercent}%
            </span>
          )}
        </div>

        <p className="text-sm sm:text-[15px] leading-relaxed text-[#524D46] pt-1">
          {shortDescription}
        </p>

        {/* Unboxed quiet typographic attributes (Zero-Pill Discipline) */}
        <p className="text-xs text-[#77736C] pt-1">
          {tags.map((tag, index) => (
            <span key={tag}>
              {index > 0 && (
                <span aria-hidden="true" className="mx-2 text-[#B49A70]">
                  ·
                </span>
              )}
              <span>{tag}</span>
            </span>
          ))}
        </p>
      </div>

      {/* Variant Controls */}
      <div className="space-y-5">
        <ColorSelector
          colors={colors}
          selectedColorId={selectedColorId}
          onSelectColor={onSelectColor}
        />

        <SizeSelector
          sizes={sizes}
          selectedSizeId={selectedSizeId}
          onSelectSize={onSelectSize}
          onOpenSizeGuide={onOpenSizeGuide}
        />

        <QuantitySelector
          quantity={quantity}
          unitPrice={selectedSize.price}
          onChange={onChangeQuantity}
        />
      </div>

      {/* CTAs */}
      <PurchaseActions
        unitPrice={selectedSize.price}
        quantity={quantity}
        selectedColorName={selectedColor.name}
        selectedSizeName={selectedSize.name}
        onAddToBag={onAddToBag}
        onBuyNow={onBuyNow}
      />

      {/* Delivery & Fulfillment */}
      <DeliveryChecker orderAmount={selectedSize.price * quantity} />

      {/* Subtle Trust Strip */}
      <TrustBadges />
    </div>
  );
}
