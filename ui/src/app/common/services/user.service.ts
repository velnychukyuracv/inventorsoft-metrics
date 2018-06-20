import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/internal/operators';
import { throwError } from 'rxjs/index';
import { NewUser } from '../models/add_user.model';
import { EditUser } from '../models/edit_user.model';

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
        let {email, firstName, lastName, password} = user;
        return this.http.post(environment.BASE_URL + '/app/users', {
            email,
            firstName,
            lastName,
            password
        }).pipe(
            catchError(error => throwError('Something went wrong'))
        )
    }

    /**
     * http request transfer to the server new data about user
     * @param id - delivered user's id
     */
    editUser(user: EditUser, id) {
        let {firstName, lastName} = user;
        return this.http.patch(environment.BASE_URL + `/app/users/${id}`, {
            firstName,
            lastName
        }).pipe(
            catchError(error => throwError('Something went wrong'))
        )
    }
}
