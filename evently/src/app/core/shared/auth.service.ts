import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private fireauth: Auth, private router: Router) {}

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
  register(email: string, password: string) {
    createUserWithEmailAndPassword(this.fireauth, email, password).then(
      () => {
        alert('Registration Successful');
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
