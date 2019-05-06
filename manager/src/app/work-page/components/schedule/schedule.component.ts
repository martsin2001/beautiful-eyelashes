import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as fromCore from '../../core';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  @Input() acceptedClients: fromCore.ReviewAcceptedClient[];
  @Output() deleteAcceptedClient = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  addClient() {
    
  }

  onDeleteAcceptedClient(payload: {
    reason: string,
    acceptedClient: fromCore.ReviewAcceptedClient
  }) {
    this.deleteAcceptedClient.emit(payload);
  }

}
