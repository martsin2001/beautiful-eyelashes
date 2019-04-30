import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

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

  constructor(
    private http: HttpClient,
    private db: AngularFireDatabase
  ) { }

  ngOnInit() {
    this.db.list('users').snapshotChanges()
      .subscribe((item: any) => {
        const users = [];
        item.forEach((elem: any) => {
          const someElem: {name: string, age: string} = elem.payload.toJSON();
          users.push({...someElem, key: elem.key});
        });
        console.log(users);
      });
  }
}
