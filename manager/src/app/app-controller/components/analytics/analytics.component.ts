import * as fromCore from '../../core';

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {

  @Input() details: fromCore.Analytics;

  constructor() { }

  ngOnInit() {
  }

}
