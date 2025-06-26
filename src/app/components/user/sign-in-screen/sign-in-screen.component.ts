import { Component, Input } from '@angular/core';
import { OverlayRef } from '@angular/cdk/overlay';
@Component({
  selector: 'app-sign-in-screen',
  imports: [],
  templateUrl: './sign-in-screen.component.html',
  styleUrl: './sign-in-screen.component.scss'
})
export class SignInScreenComponent {

  username = '';
  password = '';
  errorMessage = '';

  constructor() {
  }

  onSignIn() {
    // Logic for signing in the user
    if (this.username && this.password) {
      // Simulate a successful sign-in
      console.log('User signed in:', this.username);
      this.errorMessage = '';
    } else {
      this.errorMessage = 'Please enter both username and password.';
    }
  }

  onSignUp() {
    // Logic for signing up the user
    console.log('User signed up:', this.username);
  }
  @Input() overlayRef!: OverlayRef;

  close() {
    this.overlayRef?.dispose();
  }
}
