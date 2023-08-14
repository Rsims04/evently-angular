import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { appUser } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user-single',
  templateUrl: './user-single.component.html',
  styleUrls: ['./user-single.component.scss'],
})
export class UserSingleComponent implements OnInit {
  user!: appUser | null;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Grab the username out of the url
    // this.route.params.subscribe((params) => {
    //   const username = params['username'];
    //   // Use the userservice to get data from github api
    //   this.userService.getUser(username);
    //   // .subscribe((user) => (this.user = user));
    //   this.user = this.userService.getUser(username);
    // });
  }
}
