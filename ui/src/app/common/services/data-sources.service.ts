import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/internal/operators';
import { throwError } from 'rxjs/index';

import { environment } from '../../../environments/environment';
import { DataSource } from '../models/data-source.model';
import { TableParams } from '../models/table-params.model';
import { HelperService } from './helper.service';

@Injectable({
    providedIn: 'root'
})
export class DataSourcesService {

    readonly SERVICE_PATH = '/data-sources';

    constructor(private httpClient: HttpClient) {
    }

    /**
     * HTTP request for get Data Source list
     * @param {TableParams} params: request parameters
     * @return {Observable<any>}
     */
    getDataSources(params: TableParams): Observable<any> {
        return this.httpClient.get(environment.API_URL + this.SERVICE_PATH, {params: HelperService.makeHttpParams(params)})
            .pipe(catchError(
                (error: HttpErrorResponse) => throwError(error)
            ));
    }

    /**
     * HTTP request for get Data Source Info
     * @param id: Data Source id
     */
    getDataSourceById(id: number): Observable<any> {
        return this.httpClient.get(environment.API_URL + this.SERVICE_PATH + '/' + id)
            .pipe(catchError(
                (error: HttpErrorResponse) => throwError(error)
            ));
    }

    /**
     * HTTP request for create Data Source
     * @param dataSource: Data Source Info
     */
    createDataSource(dataSource: DataSource) {
        return this.httpClient.post(environment.API_URL + this.SERVICE_PATH, dataSource)
            .pipe(catchError(
                (error: HttpErrorResponse) => throwError(error)
            ));
    }

    /**
     * HTTP request for edit Data Source
     * @param id: Data Source id
     * @param dataSource: Data Source Info
     */
    editDataSource(id: number, dataSource: DataSource) {
        return this.httpClient.patch(environment.API_URL + this.SERVICE_PATH + '/' + id, dataSource)
            .pipe(catchError(
                (error: HttpErrorResponse) => throwError(error)
            ));
    }

    /**
     * HTTP request for delete Data Source
     * @param {number} id: Data Source id
     * @return {Observable<any>}
     */
    deleteDataSource(id: number) {
        return this.httpClient.delete(environment.API_URL + this.SERVICE_PATH + '/' + id)
            .pipe(catchError(
                (error: HttpErrorResponse) => throwError(error)
            ));
    }
}
