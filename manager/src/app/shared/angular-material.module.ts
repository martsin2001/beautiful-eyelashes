import { NgModule } from '@angular/core';

import {
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatBadgeModule
} from '@angular/material';

 const ImportedMaterialModules = [
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatBadgeModule
 ];

@NgModule({
  exports: [
    ...ImportedMaterialModules
  ],
  providers: [MatDatepickerModule]
})
export class MaterialModules { }
