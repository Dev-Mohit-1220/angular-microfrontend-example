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
  styles: [
    `:host { display: block; max-width: 700px; margin: 0 auto; }
    .profile { padding: 34px; border: 1px solid #e5eaf1; border-radius: 18px; background: white; }
    .eyebrow { color: #2458d3; font-size: .75rem; font-weight: 700; letter-spacing: .14em; }
    h1 { margin: 8px 0; font: 800 clamp(2rem, 5vw, 3rem) 'Manrope', sans-serif; letter-spacing: -.05em; }
    p { color: #697789; line-height: 1.7; }
    .profile-card { display: flex; align-items: center; gap: 16px; margin-top: 28px; padding: 18px; border-radius: 14px; background: #f5f7fb; }
    .avatar { display: grid; place-items: center; width: 52px; height: 52px; border-radius: 50%; background: #e4ebff; color: #2458d3; font: 800 1.3rem 'Manrope', sans-serif; }
    .profile-card span { display: block; margin-top: 5px; color: #697789; font-size: .88rem; }`,
  ],
})
export class ProfileComponent {}
