import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/index';

import { SortService } from '../../../services/sort-service.service';

@Component({
    selector   : '[sortable-column]',
    templateUrl: './sortable-column.component.html',
    styleUrls  : ['./sortable-column.component.scss']
})
export class SortableColumnComponent implements OnInit, OnDestroy {

    private columnSortedSubscription: Subscription;

    constructor(private sortService: SortService) {
    }

    ngOnInit() {
        this.subscribeSortChanges();
    }

    /**
     * Subscribing to sort changes
     */
    subscribeSortChanges() {
        this.columnSortedSubscription = this.sortService.columnSorted$.subscribe(event => {
            // reset this column's sort direction to hide the sort icons
            if (this.columnName !== event.sortBy) {
                this.sortDirection = '';
            }
        });
    }

    @Input('sortable-column') columnName: string;

    @Input('sort-direction') sortDirection: string = '';

    /**
     * Click listener for sorting table data
     */
    @HostListener('click') sort() {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        this.sortService.columnSorted({sortBy: this.columnName, direction: this.sortDirection});
    }

    ngOnDestroy() {
        this.columnSortedSubscription.unsubscribe();
    }

}
