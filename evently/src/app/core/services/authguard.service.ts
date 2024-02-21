import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthguardService {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot) {
    console.log('roleguard returning:', this.isAuthenticated());
    return this.isAuthenticated();
  }

  isAuthenticated(): boolean {
    if (this.auth.isAuthenticated) {
      console.log('AUTH:', this.auth.isAuthenticated);
      return true;
    } else {
      this.router.navigate(['/sign-in']);
      return false;
    }
  }
}
