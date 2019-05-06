import * as fromCore from '../core';

import { map } from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppControllerService {

  constructor(
    private db: AngularFireDatabase
  ) { }

  getAnalytics(): Observable<fromCore.Analytics[]> {
    return this.db.list('analytics').snapshotChanges()
      .pipe(map(item => {
        const analytics = [];
        item.forEach((elem: any) => {
          analytics.push({
            key: elem.key,
            ...elem.payload.toJSON()
          });
        });
        return analytics;
      }))
  }
}