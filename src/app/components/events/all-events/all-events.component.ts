import {Component, Input} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {OverlayRef} from '@angular/cdk/overlay';
import {EventData} from '../../../interfaces/event.interface';
import {EventService} from '../../../services/event.service';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-all-events',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    RouterOutlet,

  ],
  templateUrl: './all-events.component.html',
  styleUrl: './all-events.component.scss'
})
export class AllEventsComponent {
  events: EventData[] = [];
  selectedEvents?: EventData;
  isFullscreen = false;

  participations: any[] = [];
  selectedEventId: string | null = null;

  searchValue = '';
  searchTerm = '';

  @Input() overlayRef!: OverlayRef;

  constructor(private eventService: EventService) {
  }

  ngOnInit() {
    this.eventService.getEvents().subscribe((data: EventData[]) => {
      this.events = data;
    });
  }

  close() {
    this.overlayRef?.dispose();
  }

  toggleFullscreen() {
    this.isFullscreen = !this.isFullscreen;
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

  selectEvent(index: number): void {
    const clicked = this.participations[index];
    console.log('Clicked participation:', clicked);

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


  protected readonly event = event;

}
