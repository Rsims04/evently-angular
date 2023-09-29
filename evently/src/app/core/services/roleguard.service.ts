import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { UserService } from './user.service';
import { appUser } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class RoleGuardService implements CanActivate {
  user: appUser | null;
  userData: any = {};

  constructor(private userService: UserService, private router: Router) {
    this.user = this.userService.getUser();
  }

  canActivate(route: ActivatedRouteSnapshot) {
    const expectedRole = route.data['expectedRole'];
    console.log('ex' + expectedRole);

    if (this.user['role'] === expectedRole) {
      return true;
    }
    alert('Unauthorised...');
    this.router.navigate(['/sign-in']);
    return false;
  }
}
