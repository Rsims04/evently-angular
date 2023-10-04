import { Injectable } from '@angular/core';
import { appUser } from '../models/user.model';
import { Firestore } from '@angular/fire/firestore';
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
} from 'firebase/firestore';
import { Observable, of, tap } from 'rxjs';

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
  async getUsers() {
    // const querySnapshot = await getDocs(collection(this.db, 'User'));
    // querySnapshot.forEach((doc) => {
    //   console.log(doc.id, ' => ', doc.data());
    //   // this.users$.push(doc.data() as appUser);
    // });
    // console.log(this.users$);
    // return this.users$;

    const userList = [];
    const q = query(collection(this.db, 'User'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log('USER =>', doc.data());
        userList.push(doc.data());
      });
    });
    return userList;
  }
}
