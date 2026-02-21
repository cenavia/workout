import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';

import { RegisterComponent } from './register.component';
import { AuthService } from '@services/auth.service';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: { registerAccount: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    authService = { registerAccount: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [RegisterComponent, HttpClientTestingModule],
      providers: [
        { provide: AuthService, useValue: authService },
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show validation errors when form is invalid and submitted', () => {
    component.form.patchValue({ name: 'J', email: 'bad', password: 'short' });
    component.onSubmit();
    expect(component.activeAlert).toBe('validation');
    expect(component.validationDetails.length).toBeGreaterThan(0);
    expect(authService.registerAccount).not.toHaveBeenCalled();
  });

  it('should call registerAccount when form is valid', () => {
    authService.registerAccount.mockReturnValue(of({ message: 'OK', user: { id: '1', email: 'a@b.com', name: 'Test' } }));
    component.form.patchValue({ name: 'Juan Pérez', email: 'juan@example.com', password: 'password123' });
    component.onSubmit();
    expect(authService.registerAccount).toHaveBeenCalledWith({ name: 'Juan Pérez', email: 'juan@example.com', password: 'password123' });
    expect(component.activeAlert).toBe('success');
  });

  it('should show conflict alert on 409 error', () => {
    authService.registerAccount.mockReturnValue(throwError(() => ({ status: 409 })));
    component.form.patchValue({ name: 'Juan', email: 'dup@example.com', password: 'password123' });
    component.onSubmit();
    expect(component.activeAlert).toBe('conflict');
  });

  it('should show validation alert on 400 error with details', () => {
    authService.registerAccount.mockReturnValue(throwError(() => ({ status: 400, error: { details: ['Email invalid'] } })));
    component.form.patchValue({ name: 'Juan Pérez', email: 'valid@example.com', password: 'password123' });
    component.onSubmit();
    expect(component.activeAlert).toBe('validation');
    expect(component.validationDetails).toEqual(['Email invalid']);
  });
});
