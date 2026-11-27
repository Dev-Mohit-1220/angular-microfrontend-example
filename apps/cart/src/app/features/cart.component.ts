import { CurrencyPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import {
  listenToShopEvent,
  readCartItems,
  removeCartItem,
  type CartItem,
} from '@shopsphere/contracts';

@Component({
  selector: 'shop-cart',
  standalone: true,
  imports: [CurrencyPipe, RouterLink, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="heading">
      <p class="eyebrow">YOUR SELECTION</p>
      <h1>Shopping cart</h1>
      <p>Cart state is shared across remotes for this browser session.</p>
    </section>

    @if (items().length === 0) {
      <div class="empty">
        <h2>Your cart is waiting</h2>
        <p>Add a product to see it here.</p>
        <a routerLink="/products">Browse products</a>
      </div>
    } @else {
      <div class="layout">
        <section class="items">
          @for (item of items(); track item.product.id) {
            <article class="item">
              <img [src]="item.product.imageUrl" [alt]="item.product.name" />
              <div class="info">
                <h2>{{ item.product.name }}</h2>
                <p>{{ item.product.price | currency: 'INR' : 'symbol' : '1.0-0' }} each</p>
                <span>Quantity: {{ item.quantity }}</span>
              </div>
              <button
                mat-button
                class="remove"
                type="button"
                (click)="remove(item.product.id)"
              >
                Remove
              </button>
            </article>
          }
        </section>

        <aside class="summary">
          <h2>Order summary</h2>
          <div class="line">
            <span>Items</span>
            <strong>{{ itemCount() }}</strong>
          </div>
          <div class="line total">
            <span>Subtotal</span>
            <strong>{{ subtotal() | currency: 'INR' : 'symbol' : '1.0-0' }}</strong>
          </div>
          <a class="checkout" routerLink="/checkout">Continue to checkout</a>
        </aside>
      </div>
    }
  `,
  styles: [
    `:host { display: block; }
    .eyebrow { color: #2458d3; font-size: .75rem; font-weight: 700; letter-spacing: .14em; }
    h1 { margin: 8px 0; font: 800 clamp(2rem, 5vw, 3rem) 'Manrope', sans-serif; letter-spacing: -.05em; }
    .heading > p:last-child, .info p { color: #697789; line-height: 1.6; }
    .empty, .summary { padding: 28px; border: 1px solid #e5eaf1; border-radius: 18px; background: white; }
    .empty a, .checkout { display: inline-block; margin-top: 12px; padding: 11px 16px; border-radius: 10px; background: #2458d3; color: white; text-decoration: none; font-weight: 600; }
    .layout { display: grid; grid-template-columns: minmax(0, 1fr) 300px; gap: 24px; align-items: start; }
    .items { display: grid; gap: 14px; }
    .item { display: flex; align-items: center; gap: 18px; padding: 16px; border: 1px solid #e5eaf1; border-radius: 16px; background: white; }
    img { width: 88px; height: 88px; border-radius: 12px; object-fit: cover; }
    .info { flex: 1; }
    .info h2, .summary h2 { margin: 0 0 6px; font: 700 1rem 'Manrope', sans-serif; }
    .info p { margin: 0 0 6px; }
    .remove { color: #b42318; }
    .line { display: flex; justify-content: space-between; margin: 18px 0; color: #697789; }
    .total { padding-top: 16px; border-top: 1px solid #e5eaf1; color: #182230; }
    @media (max-width: 760px) { .layout { grid-template-columns: 1fr; } .item { flex-wrap: wrap; } }`,
  ],
})
export class CartComponent implements OnInit, OnDestroy {
  readonly items = signal<readonly CartItem[]>(readCartItems());
  private cleanup: (() => void) | undefined;

  readonly itemCount = (): number =>
    this.items().reduce((total, item) => total + item.quantity, 0);

  readonly subtotal = (): number =>
    this.items().reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    );

  ngOnInit(): void {
    this.cleanup = listenToShopEvent('cart:items-changed', (items) =>
      this.items.set(items),
    );
  }

  ngOnDestroy(): void {
    this.cleanup?.();
  }

  remove(productId: string): void {
    removeCartItem(productId);
  }
}
