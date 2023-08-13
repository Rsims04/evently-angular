import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Observable } from 'rxjs';
// import { Auth } from '@angular/fire/auth';
import { UserService } from 'src/app/core/services/user.service';
import { AuthService } from 'src/app/core/shared/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit  {
  constructor(
    private userService: UserService,
    private auth: AuthService,
    private db: Firestore
    ){
      
    }

  user: any = {};
  userData: any = {};

  ngOnInit(): void {
      const auth1 = getAuth();
      onAuthStateChanged(auth1, (user) => {
        if (user) {
          this.user = user;
          this.getCurrentUserData();
        } else {
          // ...
        }
      });
  }

  async getCurrentUserData() {
    if (this.user !== null) {
      console.log(this.user.uid);
      const q = query(collection(this.db, 'User'), where('uid', '==', this.user.uid));
      
      const querySnapshot = await getDocs(q);
      this.userData = querySnapshot.docs[0].data();
  
      console.log(this.userData);
    } else {
      console.log("ok");
    }
  } 
}

