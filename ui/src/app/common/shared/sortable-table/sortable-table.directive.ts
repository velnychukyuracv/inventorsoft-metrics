import { Directive, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { SortService } from '../../services/sort-service.service';
import { Subscription } from 'rxjs/index';

@Directive({
    selector: '[sortable-table]'
})
export class SortableTableDirective implements OnInit, OnDestroy {

    private columnSortedSubscription: Subscription;
    @Output() sorted = new EventEmitter();

    constructor(private sortService: SortService) {
    }

    ngOnInit() {
        this.subscribeAndEmitSortChanges();
    }

    /**
     * Subscribing and emitting sort changes
     */
    subscribeAndEmitSortChanges() {
        this.columnSortedSubscription = this.sortService.columnSorted$.subscribe(event => {
            this.sorted.emit(event);
        });
    }

    ngOnDestroy() {
        this.columnSortedSubscription.unsubscribe();
    }

}