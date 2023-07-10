import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/sign-in/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { CoreModule } from './core/core.module';
import { CreateAccountComponent } from './pages/sign-in/createaccount/createaccount.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SettingsComponent,
    SignInComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, CoreModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
