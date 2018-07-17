import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/internal/operators';
import { throwError } from 'rxjs/index';

import { environment } from '../../../environments/environment';
import {HelperService} from "./helper.service";

@Injectable({
    providedIn: 'root'
})
export class ChartShowService {

    constructor(private http:HttpClient) {
    }


    getCharts():Observable<any> {
        return this.http.get(environment.API_URL + '/charts')
            .pipe(catchError(
                (error:HttpErrorResponse) => throwError(error)
            ));
    }

    getDBQuery(chart):Observable<any> {
        return this.http.post(environment.API_URL + '/datasource/' + chart.dataSourceDbRepId + '/query',{}, {
                params: HelperService.makeHttpParams({sql: chart.query})
            })
            .pipe(catchError(
                (error:HttpErrorResponse) => throwError(error)
            ))
    };

}
