import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { StateService } from '../../services/state.service';

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
    public loggedIn: boolean;

    constructor(private auth: AuthService, private state: StateService)
    {

    }

    ngOnInit() {
        this.loggedIn = this.auth.isLoggedIn();
    }
}
