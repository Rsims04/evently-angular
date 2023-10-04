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
  faTrash = faTrash;
  backgroundColour = 1;
  users$: Observable<appUser[]> | null;

  constructor(private dialog: MatDialog, private userService: UserService) {
    // GET USERS
    this.users$ = from(this.userService.getUsers());
  }

  /**
   * Toggle Table Background Colour
   */
  toggleBackground() {
    switch (this.backgroundColour) {
      case 1:
        this.backgroundColour = 2;
        return '#f4ffff';
      case 2:
        this.backgroundColour = 1;
        return 'rgba(109,65,153,0.1)';
      default:
        return '#f4ffff';
    }
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
