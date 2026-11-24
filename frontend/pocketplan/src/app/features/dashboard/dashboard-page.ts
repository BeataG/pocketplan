import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-dashboard-page',
  template: `
    <section class="dashboard-page" aria-labelledby="dashboard-title">
      <p class="eyebrow">Your finances, in one place</p>
      <h1 id="dashboard-title">Dashboard</h1>
      <p class="placeholder-message">Your financial overview will appear here.</p>
    </section>
  `,
  styles: `
    .dashboard-page {
      max-width: 900px;
      margin: 0 auto;
    }

    .eyebrow {
      margin: 0 0 12px;
      color: var(--color-accent);
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }

    h1 {
      margin: 0;
      color: var(--color-text);
      font-size: clamp(2rem, 4vw, 2.6rem);
      letter-spacing: -0.05em;
    }

    .placeholder-message {
      margin-top: 14px;
      color: var(--color-text-muted);
      line-height: 1.6;
    }
  `,
})
export class DashboardPage {}
