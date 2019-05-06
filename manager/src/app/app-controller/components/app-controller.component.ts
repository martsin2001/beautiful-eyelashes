import { FormGroup, FormControl } from '@angular/forms';
import * as fromCore from '../core';

import { Observable } from 'rxjs';
import { AppControllerService } from './../core/app.controller.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-controller',
  templateUrl: './app-controller.component.html',
  styleUrls: ['./app-controller.component.scss']
})
export class AppControllerComponent implements OnInit {

  form: FormGroup = new FormGroup({
    search: new FormControl('')
  });

  analytics$: Observable<fromCore.Analytics[]>;

  constructor(
    private appContService: AppControllerService
  ) { }

  ngOnInit() {
    this.analytics$ = this.appContService.getAnalytics();
  }

}
