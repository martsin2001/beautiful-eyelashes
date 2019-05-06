import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { WorkPageService } from '../core/work-page.service';
import { Component, OnInit } from '@angular/core';

import * as fromCore from '../core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-work-page',
  templateUrl: './work-page.component.html',
  styleUrls: ['./work-page.component.scss']
})
export class WorkPageComponent implements OnInit {

  manager$: Observable<{
    name: string;
    number: string;
    vip: boolean;
  }>;
  clients$: Observable<fromCore.ReviewClient[]>;
  acceptedClients$: Observable<fromCore.ReviewAcceptedClient[]>;
  quantityClients: number = 0;
  quantityAcceptedClients: number = 0;

  constructor(
    private workPageService: WorkPageService,
    private router: Router
  ) { }

  ngOnInit() {
    const key = localStorage.getItem('key');
    this.clients$ = this.workPageService.getClients()
      .pipe(map(clients => {
        this.quantityClients = clients.length;
        return clients;
      }));
    this.acceptedClients$ = this.workPageService.getAcceptedClients()
      .pipe(map(acceptedClients => {
        this.quantityAcceptedClients = acceptedClients.length;
        return acceptedClients;
      }));
    this.manager$ = this.workPageService.getCurrentManager(key);
  }

  goToAppController() {
    this.router.navigateByUrl('/app-controller');
  }

  addClientToSchedule(client: fromCore.AcceptedClient) {
    this.workPageService.addClient(client);
  }

  deleteRequest(client: fromCore.ReviewClient) {
    this.workPageService.deleteRequest(client.key);
  }

  deleteAcceptedClient(payload: {
    reason: string,
    acceptedClient: fromCore.ReviewAcceptedClient
  }) {
    this.workPageService.deleteAcceptedClient(payload);
  }

}
