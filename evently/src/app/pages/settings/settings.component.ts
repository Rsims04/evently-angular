import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  user: User = {} as User;
  userData: any = {};
  isAdmin: boolean = false;

  constructor(private db: Firestore) {}

  ngOnInit(): void {
    // Check if user is logged in and grab current user.
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
        this.getUserRole();
      } else {
        console.log('Error: user is null...');
      }
    });
  }

  async getUserRole() {
    if (this.user !== null) {
      console.log(this.user.uid);
      const q = query(
        collection(this.db, 'User'),
        where('uid', '==', this.user.uid)
      );
      const unsubscribe = onSnapshot(q, async (querySnapshot) => {
        await getDocs(q);
        const userData = querySnapshot.docs[0].data();
        console.log(userData['role']);
        const role = userData['role'];
        if (role == 'admin') {
          this.isAdmin = true;
        }
      });
    } else {
      console.log('Error: user is null...');
    }
  }
}
