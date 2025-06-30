import {Component, Input, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Event as AppEvent} from '../../../../interfaces/event.interface';
import {OverlayRef} from '@angular/cdk/overlay';
import {EventService} from '../../../../services/event.service';
import {ModalService} from '../../../../services/popup.service';

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
  events: AppEvent[] = [];
  selectedEvents?: AppEvent;
  isFullscreen = false;

  searchValue = '';
  searchTerm = '';

  @Input() overlayRef!: OverlayRef;

  constructor(private eventService: EventService, private modalService: ModalService) {}

  ngOnInit() {
    this.eventService.getEvents().subscribe((data: AppEvent[]) => {
      this.events = data;
    });
  }

  close() {
    this.overlayRef?.dispose();
  }

  toggleFullscreen() {
    this.isFullscreen = !this.isFullscreen;
  }

  selectEvent1(event: AppEvent) {
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

  filteredEvents(): AppEvent[] {
    if (!this.searchTerm) return this.events;
    return this.events.filter(event =>
      (event.name).toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  openCreateEvent() {
    this.modalService.openCreateEventModal();
  }
}
