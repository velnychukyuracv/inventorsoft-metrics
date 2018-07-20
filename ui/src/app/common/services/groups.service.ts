import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Group } from '../models/group.model';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { groupIcons } from '../../groupIcons';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
    providedIn: 'root'
})

export class GroupsService {
    constructor(private httpClient: HttpClient) {
    }

    /**
     * Get all groups
     */
    getGroups(): Observable<any> {
        return this.httpClient.get(environment.API_URL + '/groups').pipe(catchError(
            (error: HttpErrorResponse) => throwError(error)
        ));
    }

    /**
     * Create group
     * @param createdGroup: Group Data
     */
    createGroup(createdGroup: Group): Observable<any> {
        const body = {materialIcon: createdGroup.materialIcon, name: createdGroup.name};
        return this.httpClient.post(environment.API_URL + '/groups', body).pipe(catchError(
            (error: HttpErrorResponse) => throwError(error)
        ));
    }

    /**
     * Edit group
     * @param editedGroup: Group Data
     * @param idGroup: Group id
     */
    editGroup(editedGroup: Group, idGroup: number): Observable<any> {
        const body = {materialIcon: editedGroup.materialIcon, name: editedGroup.name};
        return this.httpClient.patch(environment.API_URL + '/groups/' + idGroup, body).pipe(
            catchError(
                (error: HttpErrorResponse) => throwError(error)
            ));
    }

    /**
     * Delete group
     * @param idGroup: Group id
     */
    deleteGroup(idGroup: number): Observable<any> {
        return this.httpClient.delete(environment.API_URL + '/groups/' + idGroup).pipe(catchError(
            (error: HttpErrorResponse) => throwError(error)
        ));
    }

    /**
     * Get all groups icons
     */
    getIcons() {
        return groupIcons;
    }
}


