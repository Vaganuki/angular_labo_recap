import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { RouterLink } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { RegisterData } from '../../../interfaces/register.interface';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NgIf,
  ],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss'
})
export class ProfilComponent implements OnInit {
  user?: RegisterData;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe({
      next: (user) => {
        this.user = user
        console.log('User reçu:', user);
      },
      error: (err) => console.error('Erreur récupération profil:', err)
    });
  }

  editProfile() {

  }

  deleteProfile() {

  }

  changePassword() {

  }
}
