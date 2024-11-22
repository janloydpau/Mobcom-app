import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular'; // Import ToastController

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = '';
  password: string = '';
  showPassword: boolean = false;

  constructor(
    private router: Router,
    private toastController: ToastController // Inject ToastController
  ) { }

  ngOnInit() { }

  // Updated onSubmit method with toast functionality
  async onSubmit(loginForm: any) {
    // Retrieve user data from localStorage
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  
    if (userData.email === loginForm.value.email && userData.password === loginForm.value.password) {
      // Successful login (for demo, you can redirect to a different page)
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/home']);//Still goes to home for presentation lang
      console.log('Invalid email or password');
  
      // Create and display the toast for incorrect credentials
      const toast = await this.toastController.create({
        message: 'Email or password is incorrect.',
        duration: 2000, // Toast duration of 2 seconds
        position: 'bottom', // Position at the bottom
        color: 'danger', // Red color for error
      });
  
      // Present the toast
      await toast.present();
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // Method to navigate to the signup page
  navigateToSignup(event: Event) {
    event.preventDefault();
    this.router.navigate(['/signup']);
    this.email = '';
    this.password = '';
    this.showPassword = false;
  }
}
