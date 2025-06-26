import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { LoginData } from '../../../interfaces/login.interface';

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

  loginForm: FormGroup;

  constructor(
      private fb: FormBuilder,
      private http: HttpClient,
      private router: Router,
      private authService: AuthService
  )

  {
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

    this.authService.login(loginData).subscribe({
      next: (res) => {
        this.authService.saveToken(res.accessToken);
        void this.router.navigate(['/main-page']);
      },
      error: err => {
        console.error('💥 ERREUR reçue :', err);

        if (err.status === 400) {
          alert('❌ Champs invalides ou manquants.');
        } else if (err.status === 403) {
          alert('⛔ Session expirée, veuillez vous reconnecter.');
        } else if (err.status === 0) {
          alert('🚫 Impossible de contacter le serveur.');
        } else {
          alert('❌ Une erreur inconnue est survenue.');
        }
      }
    });
  }
}
