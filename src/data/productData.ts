import type {
  ColorId,
  FaqItem,
  GalleryImage,
  ProductColor,
  ProductSize,
  RelatedProduct,
  ReviewItem,
} from '../types/product';

export const HERITAGE_PRODUCT = {
  id: 'TAZ-MB-001',
  baseSku: 'TAZ-MB-001',
  brand: 'TAZLO',
  collection: 'HERITAGE COLLECTION',
  name: 'The Heritage Messenger',
  type: 'Handcrafted leather messenger bag',
  material: '100% Full-Grain Vegetable-Tanned Leather',
  shortDescription:
    'A timeless companion handcrafted from premium full-grain leather. Designed for everyday journeys, built to age beautifully.',
  storyParagraphs: [
    'The Heritage Messenger is a thoughtful balance between utility and timeless design.',
    'Made from carefully selected full-grain leather, every piece is hand-cut, stitched, and finished by skilled artisans.',
    'As the leather ages, it develops a natural patina that reflects your journeys and everyday experiences.',
    'No two bags are exactly alike.',
  ],
  tags: ['Handcrafted', 'Full-Grain Leather', 'Lifetime Patina', 'Artisan Made'],
  rating: 4.8,
  reviewCount: 128,
  craftsmanshipDays: '5–7 business days',
  warranty: '1-year craftsmanship warranty',
};

export const PRODUCT_COLORS: ProductColor[] = [
  {
    id: 'saddle-brown',
    name: 'Saddle Brown',
    swatchHex: '#8A542F',
    skuCode: 'SB',
    availability: 'In Stock',
    primaryImageIndex: 0,
  },
  {
    id: 'dark-walnut',
    name: 'Dark Walnut',
    swatchHex: '#432A1C',
    skuCode: 'DW',
    availability: 'In Stock',
    primaryImageIndex: 0,
  },
  {
    id: 'black',
    name: 'Black',
    swatchHex: '#24221F',
    skuCode: 'BK',
    availability: 'In Stock',
    primaryImageIndex: 0,
  },
  {
    id: 'cognac',
    name: 'Cognac',
    swatchHex: '#B66E36',
    skuCode: 'CG',
    availability: 'In Stock',
    primaryImageIndex: 0,
  },
];

export const PRODUCT_SIZES: ProductSize[] = [
  {
    id: 'small',
    name: 'Small',
    skuCode: 'SM',
    price: 7499,
    originalPrice: 9299,
    dimensions: '25 × 20 × 7 cm',
    capacity: '5 L',
    idealFor: 'Essentials, tablet, wallet',
    laptopFit: 'Up to 11-inch tablet',
    availability: 'In Stock',
  },
  {
    id: 'medium',
    name: 'Medium',
    skuCode: 'MD',
    price: 8499,
    originalPrice: 10499,
    dimensions: '30 × 24 × 9 cm',
    capacity: '8 L',
    idealFor: 'Tablet, notebook, daily essentials',
    laptopFit: 'Up to 14 inches (slim)',
    availability: 'In Stock',
  },
  {
    id: 'large',
    name: 'Large',
    skuCode: 'LG',
    price: 9499,
    originalPrice: 11699,
    dimensions: '35 × 27 × 11 cm',
    capacity: '12 L',
    idealFor: 'Laptop up to 14 inches, notebook, daily essentials',
    laptopFit: 'Up to 14 inches (padded)',
    availability: 'In Stock',
  },
];

const COLOR_PRIMARY_IMAGE: Record<ColorId, { src: string; alt: string }> = {
  'saddle-brown': {
    src: '/src/assets/images/bag_saddle_front_1795795301174.jpg',
    alt: 'TAZLO The Heritage Messenger in Saddle Brown full-grain leather front view',
  },
  'dark-walnut': {
    src: '/src/assets/images/bag_dark_walnut_1795795305045.jpg',
    alt: 'TAZLO The Heritage Messenger in Dark Walnut full-grain leather front view',
  },
  black: {
    src: '/src/assets/images/bag_black_1795795305051.jpg',
    alt: 'TAZLO The Heritage Messenger in Black full-grain leather front view',
  },
  cognac: {
    src: '/src/assets/images/bag_cognac_1795795304655.jpg',
    alt: 'TAZLO The Heritage Messenger in Cognac full-grain leather front view',
  },
};

