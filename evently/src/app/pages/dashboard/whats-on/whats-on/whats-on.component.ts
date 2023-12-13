import { Component } from '@angular/core';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { appEvent } from 'src/app/core/models/event.model';
import { EventService } from 'src/app/core/services/event.service';

@Component({
  selector: 'app-this-week',
  templateUrl: './whats-on.component.html',
  styleUrls: ['./whats-on.component.scss'],
})
export class WhatsOnComponent {
  events$: Observable<appEvent[]> | null;

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.events$ = this.eventService.getEvents();
  }
}
