import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '@services/auth.service';

type AlertType = 'success' | 'conflict' | 'validation' | 'offline' | null;
type PasswordStrength = 'weak' | 'medium' | 'strong' | '';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  isLoading = false;
  showPassword = false;
  registrationSuccess = false;
  alertType: AlertType = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  get passwordStrength(): PasswordStrength {
    const value = this.form?.get('password')?.value ?? '';
    if (!value) return '';

    let score = 0;
    if (value.length >= 8) score++;
    if (/[A-Z]/.test(value)) score++;
    if (/[0-9]/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;

    if (score <= 1) return 'weak';
    if (score <= 2) return 'medium';
    return 'strong';
  }

  get strengthScore(): number {
    const value = this.form?.get('password')?.value ?? '';
    if (!value) return 0;

    let score = 0;
    if (value.length >= 8) score++;
    if (/[A-Z]/.test(value)) score++;
    if (/[0-9]/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;
    return score;
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.alertType = null;

    const { name, email, password } = this.form.value;

    this.authService
      .register({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
      })
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.registrationSuccess = true;
          this.alertType = 'success';
        },
        error: (error: HttpErrorResponse) => {
          this.isLoading = false;
          this.handleError(error);
        },
      });
  }

  private buildForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  private handleError(error: HttpErrorResponse): void {
    if (error.status === 409) {
      this.alertType = 'conflict';
    } else if (error.status === 400) {
      this.alertType = 'validation';
    } else {
      this.alertType = 'offline';
    }
  }
}
