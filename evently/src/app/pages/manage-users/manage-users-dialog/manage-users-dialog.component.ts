import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-manage-users-dialog',
  templateUrl: './manage-users-dialog.component.html',
  styleUrls: ['./manage-users-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ManageUsersDialogComponent {
  field: String = this.data.field;
  userName: String = this.data.userName;
  uid: String = this.data.uid;
  fieldName: String = this.data.fieldName;
  detail: String;
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
  async changeDetail(detail: String) {}

  /**
   * Deletes User from firestore and auth
   */
  deleteUser() {
    console.log(this.userName, this.uid);
  }
}

export interface ManageUsersDialogData {
  fieldName: String;
  field: String;
  userName?: String;
  uid?: String;
}

export interface ManageUsersDialogResult {
  field: String;
  fieldName: String;
}
