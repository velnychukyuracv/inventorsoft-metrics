import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';
import { Group } from '../models/group.model';

@Injectable({
    providedIn: 'root'
})

export class GroupsService {

    constructor(private httpClient: HttpClient,
                private authService: AuthService) {
    }

    getGroups() {
        return this.httpClient.get(environment.BASE_URL + '/app/groups', {
            headers: {
                'Authorization': this.authService.getToken().jwtToken
            }

        });
    }

    addGroup(createdGroup: Group) {
        const body = {materialIcon: createdGroup.materialIcon, name: createdGroup.name};
        return this.httpClient.post(environment.BASE_URL + '/app/groups', body, {
            headers: {
                'Authorization': this.authService.getToken().jwtToken
            }
        })
    }
}


