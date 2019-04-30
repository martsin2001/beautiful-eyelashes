import { ReviewAcceptedClientsComponent } from './components/schedule/review-accepted-clients/review-accepted-clients.component';
import { AcceptClientComponent } from './components/review-clients/accept-client/accept-client.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { ReviewClientsComponent } from './components/review-clients/review-clients.component';
import { MaterialModules } from './../shared/angular-material.module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkPageComponent } from './components/work-page.component';
import { TimeDirective } from './core/time.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {path: '', component: WorkPageComponent, pathMatch: 'full'}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModules,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    WorkPageComponent,
    ReviewClientsComponent,
    ScheduleComponent,
    AcceptClientComponent,
    TimeDirective,
    ReviewAcceptedClientsComponent
  ],
  entryComponents: [AcceptClientComponent]
})
export class WorkPageModule { }
