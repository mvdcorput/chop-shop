import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
    private username: string;
    private password: string;
    private isLoggedIn: boolean;
    private loggedInAs: string;

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit() {
        this.isLoggedIn = this.authService.checkLogin();

        if (this.isLoggedIn) {
            this.authService.getUserInfo().then(res => {
                this.loggedInAs = (res.Data as any).Username;
            });
        }
    }

    login() {
        this.authService.login(this.username, this.password)
            .then(result => {
                if (result.State == 1) {
                    this.router.navigate(["./home"]);
                }
                else {
                    alert(result.Msg);
                }
            });
    }

    logoff() {
        this.authService.logout();

        document.location.href = document.location.href;
    }
}
