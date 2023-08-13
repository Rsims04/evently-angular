import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModule } from 'src/app/user/user.module';
import { User } from '../models/user.model';
import { Auth, getAuth, onAuthStateChanged } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // user = this.auth.currentUser;
  // apiUrl = 'https://api.github.com/users';

  // apiUrl: User[] = [
  //   {
  //     id: '1',
  //     username: 'John',
  //     password: '1234',
  //     firstName: 'John',
  //     lastName: 'Smith',
  //     avatar: '/link',
  //     token: 'abcd',
  //   },
  //   {
  //     id: '2',
  //     username: 'Alice',
  //     password: '1234',
  //     firstName: 'Alice',
  //     lastName: 'Dawson',
  //     avatar: '/link',
  //     token: 'abcd',
  //   },
  //   {
  //     id: '3',
  //     username: 'Bob',
  //     password: '1234',
  //     firstName: 'Bob',
  //     lastName: 'Reynolds',
  //     avatar: '/link',
  //     token: 'abcd',
  //   },
  // ];

  constructor(private http: HttpClient, private auth: Auth) {}

  getUsers() {
    // return this.http.get(`${this.apiUrl}`);
    // console.log(this.apiUrl);
    // return this.apiUrl;
  }

  getUser() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        console.log("SUCCESS");
        console.log(user.email);
        // ...
        return user.email;
      } else {
        // User is signed out
        // ...
        console.log("failure");
        return null;
      }
    });


    // console.log(this.apiUrl);
    // console.log(username);
    // // return this.http.get(`users/${username}`);
    // let g = this.apiUrl.filter((res) => res.username?.indexOf(username) !== -1);
    // console.log(g);
    // return g[0];
  }
}
