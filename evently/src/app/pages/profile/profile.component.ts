import { Component, OnInit } from '@angular/core';
// import { Auth } from '@angular/fire/auth';
import { UserService } from 'src/app/core/services/user.service';
import { AuthService } from 'src/app/core/shared/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit  {
  constructor(
    private userService: UserService,
    private auth: AuthService,
    ){}

  user: any;
  userData: any;

  ngOnInit(): void {
      this.user = this.auth.getUser();
      this.userData = this.auth.getUserData();
  }

  getEmail() {
    
  }  
}

