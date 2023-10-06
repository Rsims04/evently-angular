import { Component, OnInit } from '@angular/core';
import { ManageUsersDialogComponent } from './manage-users-dialog/manage-users-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { appUser } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';
import { BehaviorSubject, Observable, Subject, from, takeWhile } from 'rxjs';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss'],
})
export class ManageUsersComponent implements OnInit {
  users$: Observable<appUser[]> | null;
  selectedRole: String | null;
  faTrash = faTrash;

  constructor(private dialog: MatDialog, private userService: UserService) {}

  async ngOnInit(): Promise<void> {
    this.users$ = await this.userService.getUsers();
    this.users$.subscribe((data) => {
      console.log(data);
    });
  }

  /**
   * Opens modal and sends correct field information.
   */
  openModal(field: String, userName?: String, uid?: String): void {
    const dialogRef = this.dialog.open(ManageUsersDialogComponent, {
      panelClass: 'custom-dialog-class',
      data: {
        field,
        userName,
        uid,
      },
    });
    this.users$.forEach((data) => console.log(data));
  }

  onSelected(value: string): void {
    this.selectedRole = value;
  }

  /**
   * Changes a users role.
   */
  changeRole(role: String, uid: String) {
    if (this.selectedRole == null) {
      return;
    } else {
      console.log('Changing --> ', uid, 'to --> ', role);
      this.userService.changeRole(role, uid);
      this.selectedRole = null;
    }
  }
}
