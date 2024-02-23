import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { appEvent } from '../models/event.model';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { addDoc } from 'firebase/firestore';
import { appUser } from '../models/user.model';
import { v4 as uuid } from 'uuid';

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

  addEvent(params: Fields, user: appUser): Promise<Observable<any>> {
    return new Promise<any>((resolve, reject) => {
      // Format Date

      // Get Day of Week
      console.log('PARAMS: ', params);

      this.writeToDB(params, user);
    });
  }

  /**
   * Writes event data to database.
   */
  async writeToDB(params: Fields, user: appUser) {
    const uid = uuid();
    console.log(uid);
    try {
      const docRef = await addDoc(collection(this.db, 'Event'), {
        uid: uid,
        title: params.title,
        description: params.description,
        startDate: params.startDate,
        endDate: params.endDate,
        dayOfTheWeek: 'Monday',
        genre: params.genre,
        author: user.displayName,
        photoURL: params.photoURL,
        location: params.location,
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (err) {
      console.error('writeToDB failed: ', err);
    }
  }
}

type Fields = {
  uid?: string;
  title?: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  dayOfTheWeek?: String;
  genre?: string;
  author?: String;
  photoURL?: string;
  location?: string;
};
