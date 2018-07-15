import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
    providedIn: 'root'
})
export class SearchService {

    private searchSource = new Subject<string>();
    search$ = this.searchSource.asObservable();

    constructor() {
    }

    /**
     * Sends event to observable
     * @param {string} query
     */
    makeSearch(query: string) {
        this.searchSource.next(query);
    }
}
