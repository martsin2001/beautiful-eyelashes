import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-book-place',
  templateUrl: './book-place.component.html',
  styleUrls: ['./book-place.component.scss']
})
export class BookPlaceComponent implements OnInit {

  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required, Validators.minLength(12), Validators.maxLength(12)])
  });

  @Output() BookPlace: EventEmitter<{ name: string, phoneNumber: string }> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  updateForm() {
    this.form.get('name').setValidators([Validators.required]);
    this.form.get('phoneNumber').setValidators([Validators.required, Validators.minLength(12), Validators.maxLength(12)]);
  }

  resetForm() {
    this.form.get('name').setValidators(null);
    this.form.get('phoneNumber').setValidators(null);
    this.form.reset();
  }

  bookPlace() {
    if(this.form.invalid) return;
    this.BookPlace.emit({
      ...this.form.value,
      phoneNumber: '+38' + this.form.value.phoneNumber
    });
    this.resetForm();
    setTimeout(() => this.updateForm(), 100);
  }

}
