import {Component, Input} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {OverlayRef} from '@angular/cdk/overlay';
import {EventData} from '../../../interfaces/event.interface';
import {EventService} from '../../../services/event.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-all-events',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,

  ],
  templateUrl: './all-events.component.html',
  styleUrl: './all-events.component.scss'
})
export class AllEventsComponent {
  events: EventData[] = [];
  selectedEvents?: EventData;
  isFullscreen = false;

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

  showProperties() {
    if (this.selectedEvents) {
      this.modalService.openEventPropertiesModal(this.selectedEvents);
    }
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


  protected readonly event = event;

}
