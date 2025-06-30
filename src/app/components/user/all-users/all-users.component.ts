import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgForOf } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { FriendService } from '../../../services/friend.service';
import { RegisterData } from '../../../interfaces/register.interface';

@Component({
  selector: 'app-all-users',
  standalone: true,
  imports: [RouterLink, NgForOf],
  templateUrl: './all-users.component.html',
  styleUrl: './all-users.component.scss'
})
export class AllUsersComponent implements OnInit {
  users: RegisterData[] = [];
  errorMessage = '';

  private userService = inject(UserService);
  private friendService = inject(FriendService);

  currentUserId = localStorage.getItem('userId');

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (err) => {
        console.error('Erreur chargement utilisateurs:', err);
        this.errorMessage = 'Impossible de charger les utilisateurs.';
      }
    });
  }

  sendFriendRequest(receiverId: number): void {
    if (!this.currentUserId) {
      this.errorMessage = 'Utilisateur non connecté.';
      return;
    }

    if (+this.currentUserId === receiverId) {
      this.errorMessage = 'Vous ne pouvez pas vous envoyer une demande d\'ami à vous-même.';
      return;
    }

    this.friendService.sendRequest(+this.currentUserId, receiverId).subscribe({
      next: (res) => {
        console.log('Demande envoyée:', res);
        // Tu peux ajouter un message de succès ici ou désactiver le bouton
      },
      error: (err) => {
        console.error('Erreur lors de l\'envoi de la demande:', err);
        this.errorMessage = 'Erreur lors de l\'envoi de la demande d\'ami.';
      }
    });
  }
}
