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
