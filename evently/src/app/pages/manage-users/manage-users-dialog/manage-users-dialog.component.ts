import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/shared/auth.service';

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

  form!: FormGroup;
  submitted = false;
  loading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ManageUsersDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ManageUsersDialogData,
    private formBuilder: FormBuilder,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      displayName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      role: ['user'],
      password: ['', Validators.required],
    });
  }

  // Getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

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
   * Registers and adds a new user
   */
  addUser() {
    this.submitted = true;
    this.loading = true;

    console.log('role: ', this.f['role'].value);

    if (this.form.invalid) {
      this.loading = false;
      console.log('INVALID');
      return;
    }

    this.auth
      .register({
        displayName: this.f['displayName'].value,
        email: this.f['email'].value,
        password: this.f['password'].value,
        firstName: this.f['firstName'].value,
        lastName: this.f['lastName'].value,
        role: this.f['role'].value,
      })
      .then(
        (res) => {
          console.log(res);
          alert('Account Created.');
          this.loading = false;
          this.cancel();
        },
        (err) => {
          console.log(err);
          this.loading = false;
          alert('Something went wrong...' + this.f['displayName'].value);
        }
      );
  }

  /**
   * Deletes User from firestore and auth
   */
  deleteUser() {
    console.log(this.userName, this.uid);
    this.auth.deleteUser(this.uid);
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
