import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'login',
    templateUrl: './not-authorised.component.html'
})
export class NotAuthorisedComponent implements OnInit {
    public secondsLeft: number;

    constructor(
        private router: Router
    ) { }

    ngOnInit() {
        const self: NotAuthorisedComponent = this;

        this.countDown(5, function () { self.router.navigateByUrl('/login'); });
    }

    countDown(secondsLeft: number, finishedFunc: () => void)
    {
        const self: NotAuthorisedComponent = this;

        this.secondsLeft = secondsLeft;

        if (secondsLeft === 0)
        {
            finishedFunc();
        }
        else {
            setTimeout(function () {
                self.countDown(secondsLeft - 1, finishedFunc);
            }, 1000);
        }
    }
}
