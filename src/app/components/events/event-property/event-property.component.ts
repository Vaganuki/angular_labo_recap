import { Component, OnInit, inject } from '@angular/core';
import { EventService } from '../../../services/event.service';
import { EventData } from '../../../interfaces/event.interface';
import { ActivatedRoute, Router } from '@angular/router';
import {DatePipe, NgClass, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-event-property',
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    DatePipe,
    NgForOf
  ],
  templateUrl: './event-property.component.html',
  styleUrl: './event-property.component.scss',
})
export class EventPropertyComponent implements OnInit {

  event?: EventData & { user?: any };
  from: string | null = null;
  participants: { id: number; pseudo: string }[] = [];

  private eventService = inject(EventService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('id');
    this.from = history.state?.from || null;

    if (eventId) {
      this.eventService.getEventById(eventId).subscribe({
        next: (event) => {
          this.event = event;
          this.loadParticipants(+eventId);
        },
        error: (err) => console.error('Erreur récupération événement:', err)
      });
    } else {
      console.error('Aucun ID d\'événement trouvé dans l\'URL');
    }
  }

  loadParticipants(eventId: number): void {
    this.eventService.getEventParticipationsWithUsers(eventId).subscribe({
      next: (participations) => {
        this.participants = participations.map((p: any) => ({
          id: p.user.id,
          pseudo: p.user.pseudo
        }));
      },
      error: (err) => console.error('Erreur chargement participants:', err)
    });
  }

  navigation(): void {
    switch (this.from) {
      case 'events':
        void this.router.navigate(['/events']);
        break;
      case 'event-user':
        void this.router.navigate(['/event-user']);
        break;
      default:
        void this.router.navigate(['/']);
    }
  }

  protected readonly navigator = navigator;
}
