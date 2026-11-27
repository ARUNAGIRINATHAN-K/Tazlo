import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  HERITAGE_PRODUCT,
  INITIAL_REVIEWS,
  PRODUCT_COLORS,
  PRODUCT_SIZES,
  RELATED_PRODUCTS,
  SHIPPING_FAQS,
  getGalleryForColor,
} from '../data/productData';
import type {
  CartItem,
  ColorId,
  ProductTabId,
  RelatedProduct,
  ReviewItem,
  ReviewSortOption,
  SizeId,
  ToastMessage,
} from '../types/product';
import {
  buildVariantKey,
  calculateCartTotals,
  clampQuantity,
  resolveVariantDetails,
  sortReviews,
  updateCartItemQuantity,
  upsertCartItem,
} from '../utils/commerce';
import { AnnouncementBar } from './AnnouncementBar';
import { Breadcrumbs } from './Breadcrumbs';
import { CartDrawer } from './CartDrawer';
import { CraftsmanshipSection } from './CraftsmanshipSection';
import { Footer } from './Footer';
import { Header } from './Header';
import {
  CheckoutModal,
  InfoModal,
  LightboxModal,
  QuickViewModal,
  ReviewModal,
  SearchModal,
  SizeGuideModal,
} from './Modals';
import { NewsletterSection } from './NewsletterSection';
import { ProductGallery } from './ProductGallery';
import { ProductInformation } from './ProductInformation';
import { ProductTabs } from './ProductTabs';
import { RelatedProductsCarousel } from './RelatedProductsCarousel';
import { ToastContainer } from './ToastContainer';

const STORAGE_KEYS = {
  cart: 'tazlo_pdp_cart_v1',
  color: 'tazlo_pdp_color_v1',
  size: 'tazlo_pdp_size_v1',
  reviews: 'tazlo_pdp_reviews_v1',
};

