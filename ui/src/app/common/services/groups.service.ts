import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';
import { Group } from '../models/group.model';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { groupIcons } from '../../groupIcons';

@Injectable({
    providedIn: 'root'
})

export class GroupsService {

    constructor(private httpClient: HttpClient,
                private authService: AuthService) {
    }

    /**
     * HTTP request to get all groups
     */
    getGroups() {
        return this.httpClient.get(environment.BASE_URL + '/app/groups').pipe(catchError(
            (error: HttpErrorResponse) => throwError(error)
        ));
    }

    /**
     * HTTP request to create group
     * @param createdGroup: Group Data
     */
    createGroup(createdGroup: Group) {
        const body = {materialIcon: createdGroup.materialIcon, name: createdGroup.name};
        return this.httpClient.post(environment.BASE_URL + '/app/groups', body).pipe(catchError(
            (error: HttpErrorResponse) => throwError(error)
        ));
    }

    /**
     * HTTP request to edit group
     * @param editedGroup: Group Data
     * @param idGroup: Group id
     */
    editGroup(editedGroup: Group, idGroup: number) {
        const body = {materialIcon: editedGroup.materialIcon, name: editedGroup.name};
        return this.httpClient.patch(environment.BASE_URL + '/app/groups/' + idGroup, body).pipe(
            catchError(
                (error: HttpErrorResponse) => throwError(error)
            ));
    }

    /**
     * HTTP request to delete group
     * @param idGroup: Group id
     */
    deleteGroup(idGroup: number) {
        return this.httpClient.delete(environment.BASE_URL + '/app/groups/' + idGroup).pipe(catchError(
            (error: HttpErrorResponse) => throwError(error)
        ));
    }

    /**
     * Request to get all groups icons
     */
    getIcons() {
        return groupIcons;
    }

}


