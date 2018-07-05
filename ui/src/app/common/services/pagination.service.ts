import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/index';
import { PAGE_NAVIGATION } from '../models/page-navigation.enum';

@Injectable({
    providedIn: 'root'
})
export class PaginationService {

    private currentPageSubject = new Subject<number | PAGE_NAVIGATION>();
    currentPage$ = this.currentPageSubject.asObservable();

    constructor() {
    }

    /**
     * Sends event to observable
     * @param {number | PAGE_NAVIGATION} event
     */
    changeCurrentPage(event: number | PAGE_NAVIGATION) {
        this.currentPageSubject.next(event);
    }
}
