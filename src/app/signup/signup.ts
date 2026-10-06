import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-signup',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './signup.css',
  templateUrl: './signup.html',
})
export class Signup {
  // Form input signals
  fullName = signal('');
  email = signal('');
  password = signal('');
  confirmPassword = signal('');

  // Form touched state signals
  fullNameTouched = signal(false);
  emailTouched = signal(false);
  passwordTouched = signal(false);
  confirmPasswordTouched = signal(false);

  // Password visibility signals
  showPassword = signal(false);
  showConfirmPassword = signal(false);

  // UI status signals
  isSubmitting = signal(false);
  showSuccessModal = signal(false);
  submittedData = signal<{ name: string; email: string } | null>(null);

  fullNameError = computed(() => {
    if (!this.fullNameTouched()) return '';
    const val = this.fullName().trim();
    if (!val) return 'Full Name is required';
    if (val.length < 2) return 'Name must be at least 2 characters';
    return '';
  });

  emailError = computed(() => {
    if (!this.emailTouched()) return '';
    const val = this.email().trim();
    if (!val) return 'Email address is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(val)) return 'Please enter a valid email address';
    return '';
  });

  passwordError = computed(() => {
    if (!this.passwordTouched()) return '';
    const val = this.password();
    if (!val) return 'Password is required';
    if (val.length < 8) return 'Password must be at least 8 characters';
    return '';
  });

  confirmPasswordError = computed(() => {
    if (!this.confirmPasswordTouched()) return '';
    const val = this.confirmPassword();
    if (!val) return 'Please confirm your password';
    if (val !== this.password()) return 'Passwords do not match';
    return '';
  });

  handleSubmit(event: Event) {
    event.preventDefault();

    // Mark all inputs as touched to display errors if submitted empty
    this.fullNameTouched.set(true);
    this.emailTouched.set(true);
    this.passwordTouched.set(true);
    this.confirmPasswordTouched.set(true);

    // If any computed error exists, block submission
    if (
      this.fullNameError() ||
      this.emailError() ||
      this.passwordError() ||
      this.confirmPasswordError()
    ) {
      return;
    }

    this.isSubmitting.set(true);

    // Simulate an async API call
    setTimeout(() => {
      this.isSubmitting.set(false);
      this.submittedData.set({
        name: this.fullName(),
        email: this.email()
      });
      this.showSuccessModal.set(true);
    }, 1200);
  }

  closeModal() {
    this.showSuccessModal.set(false);
    this.fullName.set('');
    this.email.set('');
    this.password.set('');
    this.confirmPassword.set('');
    this.fullNameTouched.set(false);
    this.emailTouched.set(false);
    this.passwordTouched.set(false);
    this.confirmPasswordTouched.set(false);
  }
}
