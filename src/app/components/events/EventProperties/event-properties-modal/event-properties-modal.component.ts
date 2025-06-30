import {Component, Input} from '@angular/core';
import { EventData as AppEvent } from '../../../../interfaces/event.interface';
import {OverlayRef} from '@angular/cdk/overlay';

@Component({
  selector: 'app-event-properties-modal',
  imports: [],
  templateUrl: './event-properties-modal.component.html',
  styleUrl: './event-properties-modal.component.scss'
})
export class EventPropertiesModalComponent {
  @Input() event!: AppEvent;
  @Input() overlayRef!: OverlayRef;

  close() {
    this.overlayRef?.dispose();
  }
}
