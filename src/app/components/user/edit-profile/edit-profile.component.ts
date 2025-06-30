import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {UserService} from '../../../services/user.service';


@Component({
  selector: 'app-edit-profile',
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent implements OnInit {

  profileForm: FormGroup;
  userId = localStorage.getItem('userId');

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private userService: UserService,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      pseudo: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      avatar: ['', Validators.required],
      birthdate: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe({
      next: (user: any) => {
        this.profileForm.patchValue(user);
      },
      error: (err) => {
        console.error("Erreur lors du chargement du profil", err);
        alert("Impossible de charger le profil.");
        void this.router.navigate(['/login']);
      }
    });
  }

  onSubmit() {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    if (!this.userId) {
      alert("Utilisateur non identifié.");
      return;
    }

    const formData = this.profileForm.value;

    this.userService.updateUser(this.userId, formData).subscribe({
      next: () => {
        alert('Profil mis à jour avec succès !');
        this.router.navigate(['/main-page/profil']);
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour du profil', err);
        alert('Erreur lors de la mise à jour du profil.');
      }
    });
  }

}
