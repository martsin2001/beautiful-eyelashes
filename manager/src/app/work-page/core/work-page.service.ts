import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import * as fromCore from '../core';
import { AppService } from 'src/app/core/service/app.service';

@Injectable()
export class WorkPageService {
  constructor(
    private db: AngularFireDatabase,
    private app: AppService
  ) { }

  getCurrentManager(key: string): Observable<{name: string; number: string}> {
    return this.db.object(`managers/${key}`)
      .snapshotChanges()
      .pipe(map((manager: any) => {
          return {
            name: manager.payload.toJSON().name,
            number: manager.payload.toJSON().phoneNumber
          };
      }))
  }

  getClients(): Observable<{key: string; data: fromCore.Client}[]> {
    return this.db.list('clients')
      .snapshotChanges()
      .pipe(map(item => {
        const clients = [];
        item.forEach((elem: any) => {
          clients.push({
            key: elem.key,
            data: elem.payload.toJSON()
          });
        });
        return clients;
      }))
  }

  getAcceptedClients(): Observable<fromCore.ReviewAcceptedClient[]> {
    return this.db.list('accepted-clients')
      .snapshotChanges()
      .pipe(map(item => {
        const acceptedClients = [];
        item.forEach((elem: any) => {
          acceptedClients.push({
            key: elem.key,
            data: elem.payload.toJSON()
          });
        });
        console.log(acceptedClients);
        return acceptedClients;
      }));
  }

  addClient(client: fromCore.AcceptedClient) {
    this.db.list('accepted-clients').push(client)
      .then(() => {
        this.app.openSnackBar('Successfully added!');
      }).catch(err => {
        this.app.openSnackBar('Server error!');
      });
  }

  deleteRequest(key: string) {
    this.db.object(`clients/${key}`)
      .remove().then(() => {
        this.app.openSnackBar('Deleted successfully!');
      }).catch(err => {
        this.app.openSnackBar('Server error!');
      });
  }

  deleteAcceptedClient(key: string) {
    this.db.object(`accepted-clients/${key}`)
      .remove().then(() => {
        this.app.openSnackBar('Deleted successfully!');
      }).catch(err => {
        this.app.openSnackBar('Server error!');
      });
  }
}   