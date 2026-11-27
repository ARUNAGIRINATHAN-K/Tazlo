import type {
  CartItem,
  ColorId,
  DeliveryEstimate,
  ProductColor,
  ProductSize,
  ReviewItem,
  ReviewSortOption,
  SizeId,
} from '../types/product';

export const FREE_SHIPPING_THRESHOLD = 5000;
export const STANDARD_SHIPPING_FEE = 250;
export const MIN_QUANTITY = 1;
export const MAX_QUANTITY = 10;

export function formatINR(amount: number): string {
  return `₹${Math.round(amount).toLocaleString('en-IN')}`;
}

export function calculateDiscountPercent(price: number, originalPrice: number): number {
  if (originalPrice <= 0 || price >= originalPrice) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

export function buildVariantSku(baseSku: string, colorSku: string, sizeSku: string): string {
  return `${baseSku}-${colorSku}-${sizeSku}`;
}

export function buildVariantKey(productId: string, colorId: string, sizeId: string): string {
  return `${productId}::${colorId}::${sizeId}`;
}

export function clampQuantity(value: number): number {
  if (!Number.isFinite(value)) return MIN_QUANTITY;
  const rounded = Math.floor(value);
  return Math.min(MAX_QUANTITY, Math.max(MIN_QUANTITY, rounded));
}

export function calculateCartTotals(items: CartItem[]): {
  itemCount: number;
  subtotal: number;
  shippingFee: number;
  total: number;
  amountToFreeShipping: number;
} {
  const itemCount = items.reduce((sum, item) => sum + Math.max(0, item.quantity), 0);
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * Math.max(0, item.quantity), 0);
  if (itemCount === 0) {
    return {
      itemCount: 0,
      subtotal: 0,
      shippingFee: 0,
      total: 0,
      amountToFreeShipping: FREE_SHIPPING_THRESHOLD,
    };
  }
  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;
  return {
    itemCount,
    subtotal,
    shippingFee,
    total: subtotal + shippingFee,
    amountToFreeShipping: Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal),
  };
}

export function upsertCartItem(items: CartItem[], incoming: CartItem): CartItem[] {
  const existingIndex = items.findIndex((item) => item.variantKey === incoming.variantKey);
  if (existingIndex === -1) {
    return [...items, { ...incoming, quantity: clampQuantity(incoming.quantity) }];
  }
  return items.map((item, idx) =>
    idx === existingIndex
      ? { ...item, quantity: clampQuantity(item.quantity + incoming.quantity) }
      : item
  );
}

export function updateCartItemQuantity(
  items: CartItem[],
  variantKey: string,
  nextQuantity: number
): CartItem[] {
  if (nextQuantity <= 0) {
    return items.filter((item) => item.variantKey !== variantKey);
  }
  return items.map((item) =>
    item.variantKey === variantKey ? { ...item, quantity: clampQuantity(nextQuantity) } : item
  );
}

export function validateIndianPin(rawPin: string): { valid: boolean; cleaned: string; error?: string } {
  const cleaned = rawPin.trim();
  if (!cleaned) {
    return { valid: false, cleaned, error: 'Please enter a 6-digit Indian PIN code.' };
  }
  if (!/^[1-9][0-9]{5}$/.test(cleaned)) {
    return {
      valid: false,
      cleaned,
      error: 'Enter a valid 6-digit Indian PIN code (cannot start with 0).',
    };
  }
  return { valid: true, cleaned };
}

const PIN_REGION_MAP: Record<string, { region: string; transitDays: [number, number] }> = {
  '1': { region: 'Delhi NCR & Northern India', transitDays: [3, 5] },
  '2': { region: 'Uttar Pradesh & Uttarakhand', transitDays: [4, 6] },
  '3': { region: 'Rajasthan & Gujarat', transitDays: [3, 5] },
  '4': { region: 'Maharashtra, Goa & MP', transitDays: [3, 4] },
  '5': { region: 'Bengaluru, Hyderabad & South', transitDays: [3, 5] },
  '6': { region: 'Chennai, Kerala & Tamil Nadu', transitDays: [4, 6] },
  '7': { region: 'Kolkata & Eastern India', transitDays: [4, 6] },
  '8': { region: 'Bihar & Jharkhand', transitDays: [5, 7] },
  '9': { region: 'Army Postal Service / Special Zone', transitDays: [6, 8] },
};

export function simulateDeliveryEstimate(
  pin: string,
  orderAmount: number,
  referenceDate: Date = new Date()
): DeliveryEstimate | null {
  const check = validateIndianPin(pin);
  if (!check.valid) return null;

  const firstDigit = check.cleaned[0];
  const zone = PIN_REGION_MAP[firstDigit] ?? { region: 'India Metro Network', transitDays: [4, 6] };

  // 5-7 business days craftsmanship + regional transit
  const minCalendarDays = 7 + zone.transitDays[0];
  const maxCalendarDays = 9 + zone.transitDays[1];

  const startDate = new Date(referenceDate.getTime());
  startDate.setDate(startDate.getDate() + minCalendarDays);
  const endDate = new Date(referenceDate.getTime());
  endDate.setDate(endDate.getDate() + maxCalendarDays);

  const fmt = (d: Date) =>
    d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });

  return {
    pin: check.cleaned,
    cityRegion: zone.region,
    dispatchWindow: '5–7 business days (crafted to order)',
    estimatedArrival: `${fmt(startDate)} – ${fmt(endDate)}`,
    freeShippingEligible: orderAmount >= FREE_SHIPPING_THRESHOLD,
    codAvailable: orderAmount <= 25000,
  };
}

export function validateEmailAddress(email: string): { valid: boolean; error?: string } {
  const trimmed = email.trim();
  if (!trimmed) {
    return { valid: false, error: 'Please enter your email address.' };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(trimmed)) {
    return { valid: false, error: 'Please enter a valid email address (e.g. name@domain.com).' };
  }
  return { valid: true };
}

export function sortReviews(reviews: ReviewItem[], sortBy: ReviewSortOption): ReviewItem[] {
  const copy = [...reviews];
  switch (sortBy) {
    case 'highest':
      return copy.sort((a, b) => b.rating - a.rating || b.timestamp - a.timestamp);
    case 'lowest':
      return copy.sort((a, b) => a.rating - b.rating || b.timestamp - a.timestamp);
    case 'newest':
    default:
      return copy.sort((a, b) => b.timestamp - a.timestamp);
  }
}

export function resolveVariantDetails(
  baseSku: string,
  colors: ProductColor[],
  sizes: ProductSize[],
  selectedColorId: ColorId,
  selectedSizeId: SizeId
): {
  color: ProductColor;
  size: ProductSize;
  sku: string;
  discountPercent: number;
  availability: string;
} {
  const color = colors.find((c) => c.id === selectedColorId) ?? colors[0];
  const size = sizes.find((s) => s.id === selectedSizeId) ?? sizes[1] ?? sizes[0];
  const sku = buildVariantSku(baseSku, color.skuCode, size.skuCode);
  const discountPercent = calculateDiscountPercent(size.price, size.originalPrice);
  const availability =
    color.availability !== 'In Stock'
      ? color.availability
      : size.availability !== 'In Stock'
      ? size.availability
      : 'In Stock';

  return {
    color,
    size,
    sku,
    discountPercent,
    availability,
  };
}
