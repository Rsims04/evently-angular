import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { ManageUsersComponent } from './pages/manage-users/manage-users.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LoginComponent } from './pages/sign-in/login/login.component';
import { RoleGuardService as RoleGuard } from './core/services/roleguard.service';

const signInModule = () =>
  import('../app/pages/sign-in/sign-in.module').then((x) => x.SignInModule);

const userModule = () =>
  import('../app/user/user.module').then((x) => x.UserModule);

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'sign-in',
  },
  {
    path: 'sign-in',
    component: SignInComponent,
    loadChildren: signInModule,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
  {
    path: 'admin',
    component: ManageUsersComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'admin',
    },
  },
  {
    path: 'edit-profile',
    component: ProfileComponent,
  },

  {
    path: 'users',
    loadChildren: userModule,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
