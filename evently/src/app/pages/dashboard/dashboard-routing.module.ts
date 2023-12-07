import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThisWeekComponent } from './this-week/this-week/this-week.component';
import { MyEventsComponent } from './my-events/my-events/my-events.component';
import { CalendarComponent } from './calendar/calendar/calendar.component';

const routes: Routes = [
  {
    path: '',
    component: ThisWeekComponent,
  },
  {
    path: 'this-week',
    component: ThisWeekComponent,
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
