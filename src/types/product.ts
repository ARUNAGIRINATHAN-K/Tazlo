export type ColorId = 'saddle-brown' | 'dark-walnut' | 'black' | 'cognac';
export type SizeId = 'small' | 'medium' | 'large';
export type ProductTabId = 'details' | 'shipping' | 'reviews';
export type ReviewSortOption = 'newest' | 'highest' | 'lowest';

export interface ProductColor {
  id: ColorId;
  name: string;
  swatchHex: string;
  skuCode: string;
  availability: 'In Stock' | 'Low Stock — 3 Left';
  primaryImageIndex: number;
}

export interface ProductSize {
  id: SizeId;
  name: string;
  skuCode: string;
  price: number;
  originalPrice: number;
  dimensions: string;
  capacity: string;
  idealFor: string;
  laptopFit: string;
  availability: 'In Stock' | 'Low Stock — 2 Left';
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  label: string;
  colorId?: ColorId;
  aspectClass?: string;
}

export interface CartItem {
  variantKey: string;
  productId: string;
  name: string;
  colorName: string;
  colorId: ColorId | string;
  sizeName: string;
  sizeId: SizeId | string;
  sku: string;
  unitPrice: number;
  quantity: number;
  image: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  date: string;
  timestamp: number;
  verifiedDemo: boolean;
  variant: string;
  title: string;
  comment: string;
}

export interface RelatedProduct {
  id: string;
  sku: string;
  name: string;
  subtitle: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  hoverImage: string;
  description: string;
  material: string;
  dimensions: string;
  colorName: string;
}

export interface DeliveryEstimate {
  pin: string;
  cityRegion: string;
  dispatchWindow: string;
  estimatedArrival: string;
  freeShippingEligible: boolean;
  codAvailable: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface ToastMessage {
  id: string;
  message: string;
  tone: 'default' | 'success' | 'error';
}
