import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { User } from 'firebase/auth';
import { Observable, of } from 'rxjs';
import { appUser } from '../models/user.model';
import { UserService } from '../services/user.service';
import { getDocs, onSnapshot, query, where } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: appUser | null;

  constructor(
    private auth: Auth,
    private userService: UserService,
    private router: Router,
    private db: Firestore
  ) {
    this.getDataFromFirebase();
  }

  getDataFromFirebase() {
    this.auth.onAuthStateChanged(async (user) => {
      if (user) {
        console.log('logged in', user.uid);
        const q = query(
          collection(this.db, 'User'),
          where('uid', '==', user.uid)
        );
        const unsubscribe = onSnapshot(q, async (querySnapshot) => {
          await getDocs(q).then((doc) => {
            console.log(doc);
            this.user = doc.docs[0].data() as appUser;
            console.log('user', this.user);
            this.userService.setUser(this.user);
          });
        });
      } else {
        console.log('Error: user is null...');
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
        role: 'user',
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (err) {
      console.error('writeToDB failed: ', err);
    }
  }

  setUserData(user: any) {}

  /**
   * Log out user.
   */
  logout() {
    this.auth.signOut().then(
      () => {
        localStorage.removeItem('currentUser');
        this.router.navigate(['/sign-in']);
      },
      (err) => {
        alert(err.message);
      }
    );
  }

  /**
   * Checks users current state.
   */
  check(): User {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        // User Signed In
        console.log('User Signed In!!');
        this.user = user;
        return user;
      } else {
        // User is signed out
        console.log('User Signed out!!');
        // ...
        return null;
      }
    });
    return null;
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
};
