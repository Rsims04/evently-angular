import { Component } from '@angular/core';
import { appUser } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';
import {
  faCaretDown,
  faMagnifyingGlass,
  faCalendarPlus,
} from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { AddEventDialogComponent } from './whats-on/whats-on/add-event-dialog/add-event-dialog/add-event-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  user = {} as appUser;
  faCaretDown = faCaretDown;
  faMagnifyingGlass = faMagnifyingGlass;
  faCalendarPlus = faCalendarPlus;

  constructor(private userService: UserService, private dialog: MatDialog) {}

  ngOnInit() {
    this.user = this.userService.getUser();
    console.log('this.USER:', this.user);
  }

  /**
   * Activates Drop Down Menu For Sorting Options
   */
  dropDownMenu() {}

  /**
   * Opens modal and sends correct field information.
   */
  createEvent(): void {
    const user = this.user;
    const dialogRef = this.dialog.open(AddEventDialogComponent, {
      panelClass: 'custom-dialog-class',
      data: {
        user,
      },
    });
  }
}
