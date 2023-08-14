import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, doc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { ProfileDialogComponent, ProfileDialogResult } from './profile-dialog/profile-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit  {
  constructor(
    private db: Firestore,
    private dialog: MatDialog
    ){}

  user: User = {} as User;
  userData: any = {};

  ngOnInit(): void {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
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
          
          const unsubscribe = onSnapshot(q, async (querySnapshot) => {
            await getDocs(q);
            this.userData = querySnapshot.docs[0].data();
          });
          // ...
        
  
      console.log(this.userData);
    } else {
      console.log("ok");
    }
  } 

  editDetail(field: string, fieldName: string): void {
    const dialogRef = this.dialog.open(ProfileDialogComponent, {
      panelClass: 'custom-dialog-class',
      data: {
        field,
        fieldName
      },
    });
    // DB stuff
    // ...
    // dialogRef.afterClosed().subscribe((result: TaskDialogResult|undefined) => {
    //   if (!result) {
    //     return;
    //   }
    //   if (result.delete) {
    //     // this.store.collection(list).doc(task.id).delete();
    //   } else {
    //     this.store.collection(list).doc(task.id).update(task);
    //   }
    // });
  }
}

