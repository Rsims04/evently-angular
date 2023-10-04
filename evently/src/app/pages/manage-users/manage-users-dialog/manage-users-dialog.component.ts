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
  selector: 'app-manage-users-dialog',
  templateUrl: './manage-users-dialog.component.html',
  styleUrls: ['./manage-users-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ManageUsersDialogComponent {
  field: string = this.data.field;
  fieldName: string = this.data.fieldName;
  detail: string;
  loading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ManageUsersDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ManageUsersDialogData,
    private db: Firestore
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
    this.loading = true;

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
            this.loading = false;
            console.log('Error changing email: ', error.message);
          });
      }

      const q = query(
        collection(this.db, 'User'),
        where('uid', '==', user.uid)
      );

      const querySnapshot = await getDocs(q);
      const docRef = querySnapshot.docs[0].ref;
      console.log('DOC REF:', docRef);

      await updateDoc(docRef, {
        [this.field]: detail,
      });
      this.loading = false;
      console.log('Changed:', this.field, 'to', detail);

      this.dialogRef.close(this.data);
    } else {
      this.loading = false;
      console.log('Failed:', this.field, 'to', detail);
    }
  }
}

export interface ManageUsersDialogData {
  fieldName: string;
  field: string;
}

export interface ManageUsersDialogResult {
  field: string;
  fieldName: string;
}
