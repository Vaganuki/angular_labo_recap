import {Component, OnInit, inject, Input} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayRef } from '@angular/cdk/overlay';
import { RouterLink, RouterOutlet } from '@angular/router';
import { EventData } from '../../../interfaces/event.interface';
import { EventService } from '../../../services/event.service';
import { ParticipationService } from '../../../services/participation.service';
import { UserService } from '../../../services/user.service';
import {SoundSystemService} from '../../../services/sound-system.service';

@Component({
  selector: 'app-all-events',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './all-events.component.html',
  styleUrl: './all-events.component.scss'
})
export class AllEventsComponent implements OnInit {
  events: EventData[] = [];
  selectedEvents?: EventData;
  isFullscreen = false;
  searchValue = '';
  searchTerm = '';
  joinedEvents = new Set<number>();
  currentUserId = localStorage.getItem('userId');
  volume = 1;

  @Input() overlayRef!: OverlayRef;

  private _soundSystem = inject(SoundSystemService);
  private eventService = inject(EventService);
  private userService = inject(UserService);
  private participationService = inject(ParticipationService);

  close(){
    this._soundSystem.playSound('recycle', this.volume);
  }


  ngOnInit() {
    this.eventService.getEvents().subscribe((data: EventData[]) => {
      this.events = data;
    });

    if (this.currentUserId) {
      this.userService.getUserParticipations(this.currentUserId).subscribe({
        next: participations => {
          participations.forEach(p => this.joinedEvents.add(p.eventId));
        }
      });
    }
  }

  selectEvent1(event: EventData) {
    this.selectedEvents = event;
  }

  SearchInput() {
    this.searchTerm = this.searchValue;
  }

  filteredEvents(): EventData[] {
    if (!this.searchTerm) return this.events;
    return this.events.filter(event =>
      (event.name).toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  participate(): void {
    if (!this.selectedEvents || !this.currentUserId) return;

    this.participationService.createParticipation({
      eventId: this.selectedEvents.id,
      userId: +this.currentUserId
    }).subscribe({
      next: () => {
        this.joinedEvents.add(this.selectedEvents!.id);
        alert('Participation enregistrée !');
      },
      error: (err) => {
        console.error('Erreur participation:', err);
        alert('Erreur lors de la participation.');
      }
    });
  }

  sharing(): void {
    if (!this.selectedEvents) return;

    const url = `${window.location.origin}/event-property/${this.selectedEvents.id}`;

    navigator.clipboard.writeText(url).then(() => {
      alert('Lien copié dans le presse-papier !');
    }).catch(err => {
      console.error('Erreur lors de la copie du lien :', err);
      alert('Impossible de copier le lien.');
    });
  }

  protected readonly event = event;
}
