import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { addCartItem, type Product } from '@shopsphere/contracts';

const PRODUCTS: readonly Product[] = [
  {
    id: 'p-100',
    name: 'Everyday Backpack',
    description: 'A lightweight everyday carry with thoughtful organization.',
    price: 2499,
    category: 'Accessories',
    imageUrl:
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=900&auto=format&fit=crop',
  },
  {
    id: 'p-101',
    name: 'Studio Headphones',
    description: 'Comfortable over-ear listening for work and travel.',
    price: 3999,
    category: 'Electronics',
    imageUrl:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&auto=format&fit=crop',
  },
];

@Component({
  selector: 'shop-product-list',
  standalone: true,
  imports: [CurrencyPipe, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="intro">
      <p class="eyebrow">PRODUCT CATALOGUE</p>
      <h1>Find your next favourite.</h1>
      <p>Browse the Products remote and add an item to your shared cart.</p>
    </section>

    <section class="grid" aria-label="Products">
      @for (product of products; track product.id) {
        <article class="card">
          <img [src]="product.imageUrl" [alt]="product.name" loading="lazy" />
          <div class="content">
            <span class="category">{{ product.category }}</span>
            <h2>{{ product.name }}</h2>
            <p>{{ product.description }}</p>
            <div class="footer">
              <strong>{{ product.price | currency: 'INR' : 'symbol' : '1.0-0' }}</strong>
              <button mat-flat-button type="button" (click)="addToCart(product)">
                Add to cart
              </button>
            </div>
          </div>
        </article>
      }
    </section>

    <p class="notice" aria-live="polite">{{ feedback }}</p>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .intro {
        max-width: 650px;
        margin-bottom: 32px;
      }
      .eyebrow,
      .category {
        color: #2458d3;
        font-size: 0.75rem;
        font-weight: 700;
        letter-spacing: 0.14em;
      }
      h1 {
        margin: 8px 0 12px;
        font:
          800 clamp(2rem, 5vw, 3.2rem) 'Manrope',
          sans-serif;
        letter-spacing: -0.05em;
      }
      .intro > p:last-child,
      .card p {
        color: #697789;
        line-height: 1.6;
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
        gap: 22px;
      }
      .card {
        overflow: hidden;
        border: 1px solid #e5eaf1;
        border-radius: 18px;
        background: white;
      }
      img {
        display: block;
        width: 100%;
        height: 190px;
        object-fit: cover;
      }
      .content {
        padding: 18px;
      }
      h2 {
        margin: 8px 0;
        font:
          700 1.08rem 'Manrope',
          sans-serif;
      }
      .card p {
        min-height: 48px;
        margin: 0 0 18px;
        font-size: 0.9rem;
      }
      .footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
      }
      .notice {
        min-height: 24px;
        color: #2458d3;
        font-size: 0.9rem;
      }
    `,
  ],
})
export class ProductListComponent {
  readonly products: readonly Product[] = PRODUCTS;
  feedback: string = '';

  addToCart(product: Product): void {
    addCartItem(product);
    this.feedback = `${product.name} added to cart.`;
  }
}
