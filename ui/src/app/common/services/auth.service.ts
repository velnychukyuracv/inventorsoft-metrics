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

    constructor(private http: HttpClient,
                private tokenService: TokenService) {
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
            catchError(error => throwError(error))
        )
    }

    /**
     * find out if user is authenticated
     */
    get isAuthenticated() {
        return !!this.tokenService.getToken()
    }

    /**
     * http request to the server for new token
     * @param email - user email
     */
    forgotPassword(email) {
        return this.http.post(environment.NO_AUTH_PREFIX + `/forgetPassword?email=${encodeURIComponent(email)}`, {email})
            .pipe(
                catchError(error => throwError(error))
            )

    }

    /**
     * http request to the server to provide  user's new password
     * @param password - new user's password
     * @param token - new token received from the server
     */
    resetPassword(password: string, token: string) {
        return this.http.post(environment.NO_AUTH_PREFIX + '/forgetPassword/resetPassword', {password, token})
            .pipe(
                catchError(error => throwError(error))
            )

    }
}
