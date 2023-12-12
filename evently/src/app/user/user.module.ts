import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserSingleComponent } from './user-single/user-single.component';
import { UserListComponent } from './user-list/user-list.component';

@NgModule({
  declarations: [UserSingleComponent, UserListComponent],
  imports: [CommonModule, UserRoutingModule],
})
export class UserModule {}
