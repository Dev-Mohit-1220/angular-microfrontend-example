import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { listenToShopEvent } from '@shopsphere/contracts';

@Component({
  selector: 'shop-root',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="topbar">
      <a class="brand" routerLink="/products">ShopSphere</a>
      <nav aria-label="Main navigation">
        <a routerLink="/products" routerLinkActive="active">Products</a>
        <a routerLink="/cart" routerLinkActive="active">
          Cart <span class="count">{{ cartCount() }}</span>
        </a>
        <a routerLink="/checkout" routerLinkActive="active">Checkout</a>
        <a routerLink="/profile" routerLinkActive="active">Profile</a>
      </nav>
    </header>

    <main class="page-shell">
      <router-outlet />
    </main>

    <footer class="footer">ShopSphere demo · Independent Angular microfrontends</footer>
  `,
})
export class AppComponent implements OnInit, OnDestroy {
  readonly cartCount = signal(0);
  private stopListening: (() => void) | undefined;

  ngOnInit(): void {
    this.stopListening = listenToShopEvent('cart:count-changed', ({ count }) =>
      this.cartCount.set(count),
    );
  }

  ngOnDestroy(): void {
    this.stopListening?.();
  }
}
