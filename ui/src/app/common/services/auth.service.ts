import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/internal/operators';
import { throwError } from 'rxjs/index';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private http: HttpClient
    ) {
    }

    /**
     * http request to the server for authentication data
     * @param user - user data
     */
    login(user: User) {
        return this.http.post(environment.NO_AUTH_PREFIX + '/login', {
            password: user.password,
            userName: user.userName
        }).pipe(
            catchError(error => throwError('User Name or Password incorrect'))
        )
    }

    // TODO should move this function to some token service
    /**
     * store authentication data to local storage
     * @param token - token data
     */
    saveToLocalStorage(token) {
        let data = JSON.stringify(token);
        localStorage.setItem('jwt.token', data);
    }

    getToken() {
        return JSON.parse(localStorage.getItem('jwt.token'));
    }
}
