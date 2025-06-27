import {Component, inject, Input} from '@angular/core';
import {OverlayRef} from '@angular/cdk/overlay';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginData } from '../../../interfaces/login.interface';
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
  @Input() overlayRef!: OverlayRef;
  private _authService = inject(AuthService);
  loginForm: FormGroup;

  constructor(
      private fb: FormBuilder,
      private http: HttpClient,
      private router: Router
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
     this._authService.login(loginData).subscribe(
       {
         next: (res) => {
           void this.router.navigate(['/']);
         }
       }
     );

    // this.http.post('http://localhost:3000/login', loginData).subscribe({
    //   next: (res: any) => {
    //     localStorage.setItem('token', res.accessToken);
    //     void this.router.navigate(['/']);
    //   },
    //   error: err => {
    //     console.error('💥 ERREUR reçue :', err);
    //
    //     if (err.status === 400) {
    //       alert('❌ Champs invalides ou manquants.');
    //     } else if (err.status === 403) {
    //       alert('⛔ Session expirée, veuillez vous reconnecter.');
    //     } else if (err.status === 0) {
    //       alert('🚫 Impossible de contacter le serveur.');
    //     } else {
    //       alert('❌ Une erreur inconnue est survenue.');
    //     }
    //   }
    // });
  }
  close() {
    this.overlayRef?.dispose();
  }
}
