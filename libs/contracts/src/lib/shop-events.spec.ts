import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  addCartItem,
  listenToShopEvent,
  publishShopEvent,
  readCartItems,
  removeCartItem,
} from './shop-events';
import type { Product } from './shop-models';

const product: Product = {
  id: 'product-1',
  name: 'Test product',
  description: 'Contract test fixture',
  price: 125,
  category: 'Accessories',
  imageUrl: 'https://example.com/product.jpg',
};

describe('shop event contracts', () => {
  beforeEach(() => {
    window.__shopsphereCart = [];
  });

  afterEach(() => {
    delete window.__shopsphereCart;
  });

  it('adds a product and increments its quantity on repeated additions', () => {
    addCartItem(product);
    addCartItem(product);

    expect(readCartItems()).toEqual([{ product, quantity: 2 }]);
  });

  it('publishes item and count changes when the cart is updated', () => {
    const itemsListener = vi.fn();
    const countListener = vi.fn();
    const stopItems = listenToShopEvent('cart:items-changed', itemsListener);
    const stopCount = listenToShopEvent('cart:count-changed', countListener);

    addCartItem(product);

    expect(itemsListener).toHaveBeenCalledWith([{ product, quantity: 1 }]);
    expect(countListener).toHaveBeenCalledWith({ count: 1 });

    stopItems();
    stopCount();
  });

  it('removes a product and publishes the new empty state', () => {
    addCartItem(product);
    const listener = vi.fn();
    const stopListening = listenToShopEvent('cart:items-changed', listener);

    removeCartItem(product.id);

    expect(readCartItems()).toEqual([]);
    expect(listener).toHaveBeenCalledWith([]);
    stopListening();
  });

  it('stops delivering events after a listener is cleaned up', () => {
    const listener = vi.fn();
    const stopListening = listenToShopEvent('checkout:completed', listener);

    stopListening();
    publishShopEvent('checkout:completed', { orderReference: 'DEMO-123' });

    expect(listener).not.toHaveBeenCalled();
  });
});
