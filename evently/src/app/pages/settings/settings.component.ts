import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  user: User = {} as User;
  userData: any = {};
  isAdmin: boolean = false;

  constructor(private db: Firestore, private userService: UserService) {}

  ngOnInit(): void {
    // Check if user is logged in and grab current user.
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.user = user;
        let subscribe = (await this.userService.getCurrentUserData()).subscribe(
          (data) => {
            this.userData = data;
            if (this.userData['role'] === 'admin') {
              this.isAdmin = true;
            }
            console.log(this.userData);
          }
        );
      } else {
        console.log('Error: user is null...');
      }
    });
  }
}
