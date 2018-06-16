import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/internal/operators';
import { throwError } from 'rxjs/index';
import { NewUser } from '../models/add.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    sortById: string = '?sortBy=id';

    constructor(private http: HttpClient) {
    }

    /**
     * http request to the server to get all users
     */
    getUsers() {
        return this.http.get(environment.BASE_URL + `/app/users${this.sortById}`)
            .pipe(
                catchError(error => throwError('Something went wrong'))
            )
    }

    /**
     * http request transfer to the server new user
     */
    addUser(user: NewUser) {
        return this.http.post(environment.BASE_URL + '/app/users', {
            email    : user.email,
            firstName: user.firstName,
            lastName : user.lastName,
            password : user.password
        }).pipe(
            catchError(error => throwError('Something went wrong'))
        )
    }
}
