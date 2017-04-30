import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { StateService } from '../../services/state.service';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    constructor(private auth: AuthService, private state: StateService)
    {
    }

    ngOnInit() {
        if (this.auth.isLoggedIn())
        {
            if (this.state.username === '')
            {
                this.auth.setLoginState(true);
            }
        }
    }
}
