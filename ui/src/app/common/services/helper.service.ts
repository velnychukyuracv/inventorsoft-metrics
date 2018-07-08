import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class HelperService {

    constructor() {
    }

    /**
     * Makes HttpParams
     * @param {{}} options
     * @return {HttpParams}
     */
    static makeHttpParams(options: {}): HttpParams {
        let params = new HttpParams();

        for (let option in options) {
            params = params.set(option, options[option]);
        }

        return params;
    }
}