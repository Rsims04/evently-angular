import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { appEvent } from 'src/app/core/models/event.model';
import { EventService } from 'src/app/core/services/event.service';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-this-week',
  templateUrl: './whats-on.component.html',
  styleUrls: ['./whats-on.component.scss'],
})
export class WhatsOnComponent {
  events$: Observable<appEvent[]> | null;
  faMapMarkerAlt = faMapMarkerAlt;

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.events$ = this.eventService.getEvents();
  }
}
