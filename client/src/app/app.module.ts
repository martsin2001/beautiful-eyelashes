import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LayoutComponent } from './layout/layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
   MatIconModule,
   MatButtonModule,
   MatDividerModule,
   MatFormFieldModule,
   MatInputModule,
   MatSnackBarModule,
   MatGridListModule
} from '@angular/material';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from './../environments/environment';
import { BookPlaceComponent } from './book-place/book-place.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditPhoneNumber } from './book-place/phone-number.directive';
import { LayoutService } from './layout/layout.service';
import { AngularFireStorageModule } from 'angularfire2/storage';


@NgModule({
   declarations: [
      AppComponent,
      LayoutComponent,
      BookPlaceComponent,
      EditPhoneNumber
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      BrowserAnimationsModule,
      MatIconModule,
      MatInputModule,
      MatGridListModule,
      MatFormFieldModule,
      MatButtonModule,
      ReactiveFormsModule,
      MatSnackBarModule,
      AngularFireStorageModule,
      MatDividerModule,
      AngularFireModule.initializeApp(environment.firebaseConfig),
      AngularFireDatabaseModule
   ],
   providers: [
      LayoutService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
