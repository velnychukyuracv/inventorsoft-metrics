import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { Chart } from '../models/chart.model';

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
    getCharts(): Observable<any> {
        return this.httpClient.get(environment.API_URL + "/charts/")
            .pipe(
                catchError((error: HttpErrorResponse) => throwError(error + "dasd"))
            )
    }

    /**
     * Http request for getting one Chart by id
     * @param {number} id chart to get
     * @returns {Observable<any>}
     */
    getChartById(id: number): Observable<any> {
        return this.httpClient.get(environment.BASE_URL + "/charts/" + id)
            .pipe(
                catchError((error: HttpErrorResponse) => throwError(error))
            )
    }

    /**
     * Http request for creating new chart
     * @param {Chart} chart to create
     * @returns {Observable<any>}
     */
    createChart(chart: Chart): Observable<any> {
        console.log(chart);
        return this.httpClient.post(environment.BASE_URL + "/charts/", chart)
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
        return this.httpClient.patch(environment.BASE_URL + "/charts/", chart)
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
        return this.httpClient.delete(environment.BASE_URL + "/charts/" + id)
            .pipe(
                catchError((error: HttpErrorResponse) => throwError(error))
            )
    }
}
