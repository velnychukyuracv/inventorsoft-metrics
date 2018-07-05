import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ChartsService {
    token: any;
    constructor(private http: HttpClient) {
        this.token = JSON.parse(localStorage.getItem('jwt.token'));
    }

    getChart() {
        let data = {
            attributes: "test",
            dataSourceDbRepId: 1, // select
            filterColumns: "test",
            groupId: 1, // select
            name: "test", // input
            order: 0, // select , input
            query: "test", // textarea/ json format
            type: "test", // select
            visibleColumns: "test" // textarea
        };
        console.log('store charts = ', environment.BASE_URL + '/app/charts');
        return this.http.post(environment.BASE_URL + '/app/charts', data,
            {
                headers: new HttpHeaders ({
                    'Content-Type': 'application/json',
                    'Authorization': this.token.jwtToken
                })
            })

    }
}
