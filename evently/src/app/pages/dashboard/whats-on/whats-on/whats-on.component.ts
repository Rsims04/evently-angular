import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { appEvent } from 'src/app/core/models/event.model';
import { EventService } from 'src/app/core/services/event.service';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { EventDialogComponent } from './event-dialog/event-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-this-week',
  templateUrl: './whats-on.component.html',
  styleUrls: ['./whats-on.component.scss'],
})
export class WhatsOnComponent {
  events$: Observable<appEvent[]> | null;
  faMapMarkerAlt = faMapMarkerAlt;

  constructor(private eventService: EventService, private dialog: MatDialog) {}

  ngOnInit() {
    this.events$ = this.eventService.getEvents();
  }

  openEvent(selectedEvent: appEvent) {
    const dialogRef = this.dialog.open(EventDialogComponent, {
      panelClass: 'event-dialog',
      width: '90vw',
      height: '90vh',
      data: selectedEvent,
    });
  }
}
