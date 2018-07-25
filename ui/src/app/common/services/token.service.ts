import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Token } from '../models/token.model';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/internal/operators';
import { throwError } from 'rxjs/index';

@Injectable({
    providedIn: 'root'
})
export class TokenService {

    constructor(private http: HttpClient, private router: Router) {
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

    /**
     * http request to the server for  new authentication data
     */
    public refreshToken() {
        return this.http.post(environment.NO_AUTH_PREFIX + '/refresh-token', this.getToken()['expirationToken'])
            .pipe(
                catchError(error => throwError('Server problem: ' + error.status + ' error'))
            )
    }
}
