import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';
import { Group } from '../models/group.model';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
    providedIn: 'root'
})

export class GroupsService {

    constructor(private httpClient: HttpClient,
                private authService: AuthService) {
    }

    getGroups() {
        console.log('get group');
        return this.httpClient.get(environment.BASE_URL + '/app/groups?pageSize=100', {
            headers: {
                'Authorization': this.authService.getToken().jwtToken
            }

        }).pipe(catchError(
            (error: HttpErrorResponse) => throwError(error)
        ));

    }

    addGroup(createdGroup: Group) {
        const body = {materialIcon: createdGroup.materialIcon, name: createdGroup.name};
        return this.httpClient.post(environment.BASE_URL + '/app/groups', body, {
            headers: {
                'Authorization': this.authService.getToken().jwtToken
            }
        }).pipe(catchError(
            (error: HttpErrorResponse) => throwError(error)
        ));
    }

    deleteGroup(id: number) {
        return this.httpClient.delete(environment.BASE_URL + '/app/groups' + '/' + id)
            .pipe(catchError(
                (error: HttpErrorResponse) => throwError(error)
            ));
    }
}


