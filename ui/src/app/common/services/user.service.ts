import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/internal/operators';
import { throwError } from 'rxjs/index';
import { NewUser } from '../models/add_user.model';
import { EditUser } from '../models/edit_user.model';
import { TableParams } from '../models/table-params.model';
import { HelperService } from './helper.service';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) {
    }

    /**
     * http request to the server to get all users
     * @param {TableParams} params: request parameters
     */
    getUsers(params: TableParams): Observable<any> {
        return this.http.get(environment.API_URL + `/users`, {params: HelperService.makeHttpParams(params)})
            .pipe(
                catchError(error => throwError('Server problem: ' + error.status + ' error'))
            )
    }

    /**
     * http request transfer to the server new user
     * @param user - user data
     */
    addUser(user: NewUser) {
        let {email, firstName, lastName, password} = user;
        return this.http.post(environment.API_URL + '/users', {
            email,
            firstName,
            lastName,
            password
        }).pipe(
            catchError(error => throwError(error))
        )
    }

    /**
     * http request transfer to the server new data about user
     * @param id - delivered user's id
     * @param user - user data
     */
    editUser(user: EditUser, id) {
        let {firstName, lastName} = user;
        return this.http.patch(environment.API_URL + `/users/${id}`, {
            firstName,
            lastName
        }).pipe(
            catchError(error => throwError(error))
        )
    }

    /**
     *  http request to delete user from the server
     * @param id - user's id
     */
    deleteUser(id) {
        return this.http.delete(environment.API_URL + `/users/${id}`)
            .pipe(
                catchError(error => throwError(error))
            )
    }

    /**
     * http request to  get single user from the server by id
     * @param id - user's id
     */
    getUser(id) {
        return this.http.get(environment.API_URL + `/users/${id}`)
            .pipe(
                catchError(error => throwError(error))
            )
    }
}
