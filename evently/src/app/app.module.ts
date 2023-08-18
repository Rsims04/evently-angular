import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { CoreModule } from './core/core.module';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { ManageUsersComponent } from './pages/manage-users/manage-users.component';
import { ProfileComponent } from './pages/profile/profile.component';

import { environment } from 'src/environments/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import { AuthService } from './core/shared/auth.service';

import { ModalComponent } from './core/components/modal/modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProfileDialogComponent } from './pages/profile/profile-dialog/profile-dialog.component';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SettingsComponent,
    SignInComponent,
    ManageUsersComponent,
    ProfileComponent,
    ModalComponent,
    ProfileDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    BrowserAnimationsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
