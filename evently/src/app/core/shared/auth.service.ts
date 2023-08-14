import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { User, browserSessionPersistence, setPersistence } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;
  loggedIn: boolean;

  constructor(
    private auth: Auth,
    private router: Router,
    private db: Firestore
  ) {
    
  }

  /**
   * Gets the current user.
   */
  getUser() {
    return this.auth.currentUser;
  }

  async getUserData() {
    
  }

  /**
   * Autheniticate user.
   * On success: navigate to dashboard.
   * On failure: catch error, do nothing.
   */
  login(params: Login) {
    setPersistence(this.auth, browserSessionPersistence);
    signInWithEmailAndPassword(this.auth, params.email, params.password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user.email, user.uid);
        
        this.router.navigate(['/dashboard']);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  /**
   * Registers user in auth and database.
   * On success: navigate to login page.
   * On failure: catch error, do nothing.
   */
  register(
    params: Register
  ) {
    createUserWithEmailAndPassword(this.auth, params.email, params.password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        
        this.writeToDB(params, user);

        this.router.navigate(['/sign-in']);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }

  /**
   * Writes user data to database.
   */
  async writeToDB(params: Register, user: User) {
    try {
      const docRef = await addDoc(collection(this.db, "User"), {
        uid: user.uid,
        email: params.email,
        displayName: params.displayName,
        photoURL: '../../../assets/placeholder.png',
        firstName: params.firstName,
        lastName: params.lastName,
      });
      console.log("Document written with ID: ", docRef.id);

    } catch(err) {
      console.error("writeToDB failed: ", err);
    }
  }

  setUserData(user: any) {
    
  }

  /**
   * Log out user.
   */
  logout() {
    this.auth.signOut().then(
      () => {
        localStorage.removeItem('token');
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
  check(): boolean {
    this.auth.onAuthStateChanged((user) => {
        if (user) {
            // User Signed In
            console.log("User Signed In!!");
            return true;
        } else {
            // User is signed out
            console.log("User Signed out!!");
            // ...
            return false;
        }
    });
    return false;
  }
}

type Login = {
  email: string,
  password: string 
}

type Register = {
  displayName: string,
  email: string,
  password: string,
  firstName: string,
  lastName: string
}

