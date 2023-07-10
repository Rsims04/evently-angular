import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInRoutingModule } from './sign-in-routing.module';
import { LoginComponent } from './login/login.component';
import { CreateAccountComponent } from './createaccount/createaccount.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginComponent, CreateAccountComponent],
  imports: [CommonModule, SignInRoutingModule, FormsModule],
})
export class SignInModule {}
