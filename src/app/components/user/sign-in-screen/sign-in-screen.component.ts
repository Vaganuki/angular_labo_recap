import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterData } from '../../../interfaces/register.interface';

@Component({
  selector: 'app-sign-in-screen',
  imports: [
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './sign-in-screen.component.html',
  styleUrl: './sign-in-screen.component.scss'
})
export class SignInScreenComponent {

  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  )

  {
    this.registerForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      pseudo: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      avatar: ['', Validators.required],
      birthdate: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      alert('Veuillez remplir tous les champs correctement.');
      return;
    }

    const registerData: RegisterData = this.registerForm.value;

    this.http.post('http://localhost:3000/register', registerData)
      .subscribe({
        next: () => {
          alert('Inscription réussie ! Vous pouvez maintenant vous connecter.');
          void this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Erreur inscription:', err);
          alert('Erreur lors de l\'inscription. Veuillez réessayer.');
        }
      });
  }
}
