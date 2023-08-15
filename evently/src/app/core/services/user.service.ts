import { Injectable } from '@angular/core';
import { User, getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { AuthService } from '../shared/auth.service';
import {
  Firestore,
  collection,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user$: Observable<User>;

  constructor(
    private auth: AuthService,
    private db: Firestore,
  ) {}

  /**
   * Gets a list of all user.
   */
  getUsers() {
    // ...
  }

  /**
   * Gets the current user.
   */
  getCurrentUser(): User | null {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('return user: ', user.uid);
        return user;
      } else {
        // ...
        return null;
      }
    });
    return null;
  }

  /**
   * Gets current users data from database.
   */
  async getCurrentUserData() {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log(user.uid);
        const q = query(
          collection(this.db, 'User'),
          where('uid', '==', user.uid),
        );

        const querySnapshot = await getDocs(q);
        console.log('return data: ', querySnapshot.docs[0].data());
        return querySnapshot.docs[0].data();
      } else {
        console.log('User Data null...');
        return null;
      }
    });
    return null;
  }
}
