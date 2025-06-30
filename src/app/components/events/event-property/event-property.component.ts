import { Component, OnInit, inject } from '@angular/core';
import { EventService } from '../../../services/event.service';
import { EventData } from '../../../interfaces/event.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-event-property',
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    DatePipe
  ],
  templateUrl: './event-property.component.html',
  styleUrl: './event-property.component.scss',
})
export class EventPropertyComponent implements OnInit {

  event?: EventData;
  from: string | null = null;

  private eventService = inject(EventService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('id');

    // Permet de rediriger vers la page précédente
    this.from = history.state?.from || null;

    if (eventId) {
      this.eventService.getEventById(eventId).subscribe({
        next: (event) => {
          this.event = event;
          console.log('Événement reçu:', event);
        },
        error: (err) => console.error('Erreur récupération événement:', err)
      });
    } else {
      console.error('Aucun ID d\'événement trouvé dans l\'URL');
    }
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
