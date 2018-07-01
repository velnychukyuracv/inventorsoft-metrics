import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';
import { Group } from '../models/group.model';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { groupIcons } from '../models/groupIcons';

@Injectable({
    providedIn: 'root'
})

export class GroupsService {

    constructor(private httpClient: HttpClient,
                private authService: AuthService) {
    }

    editedGroupInfo: Group;

    /**
     * HTTP request to get all groups
     */

    getGroups() {
        console.log('get group');
        return this.httpClient.get(environment.BASE_URL + '/app/groups', {
            headers: {
                'Authorization': this.authService.getToken().jwtToken
            }
        }).pipe(catchError(
            (error: HttpErrorResponse) => throwError(error)
        ));
    }

    /**
     * HTTP request to create Group
     * @param createdGroup: Group Info
     */

    createGroup(createdGroup: Group) {
        const body = {materialIcon: createdGroup.materialIcon, name: createdGroup.name};
        return this.httpClient.post(environment.BASE_URL + '/app/groups', body, {
            headers: {
                'Authorization': this.authService.getToken().jwtToken
            }
        }).pipe(catchError(
            (error: HttpErrorResponse) => throwError(error)
        ));
    }

    /**
     * HTTP request to edit Group
     * @param editedGroup: Group Info
     * @param idGroup: Group id
     */

    editGroup(editedGroup: Group, idGroup: number) {
        console.log(idGroup);
        const body = {materialIcon: editedGroup.materialIcon, name: editedGroup.name};
        return this.httpClient.patch(environment.BASE_URL + '/app/groups/' + idGroup, body, {
            headers: {
                'Authorization': this.authService.getToken().jwtToken
            }
        }).pipe(
            catchError(
                (error: HttpErrorResponse) => throwError(error)
            ));
    }

    /**
     * HTTP request to delete Group
     * @param idGroup: Group id
     */

    deleteGroup(idGroup: number) {
        return this.httpClient.delete(environment.BASE_URL + '/app/groups/' + idGroup, {
            headers: {
                'Authorization': this.authService.getToken().jwtToken
            }
        }).pipe(catchError(
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


