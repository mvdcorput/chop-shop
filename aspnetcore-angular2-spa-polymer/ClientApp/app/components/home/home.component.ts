import { Component } from '@angular/core';

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent {
    title = 'app works!';
    myLabel = 'Select a number';
    myValue = '4';
    myItems = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
}
