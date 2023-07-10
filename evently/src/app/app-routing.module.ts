import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/sign-in/login/login.component';
import { CreateAccountComponent } from './pages/sign-in/createaccount/createaccount.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';

const signInModule = () =>
  import('../app/pages/sign-in/sign-in.module').then((x) => x.SignInModule);

const routes: Routes = [
  {
    path: '',
    loadChildren: signInModule,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
