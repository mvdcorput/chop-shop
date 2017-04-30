import { Injectable, Inject } from "@angular/core";
import { Headers, Http } from "@angular/http";
import "rxjs/add/operator/toPromise";

@Injectable()
export class AuthService {
    private tokeyKey = "token";
    private token: string;
    private inBrowser: boolean;

    constructor(private http: Http) {
        this.inBrowser = typeof window !== 'undefined';
    }

    login(userName: string, password: string): Promise<RequestResult> {
        return this.http.post("/api/TokenAuth", { Username: userName, Password: password }).toPromise()
            .then(response => {
                let result = response.json() as RequestResult;
                if (result.State == 1) {
                    let json = result.Data as any;

                    if (this.inBrowser) {
                        localStorage.setItem("token", json.accessToken);
                    }
                }
                return result;
            })
            .catch(this.handleError);
    }

    logout() {
        if (this.inBrowser) {
            localStorage.removeItem("token");
        }
    }

    checkLogin(): boolean {
        var token = this.inBrowser ? localStorage.getItem(this.tokeyKey) : null;
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

    private getLocalToken(): string {
        if (!this.token) {
            this.token = this.inBrowser ? localStorage.getItem(this.tokeyKey) : '';
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