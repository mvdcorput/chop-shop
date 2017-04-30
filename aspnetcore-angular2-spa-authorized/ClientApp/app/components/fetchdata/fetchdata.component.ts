import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'fetchdata',
    templateUrl: './fetchdata.component.html'
})
export class FetchDataComponent implements OnInit {
    public forecasts: WeatherForecast[];

    constructor(private http: Http, private auth: AuthService, private router: Router) {
        //http.get('/api/SampleData/WeatherForecasts').subscribe(result => {
        //    this.forecasts = result.json() as WeatherForecast[];
        //});
    }

    ngOnInit() {
        const self: FetchDataComponent = this;

        self.auth.authGet('/api/SampleData/WeatherForecasts').then(result => {
            self.forecasts = result as any as WeatherForecast[];
        }).catch(exception => {
            if (exception.result = 401) {
                self.router.navigateByUrl('/login');
            }
        });
    }
}

interface WeatherForecast {
    dateFormatted: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}
