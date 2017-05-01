import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { StateService } from '../../services/state.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
    private username: string;
    private password: string;
    private loggedIn: boolean;

    constructor(
        private auth: AuthService,
        private state: StateService,
        private router: Router
    ) { }

    ngOnInit() {
        this.loggedIn = this.auth.isLoggedIn();
    }

    login() {
        this.auth.login(this.username, this.password)
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
        this.auth.logout();

        this.router.navigate(["./home"]);
    }
}
