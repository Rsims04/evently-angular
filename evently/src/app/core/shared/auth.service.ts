import { Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Observable, from, last } from 'rxjs';
import { User, UserInfo, onAuthStateChanged } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;

  constructor(
    private auth: Auth,
    private router: Router,
    private db: Firestore
  ) {
    
  }

  getUser() {
    return this.auth.currentUser;
  }

  async getUserData() {
    console.log("GET USER DATA...");
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(user.email,user.uid);
      } else {
        // ...
      }
    })
  }

  // Login Method
  login(params: Login) {
    signInWithEmailAndPassword(this.auth, params.email, params.password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user.email);
        // ...
        
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  // Register Method
  register(
    params: Register
  ) {
    createUserWithEmailAndPassword(this.auth, params.email, params.password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        
        this.writeToDB(params, user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }

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

  // Sign Out
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

  check() {
    this.auth.onAuthStateChanged((user) => {
        if (user) {
            // User Signed In
            console.log("User Signed In!!");
            return user;
        } else {
            // User is signed out
            console.log("User Signed out!!");
            // ...
            return null;
        }
    });
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

