import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { appUser } from 'src/app/core/models/user.model';
import { EventService } from 'src/app/core/services/event.service';
import { UserService } from 'src/app/core/services/user.service';
import { NativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-add-event-dialog',
  templateUrl: './add-event-dialog.component.html',
  styleUrls: ['./add-event-dialog.component.scss'],
})
export class AddEventDialogComponent {
  pageName: string = 'event';
  user: appUser = this.data.user;
  detail: string;

  form!: FormGroup;
  photoURL: string;
  submitted = false;
  loading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AddEventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddEventData,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private eventService: EventService
  ) {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      start: [Date, Validators.required],
      end: [Date, Validators.required],
      genre: ['', Validators.required],
      location: ['', Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }

  /**
   * Closes modal.
   */
  cancel(): void {
    this.dialogRef.close(this.data);
  }

  // /**
  //  * Changes user details on auth and database.
  //  * To user input.
  //  *
  //  * TODO: validate email and check username (duplicates).
  //  */
  async createEvent() {
    this.loading = true;

    console.log(this.f['title'].value, this.photoURL);

    await this.eventService
      .addEvent(
        {
          title: this.f['title'].value,
          description: this.f['description'].value,
          startDate: this.f['start'].value,
          endDate: this.f['end'].value,
          genre: this.f['genre'].value,
          location: this.f['location'].value,
          photoURL: this.photoURL,
        },
        this.data.user
      )
      .then((res) => {
        console.log('Added Event:');
        this.dialogRef.close(this.data);
      })
      .catch((error) => {
        console.log('Error Creating Event: ', error.message);
      });
  }

  imageUploadStatus(value: string) {
    console.log('VALUE:', value);
    if (value !== null) {
      this.photoURL = value;
      console.log('PHOTO URL', this.photoURL);
    } else {
      console.log('ERROR: image upload failed - ', value);
    }
  }
}

export interface AddEventData {
  user: appUser;
}

export interface AddEventResult {
  field: string;
  fieldName: string;
}
