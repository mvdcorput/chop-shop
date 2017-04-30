import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { AuthService } from './../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    private inBrowser: boolean;

    constructor(private router: Router, private authService: AuthService) {
        this.inBrowser = typeof window !== 'undefined';
    }

    canActivate() {
        if (this.inBrowser) {
            if (this.authService.checkLogin()) {
                return true;
            }
        }

        // not logged in so redirect to login page
        this.router.navigate(['/login']);
        return false;
    }
}