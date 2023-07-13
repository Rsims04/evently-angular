import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModule } from 'src/app/user/user.module';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // apiUrl = 'https://api.github.com/users';

  apiUrl: User[] = [
    {
      username: 'john',
    },
    {
      username: 'Alice',
    },
  ];

  constructor(private http: HttpClient) {
    console.log(this.apiUrl);
  }

  getUsers() {
    // return this.http.get(`${this.apiUrl}`);
    return this.apiUrl;
  }

  getUser(username: string) {
    return this.http.get(`${this.apiUrl}/${username}`);
  }
}
