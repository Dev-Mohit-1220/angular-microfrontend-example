import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'shop-remote-unavailable',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section role="alert">
      <h1>This section is temporarily unavailable</h1>
      <p>The remote could not be loaded. Check its deployment and federation manifest.</p>
      <a routerLink="/products">Return to products</a>
    </section>
  `,
})
export class RemoteUnavailableComponent {}