export function getGalleryForColor(colorId: ColorId, colorName: string): GalleryImage[] {
  const primary = COLOR_PRIMARY_IMAGE[colorId];
  return [
    {
      id: `${colorId}-front`,
      src: primary.src,
      alt: primary.alt,
      label: `${colorName} — Front View`,
      colorId,
    },
    {
      id: 'side-profile',
      src: '/src/assets/images/bag_saddle_side_1795795301215.jpg',
      alt: 'Three-quarter side profile showing structured leather gusset and solid brass D-ring hardware',
      label: 'Side Profile & Gusset Depth',
    },
    {
      id: 'back-view',
      src: '/src/assets/images/bag_saddle_back_1795795302238.jpg',
      alt: 'Back view of The Heritage Messenger with exterior slip pocket and brass-riveted strap anchors',
      label: 'Rear Slip Pocket & Rivets',
    },
    {
      id: 'interior-view',
      src: '/src/assets/images/bag_interior_1795795302627.jpg',
      alt: 'Open interior view showing three canvas-lined compartments and padded laptop sleeve',
      label: 'Three-Compartment Canvas Interior',
    },
    {
      id: 'leather-macro',
      src: '/src/assets/images/bag_leather_macro_1795795376671.jpg',
      alt: 'Close-up macro of full-grain vegetable-tanned leather texture, waxed stitching, and antique brass buckle',
      label: 'Full-Grain Texture & Brass Hardware',
    },
    {
      id: 'editorial-model',
      src: '/src/assets/images/bag_model_editorial_1795795303240.jpg',
      alt: 'Model carrying The Heritage Messenger crossbody outdoors in natural warm light',
      label: 'Carried Crossbody — Scale Reference',
    },
  ];
}

export const SPECIFICATIONS_TABLE = [
  { label: 'Material', value: 'Full-Grain Vegetable-Tanned Leather' },
  { label: 'Lining', value: 'Premium cotton canvas' },
  { label: 'Hardware', value: 'Antique brass' },
  { label: 'Closure', value: 'Magnetic flap + secure zipper' },
  { label: 'Strap', value: 'Adjustable leather shoulder strap' },
  { label: 'Compartments', value: '3 internal compartments' },
  { label: 'Laptop compatibility', value: 'Up to 14 inches (Medium / Large)' },
  { label: 'Handmade', value: 'Yes — individually cut and stitched' },
  { label: 'Origin', value: 'Artisan workshop, India' },
];

export const SHIPPING_FAQS: FaqItem[] = [
  {
    id: 'faq-dispatch',
    question: 'Why does crafting take 5–7 business days before dispatch?',
    answer:
      'Every TAZLO Heritage Messenger is finished to order in our workshop. Artisans inspect the hide, hand-burnish edges, check antique brass hardware, and condition the leather before boxing so the bag arrives ready to build its patina.',
  },
  {
    id: 'faq-care',
    question: 'How should I care for vegetable-tanned full-grain leather?',
    answer:
      'Wipe away surface dust with a dry cotton cloth. Every 4–6 months, apply a small amount of neutral beeswax leather balm. Avoid prolonged soaking; if caught in rain, let the bag dry naturally away from direct heat.',
  },
  {
    id: 'faq-returns',
    question: 'How do returns and exchanges work within the 14-day window?',
    answer:
      'Unused bags in their original cotton dust bag and box are eligible for a return or size exchange within 14 days of delivery. Monogrammed or custom-commissioned orders are final sale unless an item arrives with a craftsmanship defect.',
  },
  {
    id: 'faq-warranty',
    question: 'What does the 1-year craftsmanship warranty cover?',
    answer:
      'Our 1-year warranty covers seam stitching, brass buckles, D-rings, rivets, and zipper assembly under normal daily carry. Natural patina darkening, scuffs, and accidental tears are part of leather wear and are not covered.',
  },
];

export const RATING_BREAKDOWN = [
  { stars: 5, percent: 89 },
  { stars: 4, percent: 8 },
  { stars: 3, percent: 2 },
  { stars: 2, percent: 1 },
  { stars: 1, percent: 0 },
];

export const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Rahul M.',
    rating: 5,
    date: '14 Nov 2026',
    timestamp: 1794614400000,
    verifiedDemo: true,
    variant: 'Medium / Saddle Brown',
    title: 'Detailed stitching and rich natural hide',
    comment:
      'Beautiful craftsmanship. The leather feels premium, and the stitching is incredibly detailed. The bag looks even better in person.',
  },
  {
    id: 'rev-2',
    author: 'Ananya S.',
    rating: 5,
    date: '02 Nov 2026',
    timestamp: 1793577600000,
    verifiedDemo: true,
    variant: 'Medium / Cognac',
    title: 'My daily studio companion',
    comment:
      'Perfect everyday bag. Fits my tablet, notebook, and essentials comfortably. I love how the leather develops character.',
  },
  {
    id: 'rev-3',
    author: 'Karthik R.',
    rating: 4,
    date: '21 Oct 2026',
    timestamp: 1792540800000,
    verifiedDemo: true,
    variant: 'Large / Dark Walnut',
    title: 'Worth the atelier wait',
    comment:
      'Excellent quality and a timeless design. The delivery took a little longer than expected, but the product was worth the wait.',
  },
  {
    id: 'rev-4',
    author: 'Meera N.',
    rating: 5,
    date: '09 Oct 2026',
    timestamp: 1791504000000,
    verifiedDemo: true,
    variant: 'Large / Saddle Brown',
    title: 'Fits a 14-inch laptop cleanly without bulk',
    comment:
      'The canvas lining and antique brass buckles feel substantial without making the bag overly heavy. My 14-inch MacBook slips neatly into the padded back section.',
  },
  {
    id: 'rev-5',
    author: 'Vikram D.',
    rating: 5,
    date: '26 Sep 2026',
    timestamp: 1790380800000,
    verifiedDemo: true,
    variant: 'Small / Black',
    title: 'Understated and architectural',
    comment:
      'Chose the Black Small for weekend errands and travel documents. Matte full-grain leather pairs effortlessly with dark coats and crisp shirts.',
  },
];

