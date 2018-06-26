import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ChartsService {

  constructor(private http: HttpClient) { }

  getChart() {
    console.log('store charts');
    return this.http.post(environment.BASE_URL + '/app/charts',
      {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0QGdtYWlsLmNvbSIsImV4cCI6MTUzMDAxNTg1NX0.yGic3Vl12gcU3Ui04rxiu0uGCy5EK6hxSJL0Nt7rHZvSteqAUSt495gKkmuwUMH7elbEwN5HaiYH-VESSOSt5w'
      }

    })

  }
/*{
  "attributes": "test",
  "dataSourceDbRepId": 0,
  "filterColumns": "test",
  "groupId": 0,
  "name": "test",
  "order": 0,
  "query": "test",
  "type": "test",
  "visibleColumns": "test"
},*/

}
