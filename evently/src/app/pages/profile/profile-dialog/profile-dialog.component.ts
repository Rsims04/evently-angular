import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { UserService } from 'src/app/core/services/user.service';
import { AuthService } from 'src/app/core/shared/auth.service';

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
  loading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProfileDialogData,
    private auth: AuthService,
    private userService: UserService
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
    let valid = true;

    if (this.field === 'email') {
      // Update Authentication
      await this.auth
        .updateUserEmail(detail)
        .then((res) => {
          // Email updated!
          console.log('2.email updated to:', detail);
        })
        .catch((error) => {
          // An error occurred
          valid = false;
          console.log('2.Error changing email: ', error.message);
        });
    }

    if (valid) {
      console.log('Changing:', this.field, 'to', detail);
      // Update Database
      await this.userService
        .changeDetail(this.field, detail)
        .then(() => {
          console.log('Changed:', this.field, 'to', detail);
          this.dialogRef.close(this.data);
        })
        .catch((error) => {
          console.log('Failed:', this.field, 'to', detail);
        });
    }

    this.loading = false;
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
