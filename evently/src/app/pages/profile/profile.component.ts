import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
import { ProfileDialogComponent } from './profile-dialog/profile-dialog.component';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private db: Firestore,
    private dialog: MatDialog,
    private userService: UserService
  ) {}

  user: User = {} as User;
  userData$: any = {};

  ngOnInit(): void {
    // Check if user is logged in and grab current user.
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.user = user;
        this.userData$ = (
          await this.userService.getCurrentUserData()
        ).subscribe((data) => {
          this.userData$ = data;
        });
      } else {
        console.log('Error: user is null...');
      }
    });
  }

  /**
   * Opens modal and sends correct field information.
   */
  editDetail(field: string, fieldName: string): void {
    const dialogRef = this.dialog.open(ProfileDialogComponent, {
      panelClass: 'custom-dialog-class',
      data: {
        field,
        fieldName,
      },
    });
  }
}
