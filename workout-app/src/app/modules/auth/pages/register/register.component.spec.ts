import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { RegisterComponent } from './register.component';
import { AuthService } from '@services/auth.service';
import { AuthResponse } from '@models/auth.model';
import { User } from '@models/user.model';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authServiceMock: { register: ReturnType<typeof vi.fn> };

  const mockUser: User = {
    id: 'uuid-123',
    email: 'test@example.com',
    name: 'Test User',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockAuthResponse: AuthResponse = {
    user: mockUser,
    accessToken: 'mock-access-token',
    refreshToken: 'mock-refresh-token',
  };

  beforeEach(async () => {
    authServiceMock = { register: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [RegisterComponent, ReactiveFormsModule, RouterModule.forRoot([])],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with an invalid empty form', () => {
    expect(component.form.valid).toBe(false);
    expect(component.form.get('name')?.value).toBe('');
    expect(component.form.get('email')?.value).toBe('');
    expect(component.form.get('password')?.value).toBe('');
  });

  it('should require name with minimum 2 characters', () => {
    const nameControl = component.form.get('name')!;

    nameControl.setValue('');
    expect(nameControl.hasError('required')).toBe(true);

    nameControl.setValue('A');
    expect(nameControl.hasError('minlength')).toBe(true);

    nameControl.setValue('Ab');
    expect(nameControl.valid).toBe(true);
  });

  it('should require a valid email', () => {
    const emailControl = component.form.get('email')!;

    emailControl.setValue('');
    expect(emailControl.hasError('required')).toBe(true);

    emailControl.setValue('invalid-email');
    expect(emailControl.hasError('email')).toBe(true);

    emailControl.setValue('valid@example.com');
    expect(emailControl.valid).toBe(true);
  });

  it('should require password with minimum 8 characters', () => {
    const passwordControl = component.form.get('password')!;

    passwordControl.setValue('');
    expect(passwordControl.hasError('required')).toBe(true);

    passwordControl.setValue('short');
    expect(passwordControl.hasError('minlength')).toBe(true);

    passwordControl.setValue('validpass');
    expect(passwordControl.valid).toBe(true);
  });

  it('should not submit when form is invalid', () => {
    component.onSubmit();
    expect(authServiceMock.register).not.toHaveBeenCalled();
  });

  it('should mark all fields as touched on invalid submit', () => {
    component.onSubmit();
    expect(component.form.get('name')?.touched).toBe(true);
    expect(component.form.get('email')?.touched).toBe(true);
    expect(component.form.get('password')?.touched).toBe(true);
  });

  it('should call authService.register on valid submit', () => {
    authServiceMock.register.mockReturnValue(of(mockAuthResponse));

    component.form.setValue({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    });

    component.onSubmit();

    expect(authServiceMock.register).toHaveBeenCalledWith({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    });
  });

  it('should set isLoading to true during submission', () => {
    authServiceMock.register.mockReturnValue(of(mockAuthResponse));

    component.form.setValue({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    });

    expect(component.isLoading).toBe(false);
    component.onSubmit();
  });

  it('should show success state after successful registration', () => {
    authServiceMock.register.mockReturnValue(of(mockAuthResponse));

    component.form.setValue({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    });

    component.onSubmit();

    expect(component.registrationSuccess).toBe(true);
    expect(component.isLoading).toBe(false);
  });

  it('should show conflict error on 409 response', () => {
    const errorResponse = new HttpErrorResponse({ status: 409 });
    authServiceMock.register.mockReturnValue(throwError(() => errorResponse));

    component.form.setValue({
      name: 'Test User',
      email: 'existing@example.com',
      password: 'password123',
    });

    component.onSubmit();

    expect(component.alertType).toBe('conflict');
    expect(component.isLoading).toBe(false);
  });

  it('should show validation error on 400 response', () => {
    const errorResponse = new HttpErrorResponse({ status: 400 });
    authServiceMock.register.mockReturnValue(throwError(() => errorResponse));

    component.form.setValue({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    });

    component.onSubmit();

    expect(component.alertType).toBe('validation');
    expect(component.isLoading).toBe(false);
  });

  it('should show generic error on network failure', () => {
    const errorResponse = new HttpErrorResponse({ status: 0 });
    authServiceMock.register.mockReturnValue(throwError(() => errorResponse));

    component.form.setValue({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    });

    component.onSubmit();

    expect(component.alertType).toBe('offline');
    expect(component.isLoading).toBe(false);
  });

  it('should toggle password visibility', () => {
    expect(component.showPassword).toBe(false);
    component.togglePasswordVisibility();
    expect(component.showPassword).toBe(true);
    component.togglePasswordVisibility();
    expect(component.showPassword).toBe(false);
  });

  it('should calculate password strength as weak', () => {
    component.form.get('password')?.setValue('abcdefgh');
    expect(component.passwordStrength).toBe('weak');
  });

  it('should calculate password strength as medium', () => {
    component.form.get('password')?.setValue('Abcdefgh');
    expect(component.passwordStrength).toBe('medium');
  });

  it('should calculate password strength as strong', () => {
    component.form.get('password')?.setValue('Abcdefg1!');
    expect(component.passwordStrength).toBe('strong');
  });

  it('should return empty strength for empty password', () => {
    component.form.get('password')?.setValue('');
    expect(component.passwordStrength).toBe('');
  });

  it('should normalize email to lowercase before submit', () => {
    authServiceMock.register.mockReturnValue(of(mockAuthResponse));

    component.form.setValue({
      name: 'Test User',
      email: 'Test@Example.COM',
      password: 'password123',
    });

    component.onSubmit();

    expect(authServiceMock.register).toHaveBeenCalledWith({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    });
  });
});
