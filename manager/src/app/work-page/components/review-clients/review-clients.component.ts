import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as fromCore from '../../core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { AcceptClientComponent } from './accept-client/accept-client.component';

@Component({
  selector: 'app-review-clients',
  templateUrl: './review-clients.component.html',
  styleUrls: ['./review-clients.component.scss']
})
export class ReviewClientsComponent implements OnInit {

  @Input() client: fromCore.ReviewClient;
  @Output() addClientToSchedule: EventEmitter<fromCore.AcceptedClient> = new EventEmitter();
  @Output() deleteRequest: EventEmitter<fromCore.ReviewClient> = new EventEmitter();

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  addToSchedule(client: fromCore.AcceptedClient) {
    this.addClientToSchedule.emit(client);
  }

  deleteCurrentRequest(client: fromCore.ReviewClient) {
    this.deleteRequest.emit(client);
  }

  acceptClient() {
    const editDialog = new MatDialogConfig();
    editDialog.width = '95%';
    editDialog.maxWidth = '500px';
    editDialog.height = 'auto';
    editDialog.autoFocus = true;
    editDialog.data = this.client;
    const dialogEditRef = this.dialog.open(AcceptClientComponent, editDialog);
    dialogEditRef.afterClosed().subscribe(result => {
      if(result) {
        this.addToSchedule(result)
      }
    });
  }

}
