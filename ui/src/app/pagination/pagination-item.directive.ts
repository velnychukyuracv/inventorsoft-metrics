import { Directive, HostListener, Input } from '@angular/core';
import { PaginationService } from '../common/services/pagination.service';
import { PAGE_NAVIGATION } from '../common/models/page-navigation.enum';

@Directive({selector: '[pagination-item]'})

export class PaginationItemDirective {

    @Input('pagination-item') pageNumber: number | PAGE_NAVIGATION = 1;
    @Input('prev-page') prevPage: number = 1;

    constructor(private paginationService: PaginationService) {
    }

    /**
     * Click listener for change page
     */
    @HostListener('click') onClick() {
        this.paginationService.changeCurrentPage(this.pageNumber);
    }

}
