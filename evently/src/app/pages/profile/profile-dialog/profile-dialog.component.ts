import { DialogModule } from '@angular/cdk/dialog';
import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-profile-dialog',
  templateUrl: './profile-dialog.component.html',
  styleUrls: ['./profile-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileDialogComponent {
  // private backupTask: Partial<Task> = { ...this.data.task};
  field: string = this.data.field;
  fieldName: string = this.data.fieldName;


  constructor(
    public dialogRef: MatDialogRef<ProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProfileDialogData
  ) {}

  cancel(): void {
    // this.data.task.title = this.backupTask.title;
    // this.data.task.description = this.backupTask.description;
    this.dialogRef.close(this.data);
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
