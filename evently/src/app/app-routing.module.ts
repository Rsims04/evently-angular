import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { ManageUsersComponent } from './pages/manage-users/manage-users.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RoleGuardService as RoleGuard } from './core/services/roleguard.service';
import { AuthguardService as AuthGuard } from './core/services/authguard.service';

const signInModule = () =>
  import('../app/pages/sign-in/sign-in.module').then((x) => x.SignInModule);

const dashboardModule = () =>
  import('../app/pages/dashboard/dashboard.module').then(
    (x) => x.DashboardModule
  );

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
    canActivate: [AuthGuard],
    component: DashboardComponent,
    loadChildren: dashboardModule,
  },
  {
    path: 'settings',
    canActivate: [AuthGuard],
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
    canActivate: [AuthGuard],
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
