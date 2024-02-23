import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { appUser } from 'src/app/core/models/user.model';
import { EventService } from 'src/app/core/services/event.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-add-event-dialog',
  templateUrl: './add-event-dialog.component.html',
  styleUrls: ['./add-event-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddEventDialogComponent {
  pageName: string = 'event';
  user: appUser = this.data.user;
  detail: string;

  form!: FormGroup;
  photoURL: string;
  submitted = false;
  loading: boolean = false;

  startDate: string;
  endDate: string;
  dayOfWeek: string;

  constructor(
    public dialogRef: MatDialogRef<AddEventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddEventData,
    private formBuilder: FormBuilder,
    private eventService: EventService
  ) {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
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

  /**
   * Adds Event to Database
   */
  async createEvent() {
    this.loading = true;
    this.submitted = true;

    if (this.form.invalid) {
      this.loading = false;
      return;
    }

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
        console.log('Added Event:', res);
        this.loading = false;
        this.submitted = false;
        this.dialogRef.close(this.data);
      })
      .catch((error) => {
        this.loading = false;
        this.submitted = false;
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
