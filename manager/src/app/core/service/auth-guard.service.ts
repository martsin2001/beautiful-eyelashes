import { Injectable } from '@angular/core';
import { CanActivate, Router, CanActivateChild } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(
        private router: Router
    ) { }

    canActivate(): boolean {
        return true;
    }

    canActivateChild(): boolean {
        return false;
    }
}
