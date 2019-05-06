import { AnalyticsComponent } from './components/analytics/analytics.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModules } from '../shared/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppControllerComponent } from './components/app-controller.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {path: '', component: AppControllerComponent, pathMatch: 'full'}
]

@NgModule({
    imports: [
      CommonModule,
      MaterialModules,
      FormsModule,
      ReactiveFormsModule,
      RouterModule.forChild(routes)
    ],
    declarations: [
        AppControllerComponent,
        AnalyticsComponent
    ],
    entryComponents: []
  })
  export class AppControllerModule { }