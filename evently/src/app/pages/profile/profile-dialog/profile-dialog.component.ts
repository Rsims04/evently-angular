import { Component, Inject, ViewEncapsulation } from '@angular/core';
import {
  Firestore,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { getAuth, updateEmail, updateProfile } from 'firebase/auth';

@Component({
  selector: 'app-profile-dialog',
  templateUrl: './profile-dialog.component.html',
  styleUrls: ['./profile-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProfileDialogComponent {
  field: string = this.data.field;
  fieldName: string = this.data.fieldName;
  detail: string;

  constructor(
    public dialogRef: MatDialogRef<ProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProfileDialogData,
    private db: Firestore,
  ) {}

  /**
   * Closes modal.
   */
  cancel(): void {
    this.dialogRef.close(this.data);
  }

  /**
   * Changes user details on auth and database.
   * To user input.
   *
   * TODO: validate email and check username (duplicates).
   */
  async changeDetail(detail: string) {
    console.log('Changing:', this.field, 'to', detail);
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      if (this.field === 'email') {
        const auth = getAuth();
        updateEmail(user, detail)
          .then(() => {
            // Email updated!
            console.log('email updated to:', detail);
          })
          .catch((error) => {
            // An error occurred
            console.log('Error changing email: ', error.message);
          });
      }

      const q = query(
        collection(this.db, 'User'),
        where('uid', '==', user.uid),
      );

      const querySnapshot = await getDocs(q);
      const docRef = querySnapshot.docs[0].ref;
      console.log('DOC REF:', docRef);

      await updateDoc(docRef, {
        [this.field]: detail,
      });
      console.log('Changed:', this.field, 'to', detail);

      this.dialogRef.close(this.data);
    } else {
      console.log('Failed:', this.field, 'to', detail);
    }
  }
}

export interface ProfileDialogData {
  fieldName: string;
  field: string;
}

export interface ProfileDialogResult {
  field: string;
  fieldName: string;
}
