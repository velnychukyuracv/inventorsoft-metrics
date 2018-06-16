import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/internal/operators';
import { throwError } from 'rxjs/index';
import { TokenService } from './token.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private http: HttpClient,
        private tokenService: TokenService
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

    get isAuthenticated() {
        return !!this.tokenService.getToken()
    }
}
