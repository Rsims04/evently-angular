import { Component } from '@angular/core';
import { appUser } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  user: appUser;
  faCaretDown = faCaretDown;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.user = this.userService.currentUser;
  }

  /**
   * Activates Drop Down Menu For Sorting Options
   */
  dropDownMenu() {}
}
