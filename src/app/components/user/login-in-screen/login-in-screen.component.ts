import {Component, inject, Input} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {ReactiveFormsModule, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginData} from '../../../interfaces/login.interface';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-login-in-screen',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './login-in-screen.component.html',
  styleUrl: './login-in-screen.component.scss'
})
export class LoginInScreenComponent {
  private _authService = inject(AuthService);
  private router = inject(Router);
  loginForm: FormGroup;

  constructor( private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  PasswordForgotten() {
    alert('🔐 Votre mot de passe est : Test1234=');
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      alert('❌ Veuillez remplir tous les champs correctement.');
      return;
    }

    const loginData: LoginData = this.loginForm.value;
    this._authService.login(loginData).subscribe(
      {
        next: (res) => {
          void this.router.navigate(['/']);
        }
      }
    );
  }
}
