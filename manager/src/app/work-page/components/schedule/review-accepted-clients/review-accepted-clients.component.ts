import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import * as fromCore from '../../../core';

@Component({
  selector: 'app-review-accepted-clients',
  templateUrl: './review-accepted-clients.component.html',
  styleUrls: ['./review-accepted-clients.component.scss']
})
export class ReviewAcceptedClientsComponent implements OnInit {

  @Input() acceptedClient: fromCore.ReviewAcceptedClient;
  @Output() DeleteAcceptedClient = new EventEmitter();

  constructor() { }

  ngOnInit() {
    setInterval(() => this.updateTime(), 1000)
  }

  updateTime() {
    if(new Date(Number(this.acceptedClient.data.date)) < new Date()) {
      this.deleteAcceptedClient();
    }
  }

  deleteAcceptedClient() {
<<<<<<< Updated upstream
    this.DeleteAcceptedClient.emit(this.acceptedClient);
=======
    const editDialog = new MatDialogConfig();
    editDialog.width = '95%';
    editDialog.maxWidth = '500px';
    editDialog.height = 'auto';
    editDialog.autoFocus = true;
    const dialogEditRef = this.dialog.open(ActionConfirmationComponent, editDialog);
    dialogEditRef.afterClosed().subscribe(result => {
      if(result) {
        this.DeleteAcceptedClient.emit({
          reason: result.reason,
          acceptedClient: this.acceptedClient
        });
      }
    });
>>>>>>> Stashed changes
  }

}
