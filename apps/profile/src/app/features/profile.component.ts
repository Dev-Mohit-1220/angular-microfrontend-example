import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'shop-profile',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="profile">
      <p class="eyebrow">YOUR SPACE</p>
      <h1>Profile</h1>
      <p>
        This remote is a placeholder. Connect it to an authenticated backend before
        displaying or changing real user information.
      </p>
      <div class="profile-card">
        <div class="avatar" aria-hidden="true">G</div>
        <div>
          <strong>Guest shopper</strong>
          <span>Demo profile · No account data stored</span>
        </div>
      </div>
    </section>
  `,
})
export class ProfileComponent {}
