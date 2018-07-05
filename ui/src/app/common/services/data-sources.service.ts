import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/internal/operators';
import { throwError } from 'rxjs/index';

import { environment } from '../../../environments/environment';
import { DataSource } from '../models/data-source.model';
import { DataSourcesParams } from '../models/data-sources-params.model';

@Injectable({
    providedIn: 'root'
})
export class DataSourcesService {

    readonly SERVICE_PATH = '/app/data-sources';

    constructor(private httpClient: HttpClient) {
    }

    /**
     * HTTP request for get Data Source list
     * @param {DataSourcesParams} params: request parameters
     * @return {Observable<any>}
     */
    getDataSources(params: DataSourcesParams): Observable<any> {
        return this.httpClient.get(environment.BASE_URL + this.SERVICE_PATH, {params: DataSourcesService.makeHttpParams(params)})
            .pipe(catchError(
                (error: HttpErrorResponse) => throwError(error)
            ));
    }

    /**
     * Makes HttpParams
     * @param {DataSourcesParams} options
     * @return {HttpParams}
     */
    static makeHttpParams(options: DataSourcesParams): HttpParams {
        let params = new HttpParams();

        for (let option in options) {
            params = params.set(option, options[option]);
        }

        return params;
    }

    /**
     * HTTP request for get Data Source Info
     * @param id: Data Source id
     */
    getDataSourceById(id: number): Observable<any> {
        return this.httpClient.get(environment.BASE_URL + this.SERVICE_PATH + '/' + id)
            .pipe(catchError(
                (error: HttpErrorResponse) => throwError(error)
            ));
    }

    /**
     * HTTP request for create Data Source
     * @param dataSource: Data Source Info
     */
    createDataSource(dataSource: DataSource) {
        return this.httpClient.post(environment.BASE_URL + this.SERVICE_PATH, dataSource)
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
        return this.httpClient.patch(environment.BASE_URL + this.SERVICE_PATH + '/' + id, dataSource)
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
        return this.httpClient.delete(environment.BASE_URL + this.SERVICE_PATH + '/' + id)
            .pipe(catchError(
                (error: HttpErrorResponse) => throwError(error)
            ));
    }
}
