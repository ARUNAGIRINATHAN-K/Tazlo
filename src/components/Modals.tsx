import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Search,
  ShoppingBag,
  Star,
  X,
} from 'lucide-react';
import type {
  CartItem,
  GalleryImage,
  ProductSize,
  RelatedProduct,
  ReviewItem,
} from '../types/product';
import { calculateCartTotals, formatINR, validateEmailAddress, validateIndianPin } from '../utils/commerce';
import { ResilientImage } from './ResilientImage';

interface ModalShellProps {
  open: boolean;
  title: string;
  onClose: () => void;
  maxWidthClass?: string;
  children: ReactNode;
}

function ModalShell({
  open,
  title,
  onClose,
  maxWidthClass = 'max-w-xl',
  children,
}: ModalShellProps) {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
    >
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#24221F]/55 backdrop-blur-[2px]"
        aria-hidden="true"
      />
      <div
        className={`relative z-10 w-full ${maxWidthClass} bg-[#F7F5F0] text-[#24221F] border border-[#E7E2DA] shadow-2xl max-h-[90vh] flex flex-col`}
      >
        <div className="px-6 py-4 border-b border-[#E7E2DA] flex items-center justify-between gap-4 shrink-0">
          <h2 className="font-serif text-2xl font-normal text-[#24221F]">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={`Close ${title}`}
            className="p-1.5 -mr-1.5 text-[#77736C] hover:text-[#24221F] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A542F]"
          >
            <X className="w-5 h-5 stroke-[1.5]" aria-hidden="true" />
          </button>
        </div>
        <div className="overflow-y-auto p-6">{children}</div>
      </div>
    </div>
  );
}

