import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { RouterModule } from '@angular/router';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';


import { ProfileComponent } from '../patient-dashboard/profile/profile.component';
import { HistoryComponent } from '../patient-dashboard/history/history.component';
import { StatusLabelPipe } from '../../shared/pipe/status-label.pipe';
import { StatusColorPipe } from '../../shared/pipe/status-color.pipe';

@NgModule({
  declarations: [
    DashboardComponent,
    ProfileComponent,
    HistoryComponent,
    StatusLabelPipe,
    StatusColorPipe
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NzLayoutModule,
    NzMenuModule,
    NzButtonModule,
    NzBreadCrumbModule,
    NzIconModule,
    NzFormModule,
    FormsModule,
    ReactiveFormsModule,
    NzTabsModule,
    NzRadioModule,
    NzDatePickerModule,
    RouterModule,
    NzAvatarModule,
    NzDropDownModule,
    NzTagModule,
    NzCollapseModule
  ]
})
export class DashboardModule { }
