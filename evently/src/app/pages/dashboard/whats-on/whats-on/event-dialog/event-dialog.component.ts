import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { appEvent } from 'src/app/core/models/event.model';
import { EventService } from 'src/app/core/services/event.service';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-event-dialog',
  templateUrl: './event-dialog.component.html',
  styleUrls: ['./event-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EventDialogComponent {
  faMapMarkerAlt = faMapMarkerAlt;
  constructor(
    public dialogRef: MatDialogRef<EventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: appEvent,
    private eventService: EventService
  ) {
    console.log(data);
  }
}
