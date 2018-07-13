import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/index';

import { ColumnSortedEvent } from '../models/column-sorted-event.model';

@Injectable()
export class SortService {

    private columnSortedSource = new Subject<ColumnSortedEvent>();

    constructor() {
    }

    columnSorted$ = this.columnSortedSource.asObservable();

    /**
     * Sends event to observable
     * @param {ColumnSortedEvent} event
     */
    columnSorted(event: ColumnSortedEvent) {
        this.columnSortedSource.next(event);
    }
}