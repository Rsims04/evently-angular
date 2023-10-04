import { Component } from '@angular/core';
import { ManageUsersDialogComponent } from './manage-users-dialog/manage-users-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { appUser } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';
import { Observable, from } from 'rxjs';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss'],
})
export class ManageUsersComponent {
  users$: Observable<appUser[]> | null;
  selectedUser: String | null;
  faTrash = faTrash;

  constructor(private dialog: MatDialog, private userService: UserService) {
    this.users$ = from(this.userService.getUsers());
  }

  /**
   * Opens modal and sends correct field information.
   */
  openModal(field: string): void {
    const dialogRef = this.dialog.open(ManageUsersDialogComponent, {
      panelClass: 'custom-dialog-class',
      data: {
        field,
      },
    });
    this.users$.forEach((data) => console.log(data));
  }
}
function ngAfterContentChecked() {
  throw new Error('Function not implemented.');
}