export const CRAFTSMANSHIP_FEATURES = [
  {
    number: '01',
    title: 'Carefully Selected Leather',
    description:
      'Premium full-grain leather with natural character, vegetable-tanned in small drums so the fibers remain dense, supple, and ready to develop a deep patina.',
  },
  {
    number: '02',
    title: 'Crafted by Skilled Hands',
    description:
      'Traditional craftsmanship combined with modern utility. Each panel is clicked from prime hide cuts, edge-burnished with beeswax, and anchored with solid brass.',
  },
  {
    number: '03',
    title: 'Built for a Lifetime of Journeys',
    description:
      'A design that becomes more beautiful with age—softening along the shoulder strap while retaining the structured silhouette that protects your daily essentials.',
  },
];

export const RELATED_PRODUCTS: RelatedProduct[] = [
  {
    id: 'TAZ-WL-002',
    sku: 'TAZ-WL-002-SB',
    name: 'The Classic Wallet',
    subtitle: 'Full-grain leather wallet',
    category: 'Accessories',
    price: 2499,
    originalPrice: 2999,
    image: '/src/assets/images/related_classic_wallet_1795795376140.jpg',
    hoverImage: '/src/assets/images/bag_leather_macro_1795795376671.jpg',
    description:
      'Six-slot bifold wallet hand-stitched from vegetable-tanned Saddle Brown leather with folded edges and slim pocket profile.',
    material: '100% Full-Grain Vegetable-Tanned Leather',
    dimensions: '11 × 9 × 1.2 cm',
    colorName: 'Saddle Brown',
  },
  {
    id: 'TAZ-TT-003',
    sku: 'TAZ-TT-003-SB',
    name: 'The Everyday Tote',
    subtitle: 'Handmade leather tote',
    category: 'Bags',
    price: 9999,
    image: '/src/assets/images/related_everyday_tote_1795795306424.jpg',
    hoverImage: '/src/assets/images/bag_interior_1795795302627.jpg',
    description:
      'Structured architectural tote with rolled saddle-leather handles, brass rivets, and an interior laptop sleeve for effortless workdays.',
    material: '100% Full-Grain Vegetable-Tanned Leather',
    dimensions: '38 × 30 × 13 cm',
    colorName: 'Saddle Brown',
  },
  {
    id: 'TAZ-DF-004',
    sku: 'TAZ-DF-004-DW',
    name: 'The Travel Companion',
    subtitle: 'Premium leather duffel',
    category: 'Bags',
    price: 12499,
    originalPrice: 14999,
    image: '/src/assets/images/related_travel_duffel_1795795327858.jpg',
    hoverImage: '/src/assets/images/bag_dark_walnut_1795795305045.jpg',
    description:
      'Cabin-approved weekender crafted in Dark Walnut pebble grain with solid brass feet, heavy-gauge zipper, and padded leather strap.',
    material: '100% Full-Grain Vegetable-Tanned Leather',
    dimensions: '50 × 28 × 24 cm',
    colorName: 'Dark Walnut',
  },
  {
    id: 'TAZ-CH-005',
    sku: 'TAZ-CH-005-CG',
    name: 'The Minimal Cardholder',
    subtitle: 'Slim handmade cardholder',
    category: 'Accessories',
    price: 1499,
    image: '/src/assets/images/related_minimal_cardholder_1795795306680.jpg',
    hoverImage: '/src/assets/images/bag_cognac_1795795304655.jpg',
    description:
      'Ultra-slim four-pocket card sleeve cut from Cognac vegetable-tanned leather with burnished edges and waxed linen stitching.',
    material: '100% Full-Grain Vegetable-Tanned Leather',
    dimensions: '10 × 7 × 0.5 cm',
    colorName: 'Cognac',
  },
];

export const ATELIER_IMAGE = '/src/assets/images/craftsmanship_atelier_1795795305779.jpg';
