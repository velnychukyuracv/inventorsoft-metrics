import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { User } from "../models/user.model";
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private http: HttpClient
    ) {
    }

    login(user: User) {
        console.log(user);
        return this.http.post(environment.NO_AUTH_PREFIX + '/login', {
            password: user.password,
            userName: user.userName
        })
    }
}
