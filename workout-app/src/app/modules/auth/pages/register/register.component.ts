import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { RegisterDto } from '@models/auth.model';

type AlertType = 'success' | 'conflict' | 'validation' | 'offline';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  form: FormGroup;
  isLoading = false;
  showPassword = false;
  activeAlert: AlertType | null = null;
  validationDetails: string[] = [];

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  get passwordStrength(): { score: number; label: string } {
    const val = this.form.get('password')?.value ?? '';
    let score = 0;
    if (val.length >= 8) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;
    const label = score <= 1 ? 'Weak' : score <= 2 ? 'Fair' : 'Strong';
    return { score, label };
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  hideAlerts(): void {
    this.activeAlert = null;
  }

  hasError(field: string): boolean {
    const c = this.form.get(field);
    return !!(c?.invalid && c?.touched);
  }

  getErrorClass(field: string): string {
    const c = this.form.get(field);
    if (!c?.touched) return '';
    return c.invalid ? 'has-error' : 'has-success';
  }

  onSubmit(): void {
    this.hideAlerts();
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.activeAlert = 'validation';
      this.validationDetails = [];
      Object.keys(this.form.controls).forEach(k => {
        const c = this.form.get(k);
        if (c?.errors) {
          if (c.errors['required']) this.validationDetails.push(`${k} is required`);
          if (c.errors['email']) this.validationDetails.push('Please enter a valid email');
          if (c.errors['minlength']) this.validationDetails.push(`${k} must be at least ${c.errors['minlength'].requiredLength} characters`);
        }
      });
      return;
    }

    this.isLoading = true;
    const data: RegisterDto = this.form.value;

    this.auth.registerAccount(data).subscribe({
      next: () => {
        this.activeAlert = 'success';
        this.form.disable();
        this.isLoading = false;
        setTimeout(() => this.router.navigate(['/auth/login']), 2000);
      },
      error: (err: { status?: number; error?: { error?: string; details?: string[] }; message?: string }) => {
        this.isLoading = false;
        if (err.status === 409) {
          this.activeAlert = 'conflict';
        } else if (err.status === 400 && err.error?.details) {
          this.activeAlert = 'validation';
          this.validationDetails = err.error.details;
        } else if (err.status === 0 || err.message?.includes('Network')) {
          this.activeAlert = 'offline';
        } else {
          this.activeAlert = 'validation';
          this.validationDetails = [err.error?.error ?? 'Registration failed'];
        }
      }
    });
  }
}
