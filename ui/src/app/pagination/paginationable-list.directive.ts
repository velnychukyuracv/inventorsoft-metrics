import { Directive, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs/index';
import { PaginationService } from '../common/services/pagination.service';
import { PAGE_NAVIGATION } from '../common/models/page-navigation.enum';

@Directive({
    selector: '[paginationable-list]'
})
export class PaginationableListDirective implements OnInit, OnDestroy {

    @Output() pageChanged: EventEmitter<number | PAGE_NAVIGATION> = new EventEmitter();
    private paginationItemSubscription: Subscription;

    constructor(private paginationService: PaginationService) {
    }

    ngOnInit() {
        this.subscribeAndEmitCurrentPageChanges();
    }

    /**
     * Subscribing and emitting changes of current page
     */
    subscribeAndEmitCurrentPageChanges() {
        this.paginationItemSubscription = this.paginationService.currentPage$.subscribe(event => {
            this.pageChanged.emit(event);
        });
    }

    ngOnDestroy() {
        this.paginationItemSubscription.unsubscribe();
    }

}