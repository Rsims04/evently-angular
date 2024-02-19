import { Injectable } from '@angular/core';
import { appUser } from '../models/user.model';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import {
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  currentUser: appUser | null;
  users$: Observable<appUser[]> | null;
  user$: Observable<appUser> | null;

  constructor(private db: Firestore) {
    const data = collection(db, 'User');
    this.users$ = collectionData(data);
  }

  /**
   * Gets a list of all events.
   */
  getUsers() {
    return this.users$.pipe(
      map((users) =>
        users.sort((a, b) => a.displayName.localeCompare(b.displayName))
      )
    );
  }

  /**
   * Set the current user in local storage for easy access.
   */
  setUser(user: appUser) {
    this.currentUser = user;
    console.log(
      'USER SERVICE to Local Storage:SET currentUser to:',
      JSON.stringify(this.currentUser)
    );
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  /**
   * Get the current user from local storage.
   */
  getUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  /**
   * Gets the current users information.
   */
  async getCurrentUserData() {
    let user = this.getUser();
    console.log('USER ~~~ In get current user data:', user);
    if (user !== null) {
      const q = query(
        collection(this.db, 'User'),
        where('uid', '==', user.uid)
      );
      return new Observable((observer) => {
        const unsubscribe = onSnapshot(q, async (querySnapshot) => {
          await getDocs(q);
          let userData = querySnapshot.docs[0].data();
          observer.next(userData);
        });
        return () => {
          unsubscribe();
        };
      });
    } else {
      console.log('GET CURRENT USER DATA~Error: user is null...');
      return null;
    }
  }

  /**
   * Changes the role of a user.
   */
  async changeRole(detail: String, uid: String) {
    try {
      const q = query(collection(this.db, 'User'), where('uid', '==', uid));

      const querySnapshot = await getDocs(q);
      const docRef = querySnapshot.docs[0].ref;
      console.log('DOC REF:', docRef);

      await updateDoc(docRef, {
        ['role']: detail,
      });

      console.log('Changed:', 'role', 'to', detail);
    } catch (e) {
      console.log('Failed:', 'role', 'to', detail);
    }
  }

  async changeDetail(field: string, detail: string) {
    if (this.currentUser) {
      const q = query(
        collection(this.db, 'User'),
        where('uid', '==', this.currentUser.uid)
      );

      const querySnapshot = await getDocs(q);
      const docRef = querySnapshot.docs[0].ref;
      console.log('DOC REF:', docRef);

      await updateDoc(docRef, {
        [field]: detail,
      });
    }
  }
}
