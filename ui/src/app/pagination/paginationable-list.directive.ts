import { Directive, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs/index';
import { PaginationService } from '../common/services/pagination.service';

@Directive({
    selector: '[paginationable-list]'
})
export class PaginationableListDirective implements OnInit, OnDestroy {

    @Output() pageChanged = new EventEmitter();
    private paginationItemSubscription: Subscription;

    constructor(private paginationService: PaginationService) {
    }

    ngOnInit() {
        this.subscribeAndEmitCurrentPageChanges();
    }

    /** subscribing and emitting changes of current page
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