/* 1. Lightbox Modal */
export function LightboxModal({
  open,
  images,
  activeIndex,
  onChangeIndex,
  onClose,
}: {
  open: boolean;
  images: GalleryImage[];
  activeIndex: number;
  onChangeIndex: (idx: number) => void;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft')
        onChangeIndex(activeIndex === 0 ? images.length - 1 : activeIndex - 1);
      if (e.key === 'ArrowRight')
        onChangeIndex(activeIndex === images.length - 1 ? 0 : activeIndex + 1);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, activeIndex, images.length, onChangeIndex, onClose]);

  if (!open) return null;

  const current = images[activeIndex] ?? images[0];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Fullscreen product gallery"
      className="fixed inset-0 z-50 bg-[#1B1917]/95 text-[#F7F5F0] flex flex-col justify-between p-4 sm:p-6"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-[0.14em] text-[#D6CFC4] tabular-nums">
          {String(activeIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')} —{' '}
          {current.label}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close lightbox"
          className="p-2 text-[#D6CFC4] hover:text-white transition-colors"
        >
          <X className="w-6 h-6 stroke-[1.5]" aria-hidden="true" />
        </button>
      </div>

      <div className="relative flex-1 flex items-center justify-center my-4 min-h-0">
        <button
          type="button"
          onClick={() => onChangeIndex(activeIndex === 0 ? images.length - 1 : activeIndex - 1)}
          aria-label="Previous image in lightbox"
          className="absolute left-2 sm:left-6 z-10 w-11 h-11 flex items-center justify-center bg-[#24221F]/80 hover:bg-[#24221F] border border-[#3E3A34] text-[#F7F5F0]"
        >
          <ChevronLeft className="w-5 h-5 stroke-[1.5]" aria-hidden="true" />
        </button>

        <div className="max-w-4xl max-h-full aspect-[4/3] w-full flex items-center justify-center overflow-hidden">
          <ResilientImage
            src={current.src}
            alt={current.alt}
            fallbackLabel={current.label}
            className="max-h-[72vh] w-auto object-contain"
          />
        </div>

        <button
          type="button"
          onClick={() => onChangeIndex(activeIndex === images.length - 1 ? 0 : activeIndex + 1)}
          aria-label="Next image in lightbox"
          className="absolute right-2 sm:right-6 z-10 w-11 h-11 flex items-center justify-center bg-[#24221F]/80 hover:bg-[#24221F] border border-[#3E3A34] text-[#F7F5F0]"
        >
          <ChevronRight className="w-5 h-5 stroke-[1.5]" aria-hidden="true" />
        </button>
      </div>

      <div className="flex items-center justify-center gap-2.5 overflow-x-auto no-scrollbar pb-1">
        {images.map((img, idx) => (
          <button
            key={img.id}
            type="button"
            onClick={() => onChangeIndex(idx)}
            aria-label={`Select lightbox image ${idx + 1}`}
            className={`w-14 h-14 overflow-hidden border transition-opacity shrink-0 ${
              idx === activeIndex
                ? 'border-[#B49A70] opacity-100'
                : 'border-[#3E3A34] opacity-50 hover:opacity-85'
            }`}
          >
            <ResilientImage src={img.src} alt={img.alt} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

/* 2. Size Guide Modal */
export function SizeGuideModal({
  open,
  sizes,
  selectedSizeId,
  onSelectSize,
  onClose,
}: {
  open: boolean;
  sizes: ProductSize[];
  selectedSizeId: string;
  onSelectSize: (sizeId: ProductSize['id']) => void;
  onClose: () => void;
}) {
  return (
    <ModalShell open={open} title="Size & Fit Guide" onClose={onClose} maxWidthClass="max-w-2xl">
      <div className="space-y-5">
        <p className="text-sm text-[#524D46] leading-relaxed">
          All Heritage Messengers are measured externally in centimeters. Choose Medium or Large for
          comfortable 14-inch laptop carry.
        </p>

        <div className="overflow-x-auto border border-[#E7E2DA]">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-[#EFECE5] border-b border-[#E7E2DA] text-xs uppercase tracking-[0.08em] text-[#77736C]">
                <th className="py-3 px-4 font-medium">Size</th>
                <th className="py-3 px-4 font-medium">Dimensions</th>
                <th className="py-3 px-4 font-medium">Capacity</th>
                <th className="py-3 px-4 font-medium">Ideal For</th>
                <th className="py-3 px-4 font-medium text-right">Price</th>
              </tr>
            </thead>
            <tbody>
              {sizes.map((size) => {
                const isSelected = size.id === selectedSizeId;
                return (
                  <tr
                    key={size.id}
                    className={`border-b border-[#E7E2DA] last:border-b-0 ${
                      isSelected ? 'bg-[#EFECE5]/65' : ''
                    }`}
                  >
                    <td className="py-3.5 px-4 font-medium text-[#24221F]">
                      <button
                        type="button"
                        onClick={() => {
                          onSelectSize(size.id);
                          onClose();
                        }}
                        className="underline underline-offset-4 hover:text-[#8A542F]"
                      >
                        {size.name}
                      </button>
                    </td>
                    <td className="py-3.5 px-4 tabular-nums text-[#524D46]">{size.dimensions}</td>
                    <td className="py-3.5 px-4 tabular-nums text-[#524D46]">{size.capacity}</td>
                    <td className="py-3.5 px-4 text-[#524D46]">{size.idealFor}</td>
                    <td className="py-3.5 px-4 tabular-nums text-right font-medium text-[#24221F]">
                      {formatINR(size.price)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </ModalShell>
  );
}

/* 3. Write a Review Modal */
export function ReviewModal({
  open,
  defaultVariant,
  onClose,
  onSubmitReview,
}: {
  open: boolean;
  defaultVariant: string;
  onClose: () => void;
  onSubmitReview: (review: Omit<ReviewItem, 'id' | 'date' | 'timestamp' | 'verifiedDemo'>) => void;
}) {
  const [rating, setRating] = useState(5);
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !title.trim() || comment.trim().length < 10) {
      setError('Please enter your name, a brief headline, and at least 10 characters of feedback.');
      return;
    }
    onSubmitReview({
      author: author.trim(),
      rating,
      variant: defaultVariant,
      title: title.trim(),
      comment: comment.trim(),
    });
    setAuthor('');
    setTitle('');
    setComment('');
    setRating(5);
    setError(null);
    onClose();
  };

  return (
    <ModalShell open={open} title="Write a Review" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <p className="text-xs text-[#77736C]">
          Prototype feedback simulation — submitted reviews appear immediately and persist locally in
          your browser.
        </p>

        <div className="space-y-1.5">
          <span className="block text-xs uppercase tracking-[0.08em] text-[#77736C]">Rating</span>
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                aria-label={`Rate ${value} out of 5 stars`}
                onClick={() => setRating(value)}
                className="p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A542F]"
              >
                <Star
                  className={`w-5 h-5 ${
                    value <= rating ? 'fill-[#B49A70] text-[#B49A70]' : 'text-[#D6CEC2]'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1">
          <label htmlFor="review-author" className="block text-xs uppercase tracking-[0.08em] text-[#77736C]">
            Your Name
          </label>
          <input
            id="review-author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="e.g. Siddharth K."
            className="w-full h-10 px-3 bg-[#F7F5F0] border border-[#D6CFC4] text-sm focus:outline-none focus:border-[#24221F]"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="review-title" className="block text-xs uppercase tracking-[0.08em] text-[#77736C]">
            Review Headline
          </label>
          <input
            id="review-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Supple full-grain leather and solid brass"
            className="w-full h-10 px-3 bg-[#F7F5F0] border border-[#D6CFC4] text-sm focus:outline-none focus:border-[#24221F]"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="review-comment" className="block text-xs uppercase tracking-[0.08em] text-[#77736C]">
            Your Experience ({defaultVariant})
          </label>
          <textarea
            id="review-comment"
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share how the size, leather texture, and carry feel in daily use..."
            className="w-full p-3 bg-[#F7F5F0] border border-[#D6CFC4] text-sm focus:outline-none focus:border-[#24221F]"
          />
        </div>

        {error && (
          <p role="alert" className="text-xs text-[#8A2F2F]">
            {error}
          </p>
        )}

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="h-10 px-5 border border-[#D6CFC4] text-xs uppercase tracking-[0.1em]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="h-10 px-6 bg-[#24221F] text-[#F7F5F0] text-xs uppercase tracking-[0.12em]"
          >
            Submit Review
          </button>
        </div>
      </form>
    </ModalShell>
  );
}

/* 4. Quick View Modal for Related Products */
export function QuickViewModal({
  product,
  onClose,
  onAddToBag,
}: {
  product: RelatedProduct | null;
  onClose: () => void;
  onAddToBag: (product: RelatedProduct) => void;
}) {
  return (
    <ModalShell
      open={Boolean(product)}
      title={product?.name ?? 'Product Quick View'}
      onClose={onClose}
      maxWidthClass="max-w-2xl"
    >
      {product && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
          <div className="aspect-[4/3] bg-[#EFECE5] border border-[#E7E2DA] overflow-hidden">
            <ResilientImage
              src={product.image}
              alt={product.name}
              fallbackLabel={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] text-[#8A542F]">
                {product.category}
              </p>
              <div className="flex items-baseline gap-2.5 mt-1 tabular-nums">
                <span className="text-xl font-medium text-[#24221F]">
                  {formatINR(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-[#77736C] line-through">
                    {formatINR(product.originalPrice)}
                  </span>
                )}
              </div>
            </div>

            <p className="text-sm text-[#524D46] leading-relaxed">{product.description}</p>

            <dl className="text-xs space-y-1.5 pt-2 border-t border-[#E7E2DA]">
              <div className="flex justify-between gap-2">
                <dt className="text-[#77736C]">Material</dt>
                <dd className="text-[#24221F] text-right">{product.material}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-[#77736C]">Dimensions</dt>
                <dd className="text-[#24221F] tabular-nums">{product.dimensions}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-[#77736C]">Finish</dt>
                <dd className="text-[#24221F]">{product.colorName}</dd>
              </div>
            </dl>

            <button
              type="button"
              onClick={() => {
                onAddToBag(product);
                onClose();
              }}
              className="w-full h-11 bg-[#24221F] hover:bg-[#3A3630] text-[#F7F5F0] text-xs font-medium uppercase tracking-[0.12em] inline-flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4 stroke-[1.5]" aria-hidden="true" />
              <span>Add to Bag — {formatINR(product.price)}</span>
            </button>
          </div>
        </div>
      )}
    </ModalShell>
  );
}

/* 5. Simulated Checkout Modal */
export function CheckoutModal({
  open,
  items,
  onClose,
  onOrderConfirmed,
}: {
  open: boolean;
  items: CartItem[];
  onClose: () => void;
  onOrderConfirmed: () => void;
}) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [error, setError] = useState<string | null>(null);
  const [confirmedOrderId, setConfirmedOrderId] = useState<string | null>(null);

  const totals = calculateCartTotals(items);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setError('Please enter recipient full name.');
      return;
    }
    const emailCheck = validateEmailAddress(email);
    if (!emailCheck.valid) {
      setError(emailCheck.error ?? 'Invalid email address.');
      return;
    }
    const pinCheck = validateIndianPin(pin);
    if (!pinCheck.valid) {
      setError(pinCheck.error ?? 'Invalid PIN code.');
      return;
    }
    if (address.trim().length < 8) {
      setError('Please enter a complete street address.');
      return;
    }

    setError(null);
    const orderNum = `TAZ-${Math.floor(100000 + Math.random() * 899999)}`;
    setConfirmedOrderId(orderNum);
    onOrderConfirmed();
  };

  const handleClose = () => {
    setConfirmedOrderId(null);
    setError(null);
    onClose();
  };

  return (
    <ModalShell
      open={open}
      title={confirmedOrderId ? 'Order Confirmed (Demo)' : 'Simulated Checkout'}
      onClose={handleClose}
      maxWidthClass="max-w-2xl"
    >
      {confirmedOrderId ? (
        <div data-testid="checkout-confirmation" className="py-4 space-y-5 text-center">
          <CheckCircle2 className="w-10 h-10 text-[#533621] mx-auto stroke-[1.5]" aria-hidden="true" />
          <div className="space-y-1.5">
            <p className="text-xs uppercase tracking-[0.16em] text-[#8A542F]">
              Confirmation #{confirmedOrderId}
            </p>
            <h3 className="font-serif text-3xl text-[#24221F]">
              Thank you, {fullName || 'Guest'}
            </h3>
            <p className="text-sm text-[#524D46] max-w-md mx-auto leading-relaxed">
              This is a frontend prototype simulation—no real payment was charged and no physical
              order was placed.
            </p>
          </div>

          <div className="max-w-sm mx-auto p-4 bg-[#EFECE5] border border-[#E7E2DA] text-xs text-left space-y-1.5">
            <div className="flex justify-between">
              <span className="text-[#77736C]">Estimated Crafting</span>
              <span className="text-[#24221F] font-medium">5–7 business days</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#77736C]">Payment Method</span>
              <span className="text-[#24221F] font-medium">{paymentMethod} (Simulated)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#77736C]">Delivery PIN</span>
              <span className="text-[#24221F] font-medium tabular-nums">{pin}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="h-10 px-6 bg-[#24221F] text-[#F7F5F0] text-xs uppercase tracking-[0.12em]"
          >
            Return to Storefront
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="p-3 bg-[#EFECE5] border border-[#E7E2DA] text-xs text-[#524D46]">
            Frontend checkout demo only. This form simulates order placement and does not process
            live card or UPI transactions.
          </div>

          {/* Summary */}
          <div className="space-y-2 border-b border-[#E7E2DA] pb-4">
            <h3 className="text-xs uppercase tracking-[0.12em] text-[#77736C]">Order Summary</h3>
            {items.map((item) => (
              <div key={item.variantKey} className="flex justify-between gap-4 text-sm">
                <span className="text-[#24221F]">
                  {item.name} ({item.colorName} / {item.sizeName}) × {item.quantity}
                </span>
                <span className="tabular-nums font-medium">
                  {formatINR(item.unitPrice * item.quantity)}
                </span>
              </div>
            ))}
            <div className="flex justify-between text-xs text-[#77736C] pt-1">
              <span>Shipping</span>
              <span>{totals.shippingFee === 0 ? 'Complimentary' : formatINR(totals.shippingFee)}</span>
            </div>
            <div className="flex justify-between text-base font-medium text-[#24221F] pt-1">
              <span>Total</span>
              <span className="tabular-nums">{formatINR(totals.total)}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label htmlFor="checkout-name" className="block text-xs uppercase tracking-[0.08em] text-[#77736C]">
                  Full Name
                </label>
                <input
                  id="checkout-name"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Aarav Mehta"
                  className="w-full h-10 px-3 bg-[#F7F5F0] border border-[#D6CFC4] text-sm focus:outline-none focus:border-[#24221F]"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="checkout-email" className="block text-xs uppercase tracking-[0.08em] text-[#77736C]">
                  Email
                </label>
                <input
                  id="checkout-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="aarav@example.com"
                  className="w-full h-10 px-3 bg-[#F7F5F0] border border-[#D6CFC4] text-sm focus:outline-none focus:border-[#24221F]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2 space-y-1">
                <label htmlFor="checkout-address" className="block text-xs uppercase tracking-[0.08em] text-[#77736C]">
                  Delivery Address
                </label>
                <input
                  id="checkout-address"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Flat 4B, Horniman Circle, Mumbai"
                  className="w-full h-10 px-3 bg-[#F7F5F0] border border-[#D6CFC4] text-sm focus:outline-none focus:border-[#24221F]"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="checkout-pin" className="block text-xs uppercase tracking-[0.08em] text-[#77736C]">
                  PIN Code
                </label>
                <input
                  id="checkout-pin"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="400001"
                  className="w-full h-10 px-3 bg-[#F7F5F0] border border-[#D6CFC4] text-sm tabular-nums focus:outline-none focus:border-[#24221F]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="block text-xs uppercase tracking-[0.08em] text-[#77736C]">
                Simulated Payment Method
              </span>
              <div className="grid grid-cols-4 gap-2">
                {['UPI', 'Visa', 'Mastercard', 'RuPay'].map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setPaymentMethod(method)}
                    className={`h-9 text-xs uppercase tracking-[0.08em] border transition-colors ${
                      paymentMethod === method
                        ? 'bg-[#24221F] text-[#F7F5F0] border-[#24221F]'
                        : 'border-[#D6CFC4] text-[#24221F] hover:border-[#24221F]'
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <p role="alert" className="text-xs text-[#8A2F2F]">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full h-11 bg-[#24221F] hover:bg-[#3A3630] text-[#F7F5F0] text-xs font-medium uppercase tracking-[0.14em]"
            >
              Confirm Demo Order — {formatINR(totals.total)}
            </button>
          </form>
        </div>
      )}
    </ModalShell>
  );
}

/* 6. Search Overlay Modal */
export function SearchModal({
  open,
  relatedProducts,
  onClose,
  onSelectRelated,
  onFocusMainProduct,
}: {
  open: boolean;
  relatedProducts: RelatedProduct[];
  onClose: () => void;
  onSelectRelated: (product: RelatedProduct) => void;
  onFocusMainProduct: () => void;
}) {
  const [query, setQuery] = useState('');

  const searchable = [
    {
      id: 'TAZ-MB-001',
      name: 'The Heritage Messenger',
      subtitle: 'Handcrafted leather messenger bag · ₹7,499 – ₹9,499',
      isMain: true,
      related: null as RelatedProduct | null,
    },
    ...relatedProducts.map((p) => ({
      id: p.id,
      name: p.name,
      subtitle: `${p.subtitle} · ${formatINR(p.price)}`,
      isMain: false,
      related: p,
    })),
  ];

  const q = query.trim().toLowerCase();
  const matches = q
    ? searchable.filter(
        (item) =>
          item.name.toLowerCase().includes(q) || item.subtitle.toLowerCase().includes(q)
      )
    : searchable;

  return (
    <ModalShell open={open} title="Search TAZLO Atelier" onClose={onClose}>
      <div className="space-y-4">
        <div className="relative">
          <Search
            className="w-4 h-4 text-[#77736C] absolute left-3.5 top-1/2 -translate-y-1/2"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search bags, wallets, messenger..."
            aria-label="Search TAZLO products"
            autoFocus
            className="w-full h-11 pl-10 pr-4 bg-[#F7F5F0] border border-[#D6CFC4] text-sm focus:outline-none focus:border-[#24221F]"
          />
        </div>

        <div className="divide-y divide-[#E7E2DA]">
          {matches.length === 0 ? (
            <p className="py-6 text-sm text-[#77736C] text-center">
              No leather pieces match “{query}”.
            </p>
          ) : (
            matches.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onClose();
                  if (item.isMain) {
                    onFocusMainProduct();
                  } else if (item.related) {
                    onSelectRelated(item.related);
                  }
                }}
                className="w-full py-3 flex items-center justify-between text-left hover:bg-[#EFECE5]/60 px-2 transition-colors"
              >
                <div>
                  <p className="text-sm font-medium text-[#24221F]">{item.name}</p>
                  <p className="text-xs text-[#77736C]">{item.subtitle}</p>
                </div>
                <span className="text-xs uppercase tracking-[0.1em] text-[#8A542F]">View</span>
              </button>
            ))
          )}
        </div>
      </div>
    </ModalShell>
  );
}

/* 7. Account & Info Modal */
export function InfoModal({
  open,
  title,
  content,
  onClose,
}: {
  open: boolean;
  title: string;
  content: string;
  onClose: () => void;
}) {
  return (
    <ModalShell open={open} title={title} onClose={onClose} maxWidthClass="max-w-md">
      <div className="space-y-4">
        <p className="text-sm text-[#524D46] leading-relaxed">{content}</p>
        <button
          type="button"
          onClick={onClose}
          className="h-10 px-5 bg-[#24221F] text-[#F7F5F0] text-xs uppercase tracking-[0.12em]"
        >
          Close
        </button>
      </div>
    </ModalShell>
  );
}
