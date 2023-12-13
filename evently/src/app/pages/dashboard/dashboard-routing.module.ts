import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WhatsOnComponent } from './whats-on/whats-on/whats-on.component';
import { MyEventsComponent } from './my-events/my-events/my-events.component';
import { CalendarComponent } from './calendar/calendar/calendar.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'whats-on',
    pathMatch: 'full',
  },
  {
    path: 'whats-on',
    component: WhatsOnComponent,
  },
  {
    path: 'my-events',
    component: MyEventsComponent,
  },
  {
    path: 'calendar',
    component: CalendarComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
