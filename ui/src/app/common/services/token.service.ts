import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Token } from '../models/token.model';

@Injectable({
    providedIn: 'root'
})
export class TokenService {

    constructor(private http: HttpClient) {
    }

    /**
     * get authentication data from local storage
     */
    getToken(): Token {
        let data = JSON.parse(localStorage.getItem('jwt.token'));
        return data ? data : false;
    }

    /**
     * store authentication data to local storage
     * @param token - token data
     */
    public saveToLocalStorage(token) {
        let data = JSON.stringify(token);
        localStorage.setItem('jwt.token', data)
    }

    //TODO find bug in refresh token
    /**
     * http request to the server for  new authentication data
     */
    // public refreshToken() {
    //     return this.http.post(environment.NO_AUTH_PREFIX + '/refresh-token', this.getToken()['expirationToken'])
    //         .subscribe(
    //             (res) => {
    //                 this.saveToLocalStorage(res);
    //             }
    //         );
    // }
}
