import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, Router } from "@angular/router";
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {
  passwordForm: FormGroup;
  userId = localStorage.getItem('userId');

  constructor(
      private fb: FormBuilder,
      private userService: UserService,
      private authService: AuthService,
      private router: Router
  ) {
    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.passwordForm.invalid || !this.userId) return;

    const { currentPassword, newPassword, confirmPassword } = this.passwordForm.value;

    // 1. Récupère l'email de l'utilisateur actuel
    this.userService.getUserById(this.userId).subscribe({
      next: (user) => {
        const email = user.email;

        // 2. Teste la connexion avec l'ancien mot de passe
        this.authService.login({ email, password: currentPassword }).subscribe({
          next: () => {
            const verifiedNewPassword = newPassword === confirmPassword;

            if (!verifiedNewPassword) {
              alert('❌ Les nouveaux mots de passe ne correspondent pas.');
              return;
            }

            // 3. Si la connexion marche, met à jour le mot de passe
            this.userService.updatePassword(this.userId!, newPassword).subscribe({
              next: () => {
                alert('✅ Mot de passe modifié avec succès.');
                this.passwordForm.reset();
                void this.router.navigate(['/main-page/profil']);
              },
              error: () => alert('❌ Erreur lors de la mise à jour du mot de passe.')
            });
          },
          error: () => {
            alert('❌ Ancien mot de passe incorrect.');
          }
        });
      },
      error: () => {
        alert('⚠️ Impossible de récupérer votre profil.');
      }
    });
  }

}
