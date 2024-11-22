import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signupForm!: FormGroup;
  showPassword: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    });

    // Password matching check
    this.signupForm.get('password')?.valueChanges.subscribe(() => {
      this.checkPasswordMatch();
    });
    
  }

  // Check password and confirm password match
  checkPasswordMatch() {
    const password = this.signupForm.get('password')?.value;
    const confirmPassword = this.signupForm.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      this.signupForm.get('confirmPassword')?.setErrors({ passwordsDoNotMatch: true });
    } else {
      this.signupForm.get('confirmPassword')?.setErrors(null);
    }
  }

  // Submit the form
  onSubmit() {
    if (this.signupForm.valid && !this.passwordsDoNotMatch) {
      const signupData = this.signupForm.value;
  
      // Store the user data in localStorage
      localStorage.setItem('userData', JSON.stringify(signupData));
  
      // Redirect to login
      this.router.navigate(['/login']);
    } else {
      console.log('Form is invalid or passwords do not match');
    }
  }
  

  // Navigate to the login page
  navigateToLogin() {
    this.router.navigate(['/login']);
    this.signupForm.reset();
  }

  get emailField() {
    return this.signupForm.get('email');
  }

  get nameField() {
    return this.signupForm.get('name');
  }

  get passwordField() {
    return this.signupForm.get('password');
  }

  get confirmPasswordField() {
    return this.signupForm.get('confirmPassword');
  }

  get passwordsDoNotMatch() {
    return this.signupForm.hasError('passwordsDoNotMatch', 'confirmPassword');
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
