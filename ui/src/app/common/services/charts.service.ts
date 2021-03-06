import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { Chart } from '../models/chart.model';
import { TableParams } from '../models/table-params.model';
import { HelperService } from './helper.service';

@Injectable({
    providedIn: 'root'
})
export class ChartsService {

    constructor(private httpClient: HttpClient) {
    }

    /**
     * Http request for getting all Charts
     * @returns {Observable<any>}
     */
    getCharts(params: TableParams): Observable<any> {
        return this.httpClient.get(environment.API_URL + "/charts", {params: HelperService.makeHttpParams(params)})
            .pipe(
                catchError((error: HttpErrorResponse) => throwError(error))
            )
    }

    /**
     * Http request for getting one Chart by id
     * @param {number} id chart to get
     * @returns {Observable<any>}
     */
    getChartById(id: number): Observable<any> {
        return this.httpClient.get(environment.API_URL + "/charts/" + id)
            .pipe(
                catchError((error: HttpErrorResponse) => throwError(error))
            )
    }

    /**
     * Http request for getting  Charts by group id
     * @param {number} groupId charts to get
     * @returns {Observable<any>}
     */
    getChartsByGroupId(groupId: number, paginationParams):Observable<any> {
        return this.httpClient.get(environment.API_URL + '/groups/'+ groupId + '/charts', {params: HelperService.makeHttpParams(paginationParams)})
            .pipe(catchError(
                (error:HttpErrorResponse) => throwError(error)
            ));
    }

    /**
     * Http request for getting  data from data source  by data source id
     * @param {Chart} chart to show this chart
     * @returns {Observable<any>}
     */
    getDBQuery(chart):Observable<any> {
        return this.httpClient.post(environment.API_URL + '/datasource/' + chart.dataSourceDbRepId + '/query',{}, {
                params: HelperService.makeHttpParams({sql: chart.query})
            })
            .pipe(catchError(
                (error:HttpErrorResponse) => throwError(error)
            ))
    };

    /**
     * Http request for creating new chart
     * @param {Chart} chart to create
     * @returns {Observable<any>}
     */
    createChart(chart: Chart): Observable<any> {
        return this.httpClient.post(environment.API_URL + "/charts", chart)
            .pipe(
                catchError((error: HttpErrorResponse) => throwError(error))
            )
    }

    /**
     * Http request for editing some chart
     * @param {number} id chart to edit
     * @param {Chart} new chart data
     * @returns {Observable<any>}
     */
    editChart(id: number, chart: Chart): Observable<any> {
        return this.httpClient.patch(environment.API_URL + "/charts/" + id, chart)
            .pipe(
                catchError((error: HttpErrorResponse) => throwError(error))
            )
    }

    /**
     * Http for deleting some chart
     * @param {number} id chart to delete
     * @returns {Observable<any>}
     */
    deleteChart(id: number): Observable<any> {
        return this.httpClient.delete(environment.API_URL + "/charts/" + id)
            .pipe(
                catchError((error: HttpErrorResponse) => throwError(error))
            )
    }
}