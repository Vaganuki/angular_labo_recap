import {Component, Input, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Event} from '../../../../interfaces/event.interface';
import {OverlayRef} from '@angular/cdk/overlay';
import {EventService} from '../../../../services/event.service';

@Component({
  selector: 'app-allevent',
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './allevent.component.html',
  styleUrl: './allevent.component.scss'
})
export class AlleventComponent implements OnInit {
  events: Event[] = [];
  selectedEvents?: Event;
  isFullscreen = false;

  searchValue = '';
  searchTerm = '';

  @Input() overlayRef!: OverlayRef;

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.eventService.getEvents().subscribe((data: Event[]) => {
      this.events = data;
    });
  }

  close() {
    this.overlayRef?.dispose();
  }

  toggleFullscreen() {
    this.isFullscreen = !this.isFullscreen;
  }

  selectEvent1(event: Event) {
    this.selectedEvents = event;
  }

  showProperties() {
    if (this.selectedEvents) {
      console.log(this.selectedEvents);
    }
  }

  SearchInput() {
    this.searchTerm = this.searchValue;
  }

  filteredEvents(): Event[] {
    if (!this.searchTerm) return this.events;
    return this.events.filter(event =>
      (event.name).toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }



  protected readonly event = event;
}
