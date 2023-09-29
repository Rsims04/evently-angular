import { Injectable } from '@angular/core';
import { appUser } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  currentUser: appUser | null;

  constructor() {}

  setUser(user: appUser) {
    this.currentUser = user;
    console.log('us: set user: ', this.currentUser);
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  /**
   * Gets a list of all users.
   */
  getUsers() {
    // ...
  }
}
