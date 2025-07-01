import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf, NgForOf } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { RegisterData } from '../../../interfaces/register.interface';
import { FriendData } from '../../../interfaces/friend.interface';
import {SoundSystemService} from '../../../services/sound-system.service';

@Component({
  selector: 'app-all-friends',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    NgForOf
  ],
  templateUrl: './all-friends.component.html',
  styleUrl: './all-friends.component.scss'
})
export class AllFriendsComponent implements OnInit {
  currentUserId = localStorage.getItem('userId');
  friends: RegisterData[] = [];
  volume = 1;

  private userService = inject(UserService);
  private _soundSystem = inject(SoundSystemService);

  close(){
    this._soundSystem.playSound('recycle', this.volume);
  }
  ngOnInit(): void {
    if (!this.currentUserId) return;

    this.userService.getUserFriendsByStatus(this.currentUserId, true).subscribe({
      next: (relations: FriendData[]) => {
        const friendIds = relations.map(rel =>
          rel.senderId === +this.currentUserId! ? rel.receiverId : rel.senderId
        );

        // Récupérer les infos complètes pour chaque ami
        friendIds.forEach(id => {
          this.userService.getUserById(id).subscribe({
            next: (user) => this.friends.push(user),
            error: (err) => console.error('Erreur chargement ami:', err)
          });
        });
      },
      error: (err) => console.error('Erreur récupération amis:', err)
    });
  }
}
