import { Component, Input } from '@angular/core';

@Component({
    selector   : 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls  : ['./pagination.component.scss']
})
export class PaginationComponent {
    @Input() activePage: number = 0;
    @Input() totalPages: number = 1;

    constructor() {
    }

    /**
     * Get Array of number from 0 to totalPages
     * @return {number[]}
     */
    range(): number[] {
        return Array.from(Array(this.totalPages).keys());
    }
}
