import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { appEvent } from '../models/event.model';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  events$: Observable<appEvent[]>;
  constructor(private db: Firestore) {
    const data = collection(db, 'Event');
    this.events$ = collectionData(data);
  }

  /**
   * Gets a list of all events.
   */
  getEvents() {
    return this.events$;
  }
}
