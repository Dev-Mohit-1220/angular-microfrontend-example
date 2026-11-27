import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import type { OnDestroy, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
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
      @if (navigating()) {
        <p class="navigation-status" role="status" aria-live="polite">Loading section…</p>
      }
      <router-outlet />
    </main>

    <footer class="footer">ShopSphere demo · Independent Angular microfrontends</footer>
  `,
  styles: [`
    .navigation-status {
      margin: 0 0 16px;
      color: #2458d3;
      font-size: 0.9rem;
    }
  `],
})
export class AppComponent implements OnInit, OnDestroy {
  readonly cartCount = signal(0);
  readonly navigating = signal(false);
  private stopListening: (() => void) | undefined;
  private routerSubscription: Subscription | undefined;

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    this.stopListening = listenToShopEvent('cart:count-changed', ({ count }) =>
      this.cartCount.set(count),
    );
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.navigating.set(true);
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.navigating.set(false);
      }
    });
  }

  ngOnDestroy(): void {
    this.stopListening?.();
    this.routerSubscription?.unsubscribe();
  }
}
