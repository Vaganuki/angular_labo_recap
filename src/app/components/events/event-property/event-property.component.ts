import { Component, OnInit, inject } from '@angular/core';
import { EventService } from '../../../services/event.service';
import { EventData } from '../../../interfaces/event.interface';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {DatePipe, NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'app-event-property',
  standalone: true,
  imports: [
    RouterLink,
    NgClass,
    NgIf,
    DatePipe
  ],
  templateUrl: './event-property.component.html',
  styleUrl: './event-property.component.scss',
})
export class EventPropertyComponent implements OnInit {

  event?: EventData;

  private eventService = inject(EventService);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('id');
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
}
