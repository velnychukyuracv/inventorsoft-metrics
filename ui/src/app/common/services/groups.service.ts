import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';
import { Group } from '../models/group.model';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
    providedIn: 'root'
})

export class GroupsService {

    constructor(private httpClient: HttpClient,
                private authService: AuthService) {
    }

    /**
     * Http request for getting all groups
     * @returns {Observable<any>}
     */
    getGroups() : Observable<any> {
        return this.httpClient.get(environment.BASE_URL + '/app/groups')
            .pipe(
                catchError((error: HttpErrorResponse) => throwError(error))
            );
    }

    /**
     * Http request to create a group
     * @param {Group} createdGroup
     * @returns {Observable<any>}
     */
    addGroup(createdGroup: Group) : Observable<any> {
        const body = {
            materialIcon: createdGroup.materialIcon,
            name: createdGroup.name
        };
        return this.httpClient.post(environment.BASE_URL + '/app/groups', body)
            .pipe(
                catchError((error: HttpErrorResponse) => throwError(error))
            );
    }

    /**
     * Http request to edit a group with idGroup
     * @param {Group} newGroup - new group data
     * @param {number} idGroup
     * @returns {Observable<any>}
     */
    editGroup(newGroup: Group, idGroup: number) : Observable<any> {
        return this.httpClient.patch(environment.BASE_URL + '/app/groups/' + idGroup, newGroup)
            .pipe(
                catchError((error: HttpErrorResponse) => throwError(error))
            );
    }

    /**
     * Http request to edit delete a group with idGroup
     * @param {number} idGroup
     * @returns {Observable<any>}
     */
    deleteGroup(idGroup: number) : Observable<any> {
        return this.httpClient.delete(environment.BASE_URL + '/app/groups/' + idGroup)
            .pipe(
                catchError((error: HttpErrorResponse) => throwError(error))
            );
    }
}


