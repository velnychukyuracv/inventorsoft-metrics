import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

import { environment } from '../../../environments/environment';
import { DataSource } from '../models/data-source.model';

@Injectable({
    providedIn: 'root'
})
export class DataSourcesService {

    readonly SERVICE_PATH = '/app/data-sources';

    constructor(private httpClient: HttpClient) {
    }

    /** HTTP request for get Data Source list
     */
    getDataSources(): Observable<any> {
        return this.httpClient.get(environment.BASE_URL + this.SERVICE_PATH);
    }

    /* *HTTP request for get Data Source Info
     * @param id: Data Source id
     */
    getDataSourceById(id: number): Observable<any> {
        return this.httpClient.get(environment.BASE_URL + this.SERVICE_PATH + '/' + id);
    }

    /** HTTP request for create Data Source
     * @param dataSource: Data Source Info
     */
    createDataSource(dataSource: DataSource) {
        return this.httpClient.post(environment.BASE_URL + this.SERVICE_PATH, dataSource);
    }

    /** HTTP request for edit Data Source
     * @param id: Data Source id
     * @param dataSource: Data Source Info
     */
    editDataSource(id: number, dataSource: DataSource) {
        return this.httpClient.patch(environment.BASE_URL + this.SERVICE_PATH + '/' + id, dataSource);
    }
}
