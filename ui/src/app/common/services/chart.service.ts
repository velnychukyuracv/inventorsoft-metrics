import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/internal/operators';
import { throwError } from 'rxjs/index';

import { environment } from '../../../environments/environment';
import { Chart } from '../models/chart.model';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor(private http: HttpClient) {
  }

  getChart(): Observable<any> {
    return this.http.get(environment.BASE_URL + `/app/charts`)
        .pipe(catchError(
            (error: HttpErrorResponse) => throwError(error)
        ));
  }

}
