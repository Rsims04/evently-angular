import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { WhatsOnComponent } from './whats-on/whats-on/whats-on.component';
import { MyEventsComponent } from './my-events/my-events/my-events.component';
import { CalendarComponent } from './calendar/calendar/calendar.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [WhatsOnComponent, MyEventsComponent, CalendarComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    FontAwesomeModule,
  ],
})
export class DashboardModule {}
