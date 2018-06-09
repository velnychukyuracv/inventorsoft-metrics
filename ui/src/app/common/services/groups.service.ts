import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
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

    // getGroups(): Observable<Array<Group>> {
    getGroups() {
/*        getGroups(): Observable<{content: Group[]}> {*/
       // console.log(this.authService.getToken())
        return this.httpClient.get(environment.BASE_URL + '/app/groups', {
            headers: {
                'Authorization': this.authService.getToken().jwtToken
            }

        });
    }
}


