import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { Manager } from './../../phone-login/manager.models';
import { Observable } from 'rxjs';


@Injectable()
export class AppService {

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private snackBar: MatSnackBar,
    private db: AngularFireDatabase
  ) { }

  openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, '', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition
    });
  }

  getManagers(): Observable<{
    data: Manager;
    key: string
  }[]> {
    return this.db.list('managers').snapshotChanges()
      .pipe(map((item: any) => {
        const managers = [];
        item.forEach((elem: any) => {
          managers.push({
            key: elem.key,
            data: elem.payload.toJSON()
          });
        });
        return managers;
      }));
  }
}
