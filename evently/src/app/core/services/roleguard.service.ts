import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { UserService } from './user.service';
import { appUser } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class RoleGuardService {
  user: appUser | null;

  constructor(private userService: UserService, private router: Router) {
    this.user = this.userService.getUser();
  }

  /**
   * Checks whether user is authorised to view page.
   * If not redirects to sign-in page.
   */
  canActivate(route: ActivatedRouteSnapshot) {
    if (this.user != null) {
      const expectedRole = route.data['expectedRole'];

      if (this.user['role'] === expectedRole) {
        return true;
      }
    }
    alert('Unauthorised...');
    this.router.navigate(['/sign-in']);
    return false;
  }
}
