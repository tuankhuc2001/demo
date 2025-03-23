import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AuthGuard } from '../../https/interceptor/auth.guard';
import { ProfileComponent } from '../patient-dashboard/profile/profile.component';
import { HistoryComponent } from '../patient-dashboard/history/history.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'patient', component: ProfileComponent, },
      { path: 'history', component: HistoryComponent, },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }
