import { CurrencyPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  computed,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import {
  listenToShopEvent,
  publishShopEvent,
  readCartItems,
  type CartItem,
} from '@shopsphere/contracts';

@Component({
  selector: 'shop-checkout',
  standalone: true,
  imports: [CurrencyPipe, RouterLink, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="intro">
      <p class="eyebrow">DEMO CHECKOUT</p>
      <h1>Review your order</h1>
      <p>This sample does not collect payment details or process real transactions.</p>
    </section>

    <div class="panel">
      <div class="line">
        <span>Items</span>
        <strong>{{ itemCount() }}</strong>
      </div>
      <div class="line">
        <span>Subtotal</span>
        <strong>{{ subtotal() | currency: 'INR' : 'symbol' : '1.0-0' }}</strong>
      </div>
      <div class="line total">
        <span>Total</span>
        <strong>{{ subtotal() | currency: 'INR' : 'symbol' : '1.0-0' }}</strong>
      </div>
      <button
        mat-flat-button
        type="button"
        [disabled]="completed() || itemCount() === 0"
        (click)="completeOrder()"
      >
        {{ completed() ? 'Demo order confirmed' : 'Confirm demo order' }}
      </button>
      @if (reference()) {
        <p class="success" role="status">Demo reference: {{ reference() }}</p>
      }
      <a routerLink="/products">Continue shopping</a>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        max-width: 680px;
        margin: 0 auto;
      }
      .eyebrow {
        color: #2458d3;
        font-size: 0.75rem;
        font-weight: 700;
        letter-spacing: 0.14em;
      }
      h1 {
        margin: 8px 0;
        font:
          800 clamp(2rem, 5vw, 3rem) 'Manrope',
          sans-serif;
        letter-spacing: -0.05em;
      }
      .intro > p:last-child {
        color: #697789;
        line-height: 1.6;
      }
      .panel {
        margin-top: 28px;
        padding: 28px;
        border: 1px solid #e5eaf1;
        border-radius: 18px;
        background: white;
      }
      .line {
        display: flex;
        justify-content: space-between;
        margin: 16px 0;
        color: #697789;
      }
      .total {
        padding-top: 18px;
        border-top: 1px solid #e5eaf1;
        color: #182230;
      }
      .panel > a {
        display: block;
        text-align: center;
        color: #2458d3;
        text-decoration: none;
      }
      .success {
        color: #147a49;
        font-weight: 600;
      }
    `,
  ],
})
export class CheckoutComponent implements OnInit, OnDestroy {
  readonly items = signal<readonly CartItem[]>(readCartItems());
  readonly itemCount = computed(() =>
    this.items().reduce((total, item) => total + item.quantity, 0),
  );
  readonly subtotal = computed(() =>
    this.items().reduce((total, item) => total + item.product.price * item.quantity, 0),
  );
  readonly completed = signal(false);
  readonly reference = signal('');
  private cleanup: (() => void) | undefined;

  ngOnInit(): void {
    this.cleanup = listenToShopEvent('cart:items-changed', (items) => this.items.set(items));
  }

  ngOnDestroy(): void {
    this.cleanup?.();
  }

  completeOrder(): void {
    const orderReference = `DEMO-${Date.now().toString(36).toUpperCase()}`;
    this.reference.set(orderReference);
    this.completed.set(true);
    publishShopEvent('checkout:completed', { orderReference });
  }
}
