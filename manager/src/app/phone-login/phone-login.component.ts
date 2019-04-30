import { AppService } from './../core/service/app.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { WindowService } from '../core/service/window.service';
import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import * as fromModels from './manager.models';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

class PhoneNumber {
  constructor(
    public number: string
  ) { }

  get e164() {
    return `+38${this.number
      .split('')
      .filter(a => a !== '-')
      .join('')}`;
  }
}

class Code {
  constructor(
    public code: string
  ) { }

  get e164() {
    return `${this.code
      .split('')
      .filter(a => a !== '-')
      .join('')}`;
  }
}

@Component({
  selector: 'app-phone-login',
  templateUrl: './phone-login.component.html',
  styleUrls: ['./phone-login.component.scss']
})
export class PhoneLoginComponent implements OnInit {

  @ViewChild('recaptcha') recaptcha: ElementRef<HTMLDivElement>;

  phoneNumberControl: FormGroup = new FormGroup({
    number: new FormControl(null, [Validators.required, Validators.minLength(12)])
  });

  confirmationCode: FormGroup = new FormGroup({
    code: new FormControl(null, [Validators.required, Validators.minLength(7)])
  });

  windowRef: any;
  verificationCode: string;
  user: any;
  codeSent = false;

  constructor(
    private win: WindowService,
    private db: AngularFireDatabase,
    private appService: AppService,
    private router: Router
  ) { }

  ngOnInit() {
    this.windowRef = this.win.windowRef;
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    this.windowRef.recaptchaVerifier.render();
  }

  sendLoginCode() {
    const appVerifier = this.windowRef.recaptchaVerifier;
    const currentNumber = this.phoneNumberControl.get('number').value;
    const num = new PhoneNumber(currentNumber).e164;
    firebase.auth().signInWithPhoneNumber(num, appVerifier)
      .then(result => {
          this.windowRef.confirmationResult = result;
          this.recaptcha.nativeElement.hidden = true;
          this.codeSent = true;
      })
      .catch( error => console.log(error) );
  }

  verifyLoginCode() {
    this.windowRef.confirmationResult
      .confirm(new Code(this.confirmationCode.get('code').value).e164)
      .then( result => {
        this.checkManager(result.user.phoneNumber);
        this.user = result.user;
      }).catch( error => {
        console.log(error, "Incorrect code entered?")
      });
  }

  checkManager(phone: string): void {
    this.appService.getManagers().subscribe(managers => {
      managers.map(manager => {
        if(manager.data.phoneNumber === phone) {
          this.loginSuccessful(manager.key)
        } else {
          this.loginFail()
        }
      })
    });
  }
  
  loginSuccessful(key: string) {
    localStorage.setItem('key', key);
    this.db.object(`managers/${key}`).snapshotChanges()
    .subscribe((item: any) => {
      this.appService.openSnackBar('Login successful!');
      this.router.navigateByUrl('/work-page');
    });
  }
  
  loginFail() {
    this.resetForms();
    this.codeSent = false;
    this.recaptcha.nativeElement.hidden = false;
    this.windowRef.recaptchaVerifier.render();
    this.appService.openSnackBar('You not a manager!');
  }

  resetForms() {
    this.confirmationCode.reset();
    this.phoneNumberControl.reset();
  }
}
