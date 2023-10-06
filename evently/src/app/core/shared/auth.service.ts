import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import {
  Firestore,
  addDoc,
  collection,
  deleteDoc,
  doc,
} from '@angular/fire/firestore';
import { User, getAuth } from 'firebase/auth';
import { Observable, of } from 'rxjs';
import { appUser } from '../models/user.model';
import { UserService } from '../services/user.service';
import { getDocs, onSnapshot, query, where } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: appUser | null;
  isAuthenticated: boolean = false;

  constructor(
    private auth: Auth,
    private userService: UserService,
    private router: Router,
    private db: Firestore
  ) {
    this.getDataFromFirebase();
  }

  /**
   * Authenticates and gets the current users data from Firebase.
   * Also adds it to localstorage.
   */
  getDataFromFirebase() {
    this.auth.onAuthStateChanged(async (user) => {
      if (user) {
        console.log('logged in', user.uid);
        try {
          const q = query(
            collection(this.db, 'User'),
            where('uid', '==', user.uid)
          );
          const unsubscribe = onSnapshot(q, async (querySnapshot) => {
            await getDocs(q).then((doc) => {
              try {
                this.user = doc.docs[0].data() as appUser;
                console.log('user found:', this.user);
                this.userService.setUser(this.user);
              } catch (e) {
                console.log('user not found...');
                this.logout();
              }
            });
          });
        } catch (e) {
          console.log('User is null...');
        }
      } else {
        console.log('User is null...');
      }
    });
  }

  /**
   * Autheniticate user.
   * On success: navigate to dashboard.
   * On failure: catch error, do nothing.
   */
  login(params: Login): Promise<Observable<any>> {
    return new Promise<any>((resolve, reject) => {
      signInWithEmailAndPassword(this.auth, params.email, params.password).then(
        (res) => {
          this.isAuthenticated = true;
          resolve(res);
        },
        (err) => {
          console.log(err);
          reject(err);
        }
      );
    });
  }

  /**
   * Registers user in auth and database.
   * On success: navigate to login page.
   * On failure: catch error, do nothing.
   */
  register(params: Register): Promise<Observable<any>> {
    return new Promise<any>((resolve, reject) => {
      createUserWithEmailAndPassword(
        this.auth,
        params.email,
        params.password
      ).then(
        (res) => {
          const user = res.user;
          this.writeToDB(params, user);
          resolve(res);
        },
        (err) => {
          console.log(err);
          reject(err);
        }
      );
    });
  }

  /**
   * Writes user data to database.
   */
  async writeToDB(params: Register, user: User) {
    try {
      const docRef = await addDoc(collection(this.db, 'User'), {
        uid: user.uid,
        email: params.email,
        displayName: params.displayName,
        photoURL: '../../../assets/placeholder.png',
        firstName: params.firstName,
        lastName: params.lastName,
        role: params.role,
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (err) {
      console.error('writeToDB failed: ', err);
    }
  }

  /**
   * NOTE: Possibly move user profile changes to here or User Service.
   * Instead of in user profile.
   */
  setUserData(user: any) {}

  /**
   * Deletes a user
   */
  async deleteUser(uid) {
    // Delete from database
    try {
      const q = query(collection(this.db, 'User'), where('uid', '==', uid));

      const querySnapshot = await getDocs(q);
      const docRef = querySnapshot.docs[0].ref;
      console.log('DOC REF:', docRef);

      await deleteDoc(docRef);

      console.log('Deleted', uid);
    } catch (e) {
      console.log('Failed to delete:', uid);
    }

    // Can't delete from Firebase Auth
  }

  /**
   * Log out user.
   */
  logout() {
    this.auth.signOut().then(
      () => {
        localStorage.removeItem('currentUser');
        this.isAuthenticated = false;
        this.router.navigate(['/sign-in']);
      },
      (err) => {
        alert(err.message);
      }
    );
  }
}

type Login = {
  email: string;
  password: string;
};

type Register = {
  displayName: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
};
