import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-event-user',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    NgForOf,
    NgIf
  ],
  templateUrl: './event-user.component.html',
  styleUrl: './event-user.component.scss'
})
export class EventUserComponent implements OnInit {

  participations: any[] = [];
  userId = localStorage.getItem('userId');
  selectedEventId: string | null = null;

  private userService = inject(UserService);
  private router = inject(Router);

  ngOnInit() {
    if (!this.userId) {
      void this.router.navigate(['/login']);
      return;
    }

    this.userService.getUserParticipations(this.userId).subscribe({
      next: (data) => {
        this.participations = data.map((p: any) => ({
          ...p,
          isActive: false
        }));
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des participations:', err);
      }
    });
  }

  selectEvent(index: number): void {
    const clicked = this.participations[index];

    if (clicked.isActive) {

      this.participations = this.participations.map(p => ({...p, isActive: false}));
      this.selectedEventId = null;
    } else {

      this.participations = this.participations.map((p, i) => ({
        ...p,
        isActive: i === index
      }));
      this.selectedEventId = clicked?.event?.id ?? null;
    }
  }
}
