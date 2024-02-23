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
import { provideStorage, getStorage } from '@angular/fire/storage';

import { AuthService } from './core/shared/auth.service';

import { ModalComponent } from './core/components/modal/modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProfileDialogComponent } from './pages/profile/profile-dialog/profile-dialog.component';
import { ManageUsersDialogComponent } from './pages/manage-users/manage-users-dialog/manage-users-dialog.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserService } from './core/services/user.service';
import { EventService } from './core/services/event.service';
import { WhatsOnComponent } from './pages/dashboard/whats-on/whats-on/whats-on.component';
import { ImageUploadComponent } from './core/components/image-upload/image-upload.component';
import { AddEventDialogComponent } from './pages/dashboard/whats-on/whats-on/add-event-dialog/add-event-dialog/add-event-dialog.component';

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
    ManageUsersDialogComponent,
    ImageUploadComponent,
    AddEventDialogComponent,
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
    provideStorage(() => getStorage()),
    BrowserAnimationsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    FontAwesomeModule,
  ],
  providers: [AuthService, UserService, EventService],
  bootstrap: [AppComponent],
})
export class AppModule {}
