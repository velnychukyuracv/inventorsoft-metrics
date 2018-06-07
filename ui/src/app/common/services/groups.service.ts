import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export interface Group {
    id: number
    materialIcon: string
    name: string
    createAt: Date
    updatedAt: Date
    order: number
    uuid: string
}

export class GroupsService {

    constructor(private httpClient: HttpClient) {
    }

    getGroups(): Observable<any> {
        return this.httpClient.get(environment.BASE_URL + '/app/groups')
    }
}
