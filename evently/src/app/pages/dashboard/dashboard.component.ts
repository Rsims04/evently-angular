import { Component } from '@angular/core';
import { appUser } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  user: appUser;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.user = this.userService.currentUser;
  }
}
