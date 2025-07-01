import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgForOf, NgIf } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { FriendService } from '../../../services/friend.service';
import { RegisterData } from '../../../interfaces/register.interface';
import { FriendData } from '../../../interfaces/friend.interface';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-all-users',
  standalone: true,
  imports: [RouterLink, NgForOf, NgIf, ReactiveFormsModule, FormsModule],
  templateUrl: './all-users.component.html',
  styleUrl: './all-users.component.scss'
})
export class AllUsersComponent implements OnInit {

  users: RegisterData[] = [];
  searchValue = '';
  errorMessage = '';
  currentUserId = localStorage.getItem('userId');

  // Suivi des demandes envoyées et des amis confirmés
  sentRequests = new Set<number>();
  friends = new Set<number>();

  private userService = inject(UserService);
  private friendService = inject(FriendService);

  ngOnInit(): void {
    this.loadUsers();
    this.loadSentFriendRequests();
    this.loadFriends();
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

  loadSentFriendRequests(): void {
    if (!this.currentUserId) return;

    this.userService.getUserFriendsByStatus(this.currentUserId, false).subscribe({
      next: (requests: FriendData[]) => {
        requests
            .filter(r => r.senderId === +this.currentUserId!)
            .forEach(r => this.sentRequests.add(r.receiverId));
      },
      error: (err) => {
        console.error('Erreur chargement demandes envoyées:', err);
      }
    });
  }

  loadFriends(): void {
    if (!this.currentUserId) return;

    this.userService.getUserFriendsByStatus(this.currentUserId, true).subscribe({
      next: (friends: FriendData[]) => {
        friends.forEach(friend => {
          const otherId = friend.senderId === +this.currentUserId! ? friend.receiverId : friend.senderId;
          this.friends.add(otherId);
        });
      },
      error: (err) => {
        console.error('Erreur chargement des amis:', err);
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
        this.sentRequests.add(receiverId);
      },
      error: (err) => {
        console.error('Erreur lors de l\'envoi de la demande:', err);
        this.errorMessage = 'Erreur lors de l\'envoi de la demande d\'ami.';
      }
    });
  }

  searchUsers(): void {
    if (!this.searchValue.trim()) {
      // Si rien n'est saisi, charger tous les users
      this.loadUsers();
      return;
    }

    this.userService.searchUsersByPseudo(this.searchValue.trim()).subscribe({
      next: (users) => {
        this.users = users;
        if (users.length === 0) {
          this.errorMessage = 'Aucun utilisateur trouvé.';
        } else {
          this.errorMessage = '';
        }
      },
      error: (err) => {
        console.error('Erreur recherche utilisateurs:', err);
        this.errorMessage = 'Erreur lors de la recherche.';
      }
    });
  }

}
