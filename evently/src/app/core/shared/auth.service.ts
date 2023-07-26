import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';

import { Firestore, addDoc } from '@angular/fire/firestore';

import { Router } from '@angular/router';
import { collection } from '@angular/fire/firestore';
import { last } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private fireauth: Auth,
    private router: Router,
    private db: Firestore
  ) {}

  // Login Method
  login(email: string, password: string) {
    console.log(email, password);
    signInWithEmailAndPassword(this.fireauth, email, password).then(
      () => {
        localStorage.setItem('token', 'true');
        this.router.navigate(['dashboard']);
      },
      (err) => {
        alert(err.message);
        this.router.navigate(['/sign-in']);
      }
    );
  }

  // Register Method
  register(
    userName: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) {
    createUserWithEmailAndPassword(this.fireauth, email, password).then(
      () => {
        alert('Registration Successful');
        addDoc(collection(this.db, 'User'), {
          avatar: '',
          email: email,
          firstName: firstName,
          lastName: lastName,
          password: password,
          username: userName,
        });
        alert('User added to database!');
        this.router.navigate(['/sign-in']);
      },
      (err) => {
        alert(err.message);
        this.router.navigate(['/sign-in']);
      }
    );
  }

  // Sign Out
  logout() {
    signOut(this.fireauth).then(
      () => {
        localStorage.removeItem('token');
        this.router.navigate(['/sign-in']);
      },
      (err) => {
        alert(err.message);
      }
    );
  }
}
