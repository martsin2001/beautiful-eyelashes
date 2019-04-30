import { Routes, RouterModule } from '@angular/router';
import { PhoneLoginComponent } from './phone-login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModules } from '../shared/angular-material.module';
import { EditPhoneNumber, EditCodeNumber } from './phone-number.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
    {path: '', redirectTo: 'via-phone', pathMatch: 'full'},
    {path: 'via-phone', component: PhoneLoginComponent, pathMatch: 'full'}
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
      PhoneLoginComponent,
      EditPhoneNumber,
      EditCodeNumber,
  ]
})
export class PhoneLoginModule { }
