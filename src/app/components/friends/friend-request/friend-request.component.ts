import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf, NgForOf } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { FriendService } from '../../../services/friend.service';
import { FriendData } from '../../../interfaces/friend.interface';
import { RegisterData } from '../../../interfaces/register.interface';

@Component({
  selector: 'app-friend-request',
  standalone: true,
  imports: [RouterLink, NgIf, NgForOf],
  templateUrl: './friend-request.component.html',
  styleUrl: './friend-request.component.scss'
})
export class FriendRequestComponent implements OnInit {

  currentUserId = localStorage.getItem('userId');
  pendingRequests: { friendId: number; user: RegisterData }[] = [];
  errorMessage = '';

  private userService = inject(UserService);
  private friendService = inject(FriendService);

  ngOnInit(): void {
    if (!this.currentUserId) return;

    this.userService.getUserFriendsByStatus(this.currentUserId, false).subscribe({
      next: (requests: FriendData[]) => {

        // Ne garder que les demandes reçues (où currentUser est receiver).
        const received = requests.filter(r => r.receiverId === +this.currentUserId!);

        received.forEach(r => {
          this.userService.getUserById(r.senderId).subscribe({
            next: (user) => {
              this.pendingRequests.push({
                friendId: r.id!,
                user
              });
            }
          });
        });
      },
      error: (err) => {
        console.error('Erreur chargement demandes d’amis :', err);
        this.errorMessage = 'Impossible de charger les demandes.';
      }
    });
  }

  accept(friendId: number): void {
    this.friendService.acceptRequest(friendId).subscribe({
      next: () => {
        this.pendingRequests = this.pendingRequests.filter(p => p.friendId !== friendId);
      },
      error: (err) => {
        console.error('Erreur acceptation :', err);
      }
    });
  }

  decline(friendId: number): void {
    this.friendService.declineRequest(friendId).subscribe({
      next: () => {
        this.pendingRequests = this.pendingRequests.filter(p => p.friendId !== friendId);
      },
      error: (err) => {
        console.error('Erreur refus :', err);
      }
    });
  }

}
