import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
    isLoggedIn = false;
    username: string;

    constructor(private authService: AuthService)
    {

    }

    ngOnInit() {
        this.isLoggedIn = this.authService.checkLogin();

        if (this.isLoggedIn)
        {
            this.authService.getUserInfo().then(res => {
                this.username = (res.Data as any).Username;
            });
        }
    }
}
