import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { StateService } from '../../services/state.service';

@Component({
    selector: 'nav-menu',
    templateUrl: './navmenu.component.html',
    styleUrls: ['./navmenu.component.css']
})
export class NavMenuComponent implements OnInit{
    private isLoggedIn: boolean;

    constructor(
        private authService: AuthService,
        private state: StateService
    ) { }

    ngOnInit() {
        this.isLoggedIn = this.authService.isLoggedIn();
    }
}
