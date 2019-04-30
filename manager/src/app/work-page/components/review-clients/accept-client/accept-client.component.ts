import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as fromCore from '../../../core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-accept-client',
  templateUrl: './accept-client.component.html',
  styleUrls: ['./accept-client.component.scss']
})
export class AcceptClientComponent implements OnInit {

  client: fromCore.ReviewClient;
  formTime: FormGroup = new FormGroup({
    time: new FormControl('', [Validators.required, Validators.minLength(5)])
  });
  formDate: FormGroup = new FormGroup({
    date: new FormControl('', [
      Validators.required,
      Validators.minLength(10)
    ])
  });
  formPrice: FormGroup = new FormGroup({
    price: new FormControl('', [Validators.required])
  })
  placeholderOfDate = new Date().getTime();
  newDate: any;
  
  constructor(
    public dialogRef: MatDialogRef<AcceptClientComponent>,
    @Inject(MAT_DIALOG_DATA) data: fromCore.ReviewClient
  ) {
    this.client = data;
  }

  ngOnInit() {
    this.formDate.valueChanges.subscribe((value: {date: Date}) => {
      this.checkSelectedDate();
    });
    this.formTime.valueChanges.subscribe((value: {date: Date}) => {
      this.checkSelectedDate();
    });
  }

  checkSelectedDate() {
    if(new Date().getTime() > this.getDateFromInput().getTime()) {
      this.formDate.get('date').setErrors({less: true});
    } else {
      this.formDate.get('date').setErrors(null);
    }
  }

  cancel() {
    this.dialogRef.close(null);
  }
  
  getDateFromInput(): Date {
    const time = this.formTime.get('time').value.split(':');
    const date = new Date(this.formDate.get('date').value);
    const createDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      time[0],
      time[1]
    );
    return createDate;
  }

  async sendData() {
    if(this.formDate.invalid || this.formTime.invalid || this.formPrice.invalid) return null;
    const getDate: Date = await this.getDateFromInput();
    if(getDate) {
      const newClient: fromCore.AcceptedClient = {
        name: this.client.data.name,
        phone: this.client.data.phoneNumber,
        date: getDate.getTime().toString()
      };
      this.dialogRef.close(newClient);
    }
  }

}
