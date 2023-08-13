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
// import { AngularFireModule } from '@angular/fire/compat';
// import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
// import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
// import { provideSt }
import { AuthService } from './core/shared/auth.service';
import { ModalComponent } from './core/components/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SettingsComponent,
    SignInComponent,
    ManageUsersComponent,
    ProfileComponent,
    ModalComponent,
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
    // provideStorage(() => getStorage()),
    provideFirestore(() => getFirestore()),
    // AngularFireModule.initializeApp(environment.firebase),
    // AngularFireAuthModule,
    // AngularFirestoreModule,

  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
