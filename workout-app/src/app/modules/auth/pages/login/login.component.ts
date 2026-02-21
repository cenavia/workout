import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="auth-page">
      <header class="auth-header">
        <a routerLink="/">Workout Tracker</a>
      </header>
      <div class="auth-body">
        <div class="auth-card">
          <h1>Sign in</h1>
          <p class="subtitle">Login page - coming soon.</p>
          <p><a routerLink="/auth/register">Create account</a></p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-page { min-height: 100vh; display: flex; flex-direction: column; font-family: inherit; background: var(--bg-page); }
    .auth-header { background: var(--bg-navbar); color: var(--text-on-primary); height: var(--navbar-height); display: flex; align-items: center; justify-content: center; font-weight: 700; }
    .auth-header a { color: var(--text-on-primary); text-decoration: none; }
    .auth-body { flex: 1; display: flex; align-items: center; justify-content: center; padding: var(--space-2xl); }
    .auth-card { background: var(--bg-card); border: 1px solid var(--border-default); border-radius: var(--radius-xl); padding: var(--space-4xl); max-width: 440px; }
    .auth-card h1 { margin: 0 0 var(--space-sm); }
    .subtitle { color: var(--text-secondary); margin-bottom: var(--space-xl); }
    a { color: var(--text-link); }
  `]
})
export class LoginComponent {}
