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
        const self: HomeComponent = this;

        if (self.auth.isLoggedIn()) {
            self.auth.setLoginState(true).then(result => {
                self.loggedIn = true;
            });
        }
        
    }
}
