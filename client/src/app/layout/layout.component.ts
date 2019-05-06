import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  imagesHeight = 'auto';
  images = [
    {
      src: 'assets/images/first-image.jpg',
      type: '2D',
      likes: 23,
      cols: 2,
      rows: 1
    },{
      src: 'assets/images/second-image.jpg',
      type: 'Classic',
      likes: 36,
      cols: 2,
      rows: 2,
    },{
      src: 'assets/images/third-image.jpg',
      type: 'Classic',
      likes: 38,
      cols: 2,
      rows: 1
    },
  ]

  @Output() bookPlace: EventEmitter<{name: string, phoneNumber: string}> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onBookPlace(data: {name: string, phoneNumber: string}) {
    this.bookPlace.emit(data);
  }

}