function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function ProductPage() {
  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const [selectedColorId, setSelectedColorId] = useState<ColorId>(() =>
    readStorage<ColorId>(STORAGE_KEYS.color, 'saddle-brown')
  );
  const [selectedSizeId, setSelectedSizeId] = useState<SizeId>(() =>
    readStorage<SizeId>(STORAGE_KEYS.size, 'medium')
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  const [cart, setCart] = useState<CartItem[]>(() =>
    readStorage<CartItem[]>(STORAGE_KEYS.cart, [])
  );
  const [cartOpen, setCartOpen] = useState(false);

  const [activeTab, setActiveTab] = useState<ProductTabId>('details');
  const [reviewSort, setReviewSort] = useState<ReviewSortOption>('newest');
  const [reviews, setReviews] = useState<ReviewItem[]>(() =>
    readStorage<ReviewItem[]>(STORAGE_KEYS.reviews, INITIAL_REVIEWS)
  );

  // Modals
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<RelatedProduct | null>(null);
  const [checkoutItems, setCheckoutItems] = useState<CartItem[] | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [infoModal, setInfoModal] = useState<{ title: string; content: string } | null>(null);

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Persist selections & cart in localStorage
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cart));
    } catch {
      // Ignore storage quota errors
    }
  }, [cart]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.color, JSON.stringify(selectedColorId));
    } catch {
      // Ignore
    }
  }, [selectedColorId]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.size, JSON.stringify(selectedSizeId));
    } catch {
      // Ignore
    }
  }, [selectedSizeId]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.reviews, JSON.stringify(reviews));
    } catch {
      // Ignore
    }
  }, [reviews]);

  const pushToast = useCallback(
    (message: string, tone: ToastMessage['tone'] = 'default') => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      setToasts([{ id, message, tone }]);
      window.setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3000);
    },
    []
  );

  const variant = useMemo(
    () =>
      resolveVariantDetails(
        HERITAGE_PRODUCT.baseSku,
        PRODUCT_COLORS,
        PRODUCT_SIZES,
        selectedColorId,
        selectedSizeId
      ),
    [selectedColorId, selectedSizeId]
  );

  const galleryImages = useMemo(
    () => getGalleryForColor(variant.color.id, variant.color.name),
    [variant.color.id, variant.color.name]
  );

  const sortedReviews = useMemo(
    () => sortReviews(reviews, reviewSort),
    [reviews, reviewSort]
  );

  const cartTotals = useMemo(() => calculateCartTotals(cart), [cart]);

  const handleSelectColor = (colorId: ColorId) => {
    setSelectedColorId(colorId);
    setActiveImageIndex(0);
  };

  const handleSelectSize = (sizeId: SizeId) => {
    setSelectedSizeId(sizeId);
  };

  const buildMainCartItem = (): CartItem => ({
    variantKey: buildVariantKey(HERITAGE_PRODUCT.id, variant.color.id, variant.size.id),
    productId: HERITAGE_PRODUCT.id,
    name: HERITAGE_PRODUCT.name,
    colorName: variant.color.name,
    colorId: variant.color.id,
    sizeName: variant.size.name,
    sizeId: variant.size.id,
    sku: variant.sku,
    unitPrice: variant.size.price,
    quantity: clampQuantity(quantity),
    image: galleryImages[0].src,
  });

  const handleAddToBag = () => {
    const item = buildMainCartItem();
    setCart((prev) => upsertCartItem(prev, item));
    setCartOpen(true);
  };

  const handleBuyNow = () => {
    const item = buildMainCartItem();
    setCheckoutItems([item]);
  };

  const handleAddRelatedToBag = (product: RelatedProduct) => {
    const item: CartItem = {
      variantKey: buildVariantKey(product.id, product.colorName.toLowerCase(), 'one-size'),
      productId: product.id,
      name: product.name,
      colorName: product.colorName,
      colorId: product.colorName.toLowerCase(),
      sizeName: 'Standard',
      sizeId: 'one-size',
      sku: product.sku,
      unitPrice: product.price,
      quantity: 1,
      image: product.image,
    };
    setCart((prev) => upsertCartItem(prev, item));
    setCartOpen(true);
    pushToast(`Added ${product.name} to your bag`, 'success');
  };

  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleJumpToReviews = () => {
    setActiveTab('reviews');
    window.setTimeout(() => {
      handleNavigateSection('product-details-tabs');
    }, 40);
  };

  const handleSubmitReview = (
    incoming: Omit<ReviewItem, 'id' | 'date' | 'timestamp' | 'verifiedDemo'>
  ) => {
    const now = new Date();
    const newReview: ReviewItem = {
      ...incoming,
      id: `rev-${Date.now()}`,
      date: now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      timestamp: now.getTime(),
      verifiedDemo: true,
    };
    setReviews((prev) => [newReview, ...prev]);
    setReviewSort('newest');
    setActiveTab('reviews');
    pushToast('Thank you — your sample review has been added', 'success');
  };

  const handlePolicyModal = (topic: string) => {
    const descriptions: Record<string, string> = {
      'Contact Us':
        'Reach our Jaipur & Mumbai atelier concierge at care@tazlo.in, Monday to Saturday, 10:00 AM – 6:30 PM IST.',
      Shipping:
        'Orders are crafted and quality-checked within 5–7 business days. Insured delivery across India takes 3–7 business days after dispatch and is complimentary above ₹5,000.',
      Returns:
        'Eligible unused items in original packaging may be returned or exchanged within 14 days of delivery.',
      Warranty:
        'Every TAZLO bag carries a 1-year craftsmanship warranty covering stitching, solid brass hardware, and structural assembly.',
      FAQ:
        'Explore the Shipping & Returns tab above for full answers on crafting lead times, leather care, and returns.',
      Instagram: 'Follow @tazlo.atelier for workshop dispatches and leather patina stories.',
      Pinterest: 'Explore our seasonal lookbooks and carry studies on Pinterest (@tazloatelier).',
      Facebook: 'Connect with TAZLO Leather Goods on Facebook for collection releases.',
      'Privacy Policy':
        'This storefront prototype stores cart, variant selections, and sample reviews locally in your browser via localStorage. No personal data is transmitted externally.',
      'Terms of Service':
        'Prototype storefront for TAZLO Leather Goods. Prices are displayed in INR (₹) and checkout actions are simulated.',
    };
    setInfoModal({
      title: topic,
      content:
        descriptions[topic] ??
        'Information from TAZLO Leather Atelier — crafted by hand, made to last.',
    });
  };

  const extraReviewCount = Math.max(0, reviews.length - INITIAL_REVIEWS.length);
  const displayReviewCount = HERITAGE_PRODUCT.reviewCount + extraReviewCount;

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5F0] text-[#24221F]">
      <AnnouncementBar
        visible={announcementVisible}
        onDismiss={() => setAnnouncementVisible(false)}
      />

      <Header
        cartCount={cartTotals.itemCount}
        onOpenCart={() => setCartOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenAccount={() =>
          setInfoModal({
            title: 'TAZLO Atelier Account',
            content:
              'Sign-in is not required in this prototype. Your bag and variant preferences are preserved automatically in your browser.',
          })
        }
        onNavigateSection={handleNavigateSection}
      />

      <main className="flex-1">
        <Breadcrumbs
          onNavigate={(target) => {
            if (target === 'product-details-tabs') {
              setActiveTab('details');
            }
            handleNavigateSection(target);
          }}
        />

        {/* Hero PDP Split: ~58% Gallery Left / ~42% Product Info Right */}
        <section
          id="product-top"
          aria-label="Product overview"
          className="max-w-[1440px] mx-auto px-4 sm:px-8 pb-14 sm:pb-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-7">
              <ProductGallery
                images={galleryImages}
                activeIndex={activeImageIndex}
                onSelectImage={setActiveImageIndex}
                onOpenLightbox={() => setLightboxOpen(true)}
                colorName={variant.color.name}
              />
            </div>

            <div className="lg:col-span-5">
              <ProductInformation
                collection={HERITAGE_PRODUCT.collection}
                name={HERITAGE_PRODUCT.name}
                rating={HERITAGE_PRODUCT.rating}
                reviewCount={displayReviewCount}
                shortDescription={HERITAGE_PRODUCT.shortDescription}
                tags={HERITAGE_PRODUCT.tags}
                colors={PRODUCT_COLORS}
                sizes={PRODUCT_SIZES}
                selectedColorId={selectedColorId}
                selectedSizeId={selectedSizeId}
                selectedColor={variant.color}
                selectedSize={variant.size}
                sku={variant.sku}
                discountPercent={variant.discountPercent}
                availability={variant.availability}
                quantity={quantity}
                onSelectColor={handleSelectColor}
                onSelectSize={handleSelectSize}
                onChangeQuantity={(next) => setQuantity(clampQuantity(next))}
                onOpenSizeGuide={() => setSizeGuideOpen(true)}
                onJumpToReviews={handleJumpToReviews}
                onAddToBag={handleAddToBag}
                onBuyNow={handleBuyNow}
              />
            </div>
          </div>
        </section>

        {/* Tabbed Details, Shipping & Returns, Reviews */}
        <ProductTabs
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          storyParagraphs={HERITAGE_PRODUCT.storyParagraphs}
          faqs={SHIPPING_FAQS}
          reviews={sortedReviews}
          reviewCount={displayReviewCount}
          rating={HERITAGE_PRODUCT.rating}
          reviewSort={reviewSort}
          onChangeReviewSort={setReviewSort}
          onOpenWriteReview={() => setReviewModalOpen(true)}
        />

        {/* Editorial Craftsmanship Story */}
        <CraftsmanshipSection />

        {/* Related Products Carousel */}
        <RelatedProductsCarousel
          products={RELATED_PRODUCTS}
          onQuickView={(product) => setQuickViewProduct(product)}
          onAddRelatedToBag={handleAddRelatedToBag}
        />

        {/* Newsletter */}
        <NewsletterSection
          onSubscribeSuccess={(email) =>
            pushToast(`Subscribed ${email} to TAZLO Journal`, 'success')
          }
        />
      </main>

      <Footer
        onNavigateSection={handleNavigateSection}
        onOpenPolicy={handlePolicyModal}
      />

      {/* Slide-Over Cart Drawer */}
      <CartDrawer
        open={cartOpen}
        items={cart}
        onClose={() => setCartOpen(false)}
        onUpdateQuantity={(key, nextQty) =>
          setCart((prev) => updateCartItemQuantity(prev, key, nextQty))
        }
        onRemoveItem={(key) => {
          setCart((prev) => prev.filter((item) => item.variantKey !== key));
          pushToast('Removed item from bag');
        }}
        onCheckout={() => {
          setCartOpen(false);
          setCheckoutItems(cart);
        }}
      />

      {/* Modals */}
      <LightboxModal
        open={lightboxOpen}
        images={galleryImages}
        activeIndex={activeImageIndex}
        onChangeIndex={setActiveImageIndex}
        onClose={() => setLightboxOpen(false)}
      />

      <SizeGuideModal
        open={sizeGuideOpen}
        sizes={PRODUCT_SIZES}
        selectedSizeId={selectedSizeId}
        onSelectSize={handleSelectSize}
        onClose={() => setSizeGuideOpen(false)}
      />

      <ReviewModal
        open={reviewModalOpen}
        defaultVariant={`${variant.size.name} / ${variant.color.name}`}
        onClose={() => setReviewModalOpen(false)}
        onSubmitReview={handleSubmitReview}
      />

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToBag={handleAddRelatedToBag}
      />

      <CheckoutModal
        open={Boolean(checkoutItems)}
        items={checkoutItems ?? []}
        onClose={() => setCheckoutItems(null)}
        onOrderConfirmed={() => {
          // If checking out from main cart, clear main cart
          if (checkoutItems && checkoutItems.length === cart.length && cart.length > 0) {
            const isSameCart = checkoutItems.every(
              (ci, idx) => cart[idx]?.variantKey === ci.variantKey
            );
            if (isSameCart) {
              setCart([]);
            }
          }
          pushToast('Demo order placed successfully', 'success');
        }}
      />

      <SearchModal
        open={searchOpen}
        relatedProducts={RELATED_PRODUCTS}
        onClose={() => setSearchOpen(false)}
        onSelectRelated={(product) => setQuickViewProduct(product)}
        onFocusMainProduct={() => handleNavigateSection('product-top')}
      />

      <InfoModal
        open={Boolean(infoModal)}
        title={infoModal?.title ?? ''}
        content={infoModal?.content ?? ''}
        onClose={() => setInfoModal(null)}
      />

      <ToastContainer
        toasts={toasts}
        onDismiss={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))}
      />
    </div>
  );
}
