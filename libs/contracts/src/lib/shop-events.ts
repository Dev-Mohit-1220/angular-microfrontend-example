import type { CartItem, Product } from './shop-models';

export interface ShopEventMap {
  'cart:items-changed': readonly CartItem[];
  'cart:count-changed': { readonly count: number };
  'checkout:completed': { readonly orderReference: string };
}

export type ShopEventName = keyof ShopEventMap;

declare global {
  interface Window {
    __shopsphereCart?: readonly CartItem[];
  }
}

export function publishShopEvent<TName extends ShopEventName>(
  name: TName,
  detail: ShopEventMap[TName],
): void {
  if (typeof window === 'undefined') {
    return;
  }

  window.dispatchEvent(
    new CustomEvent<ShopEventMap[TName]>(`shopsphere:${name}`, { detail }),
  );
}

export function listenToShopEvent<TName extends ShopEventName>(
  name: TName,
  listener: (detail: ShopEventMap[TName]) => void,
): () => void {
  if (typeof window === 'undefined') {
    return () => undefined;
  }

  const eventName = `shopsphere:${name}`;
  const handler = (event: Event): void => {
    listener((event as CustomEvent<ShopEventMap[TName]>).detail);
  };

  window.addEventListener(eventName, handler);
  return () => window.removeEventListener(eventName, handler);
}

export function readCartItems(): readonly CartItem[] {
  return typeof window === 'undefined' ? [] : (window.__shopsphereCart ?? []);
}

export function addCartItem(product: Product): void {
  const current = readCartItems();
  const existing = current.find((item) => item.product.id === product.id);
  const updated = existing
    ? current.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      )
    : [...current, { product, quantity: 1 }];

  if (typeof window !== 'undefined') {
    window.__shopsphereCart = updated;
  }

  publishShopEvent('cart:items-changed', updated);
  publishShopEvent('cart:count-changed', {
    count: updated.reduce((total, item) => total + item.quantity, 0),
  });
}

export function removeCartItem(productId: string): void {
  const updated = readCartItems().filter((item) => item.product.id !== productId);

  if (typeof window !== 'undefined') {
    window.__shopsphereCart = updated;
  }

  publishShopEvent('cart:items-changed', updated);
  publishShopEvent('cart:count-changed', {
    count: updated.reduce((total, item) => total + item.quantity, 0),
  });
}
