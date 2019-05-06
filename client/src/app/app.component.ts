import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material';

class User {
  constructor(
    public name: string,
    public age: string
  ) { }
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  private verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private http: HttpClient,
    private db: AngularFireDatabase,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, '', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition
    });
  }

  bookPlace(details: {name: string; phoneNumber: string}) {
    this.db.list('clients').push({
      ...details,
      date: Date.now().toString()
    }).then(() => {
      this.openSnackBar('Contacts sent!');
    }).catch(err => {
      this.openSnackBar('Something wrong :(');
    })
  }
}
