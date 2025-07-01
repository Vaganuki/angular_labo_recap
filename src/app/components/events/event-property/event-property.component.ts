import { Component, OnInit, inject } from '@angular/core';
import { EventService } from '../../../services/event.service';
import { EventData } from '../../../interfaces/event.interface';
import { ActivatedRoute, Router } from '@angular/router';
import {DatePipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {ParticipationService} from '../../../services/participation.service';
import {SoundSystemService} from '../../../services/sound-system.service';

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

  joinedEvents = new Set<number>();
  currentUserId = localStorage.getItem('userId');

  event?: EventData & { user?: any };
  from: string | null = null;
  participants: { id: number; pseudo: string }[] = [];
  volume = 1;

  private eventService = inject(EventService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private participationService = inject(ParticipationService);
  private _soundSystem = inject(SoundSystemService);

  close(){
    this._soundSystem.playSound('recycle', this.volume);
  }

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

        if (this.currentUserId && participations.some((p: any) => p.user.id === +this.currentUserId!)) {
          this.joinedEvents.add(eventId);
        }
      },
      error: (err) => console.error('Erreur chargement participants:', err)
    });
  }

  participate(): void {
    const eventIdStr = this.route.snapshot.paramMap.get('id');
    if (!this.currentUserId || !eventIdStr) return;

    const eventId = +eventIdStr;

    this.participationService.createParticipation({
      eventId: eventId,
      userId: +this.currentUserId
    }).subscribe({
      next: () => {
        this.joinedEvents.add(eventId);
        alert('Participation enregistrée !');
        this.loadParticipants(eventId);
      },
      error: (err) => {
        console.error('Erreur participation:', err);
        alert('Erreur lors de la participation.');
      }
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
