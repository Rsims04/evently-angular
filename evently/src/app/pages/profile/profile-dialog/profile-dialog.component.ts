import { DialogModule } from '@angular/cdk/dialog';
import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { Firestore, collection, doc, getDocs, onSnapshot, query, updateDoc, where } from '@angular/fire/firestore';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { getAuth, updateProfile } from 'firebase/auth';

@Component({
  selector: 'app-profile-dialog',
  templateUrl: './profile-dialog.component.html',
  styleUrls: ['./profile-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileDialogComponent {
  field: string = this.data.field;
  fieldName: string = this.data.fieldName;
  detail: string;


  constructor(
    public dialogRef: MatDialogRef<ProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProfileDialogData,
    private db: Firestore
  ) {}

  cancel(): void {
    this.dialogRef.close(this.data);
  }

  async changeDetail(detail: string) {
    console.log("Changing:",this.field , "to", detail);
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const q = query(collection(this.db, 'User'), where('uid', '==', user.uid));
      
      const querySnapshot = await getDocs(q);
      const docRef = querySnapshot.docs[0].ref;
      console.log("DOC REF:",docRef);
  
      await updateDoc(docRef, {
        [this.field]: detail,
      });
      console.log("Changed:",this.field , "to", detail);
      
      this.dialogRef.close(this.data);
    } else {
      console.log("Failed:",this.field , "to", detail);
    }
  }
}

export interface ProfileDialogData {
  fieldName: string;
  field: string;
}

export interface ProfileDialogResult {
  field: string,
  fieldName: string
}
