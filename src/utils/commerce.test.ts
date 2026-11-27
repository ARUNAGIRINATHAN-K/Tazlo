import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildVariantSku,
  calculateCartTotals,
  calculateDiscountPercent,
  clampQuantity,
  formatINR,
  simulateDeliveryEstimate,
  sortReviews,
  updateCartItemQuantity,
  upsertCartItem,
  validateEmailAddress,
  validateIndianPin,
} from './commerce';
import type { CartItem, ReviewItem } from '../types/product';

test('formatINR formats Indian currency cleanly', () => {
  assert.equal(formatINR(8499), '₹8,499');
  assert.equal(formatINR(12499), '₹12,499');
});

test('calculateDiscountPercent computes 19% for 8499 vs 10499', () => {
  assert.equal(calculateDiscountPercent(8499, 10499), 19);
  assert.equal(calculateDiscountPercent(7499, 9299), 19);
  assert.equal(calculateDiscountPercent(9499, 11699), 19);
  assert.equal(calculateDiscountPercent(5000, 5000), 0);
});

test('buildVariantSku composes deterministic SKU strings', () => {
  assert.equal(buildVariantSku('TAZ-MB-001', 'SB', 'MD'), 'TAZ-MB-001-SB-MD');
  assert.equal(buildVariantSku('TAZ-MB-001', 'DW', 'LG'), 'TAZ-MB-001-DW-LG');
});

test('clampQuantity enforces bounds 1..10', () => {
  assert.equal(clampQuantity(0), 1);
  assert.equal(clampQuantity(-4), 1);
  assert.equal(clampQuantity(5), 5);
  assert.equal(clampQuantity(14), 10);
  assert.equal(clampQuantity(Number.NaN), 1);
});

test('cart subtotal, shipping threshold, and upsert behave accurately', () => {
  const sampleItem: CartItem = {
    variantKey: 'TAZ-MB-001::saddle-brown::medium',
    productId: 'TAZ-MB-001',
    name: 'The Heritage Messenger',
    colorName: 'Saddle Brown',
    colorId: 'saddle-brown',
    sizeName: 'Medium',
    sizeId: 'medium',
    sku: 'TAZ-MB-001-SB-MD',
    unitPrice: 8499,
    quantity: 1,
    image: '/test.jpg',
  };

  let cart = upsertCartItem([], sampleItem);
  assert.equal(cart.length, 1);
  assert.equal(cart[0].quantity, 1);

  cart = upsertCartItem(cart, { ...sampleItem, quantity: 1 });
  assert.equal(cart[0].quantity, 2);

  const totals = calculateCartTotals(cart);
  assert.equal(totals.itemCount, 2);
  assert.equal(totals.subtotal, 16998);
  assert.equal(totals.shippingFee, 0);
  assert.equal(totals.total, 16998);

  const smallCart: CartItem[] = [
    {
      ...sampleItem,
      variantKey: 'TAZ-MC-004::cognac::one-size',
      unitPrice: 1499,
      quantity: 1,
    },
  ];
  const smallTotals = calculateCartTotals(smallCart);
  assert.equal(smallTotals.shippingFee, 250);
  assert.equal(smallTotals.total, 1749);
  assert.equal(smallTotals.amountToFreeShipping, 3501);

  const emptied = updateCartItemQuantity(smallCart, 'TAZ-MC-004::cognac::one-size', 0);
  assert.equal(emptied.length, 0);
});

test('PIN validation and simulated delivery estimator reject invalid PINs and estimate valid ones', () => {
  assert.equal(validateIndianPin('').valid, false);
  assert.equal(validateIndianPin('012345').valid, false);
  assert.equal(validateIndianPin('40001').valid, false);
  assert.equal(validateIndianPin('400001').valid, true);

  const est = simulateDeliveryEstimate('400001', 8499, new Date('2026-11-27T00:00:00Z'));
  assert.ok(est !== null);
  assert.equal(est.pin, '400001');
  assert.equal(est.freeShippingEligible, true);
  assert.equal(est.cityRegion, 'Maharashtra, Goa & MP');
});

test('email validation and review sorting work deterministically', () => {
  assert.equal(validateEmailAddress('bad-email').valid, false);
  assert.equal(validateEmailAddress('atelier@tazlo.in').valid, true);

  const reviews: ReviewItem[] = [
    {
      id: '1',
      author: 'A',
      rating: 4,
      date: '2026-10-01',
      timestamp: 100,
      verifiedDemo: true,
      variant: 'Large',
      title: 'Good',
      comment: 'Nice',
    },
    {
      id: '2',
      author: 'B',
      rating: 5,
      date: '2026-11-01',
      timestamp: 200,
      verifiedDemo: true,
      variant: 'Medium',
      title: 'Great',
      comment: 'Love it',
    },
  ];
  assert.equal(sortReviews(reviews, 'newest')[0].id, '2');
  assert.equal(sortReviews(reviews, 'lowest')[0].id, '1');
  assert.equal(sortReviews(reviews, 'highest')[0].id, '2');
});
