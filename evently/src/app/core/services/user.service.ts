import { Injectable } from '@angular/core';
import { appUser } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  currentUser: appUser | null;

  constructor() {}

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
  getUsers() {
    // ...
  }
}
