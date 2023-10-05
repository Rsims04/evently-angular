import { Injectable } from '@angular/core';
import { appUser } from '../models/user.model';
import { Firestore } from '@angular/fire/firestore';
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  currentUser: appUser | null;
  users$: Observable<appUser[]> | null;

  constructor(private db: Firestore) {}

  /**
   * Set the current user in local storage for easy access.
   */
  setUser(user: appUser) {
    this.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  /**
   * Get the current user from local storage.
   */
  getUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  /**
   * Gets a list of all users.
   */
  getUsers(): Observable<appUser[]> {
    let userList = [];
    console.log('get users...');
    const q = query(collection(this.db, 'User'));
    return new Observable((observer) => {
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        userList = [];
        querySnapshot.forEach((doc) => {
          userList.push(doc.data());
        });
        observer.next(userList);
      });
      return () => {
        unsubscribe();
      };
    });
  }

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
}
