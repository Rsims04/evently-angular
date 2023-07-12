import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SettingsComponent } from './pages/settings/settings.component';

const signInModule = () =>
  import('../app/pages/sign-in/sign-in.module').then((x) => x.SignInModule);

const routes: Routes = [
  {
    path: '',
    component: SignInComponent,
    loadChildren: signInModule,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
