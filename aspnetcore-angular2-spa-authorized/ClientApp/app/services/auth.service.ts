import { Injectable, Inject } from "@angular/core";
import { Headers, Http } from "@angular/http";
import "rxjs/add/operator/toPromise";

import { StateService } from './state.service';

@Injectable()
export class AuthService {
    private tokenKey = "token";
    private token: string;
    private inBrowser: boolean;

    constructor(private http: Http, private state: StateService) {
        this.inBrowser = typeof window !== 'undefined';
    }

    login(userName: string, password: string): Promise<RequestResult> {
        return this.http.post("/api/TokenAuth", { Username: userName, Password: password }).toPromise()
            .then(response => {
                let result = response.json() as RequestResult;
                if (result.State == 1) {
                    let json = result.Data as any;

                    if (this.inBrowser) {
                        localStorage.setItem(this.tokenKey, json.accessToken);
                    }

                    this.setLoginState(true);
                }
                return result;
            })
            .catch(this.handleError);
    }

    logout() {
        if (this.inBrowser) {
            localStorage.removeItem(this.tokenKey);
        }

        this.setLoginState(false);
    }

    isLoggedIn(): boolean {
        var token = this.inBrowser ? localStorage.getItem(this.tokenKey) : null;

        return token != null;
    }

    getUserInfo(): Promise<RequestResult> {
        return this.authGet("/api/TokenAuth");
    }

    authPost(url: string, body: any): Promise<RequestResult> {
        let headers = this.initAuthHeaders();
        return this.http.post(url, body, { headers: headers }).toPromise()
            .then(response => response.json() as RequestResult)
            .catch(this.handleError);
    }

    authGet(url): Promise<RequestResult> {
        let headers = this.initAuthHeaders();
        return this.http.get(url, { headers: headers }).toPromise()
            .then(response => response.json() as RequestResult)
            .catch(this.handleError);
    }

    setLoginState(loggedIn): void {
        if (loggedIn) {
            this.getUserInfo().then(res => {
                this.state.username = (res.Data as any).Username;
            });
        }
        else {
            this.state.username = '';
        }
    }

    private getLocalToken(): string {
        if (!this.token) {
            this.token = this.inBrowser ? localStorage.getItem(this.tokenKey) : '';
        }
        return this.token;
    }

    private initAuthHeaders(): Headers {
        let token = this.getLocalToken();
        if (token == null) throw "No token";

        var headers = new Headers();
        headers.append("Authorization", "Bearer " + token);

        return headers;
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}

export class RequestResult {
    State: number;
    Msg: string;
    Data: Object;
}