import { WorkPageService } from './work-page/core/work-page.service';
import { MaterialModules } from './shared/angular-material.module';
import { AngularFireModule } from 'angularfire2';
import { WindowService } from './core/service/window.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppService } from './core/service/app.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from './../environments/environment.prod';

const routes: Routes = [
   {path: '', redirectTo: 'login', pathMatch: 'full'},
   {path: 'login', loadChildren: './phone-login/phone-login.module#PhoneLoginModule', pathMatch: 'prefix'},
   {path: 'work-page', loadChildren: './work-page/work-page.module#WorkPageModule', pathMatch: 'prefix'},
   {path: 'app-controller', loadChildren: './app-controller/app-controller.module#AppControllerModule', pathMatch: 'prefix'},
   {path: '**', redirectTo: 'login'}
];

@NgModule({
   declarations: [
      AppComponent
   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      MaterialModules,
      FormsModule,
      ReactiveFormsModule,
      RouterModule.forRoot(routes),
      AngularFireModule.initializeApp(environment.firebaseConfig),
      AngularFireDatabaseModule
   ],
   providers: [
      AppService,
      WindowService,
      WorkPageService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
