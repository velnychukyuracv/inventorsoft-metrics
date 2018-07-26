import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationableListDirective } from './paginationable-list.directive';
import { PaginationComponent } from './pagination.component';
import { PaginationItemDirective } from './pagination-item.directive';
import { PaginationService } from '../../services/pagination.service';

@NgModule({
    imports     : [
        CommonModule,
    ],
    declarations: [
        PaginationComponent,
        PaginationItemDirective,
        PaginationableListDirective,
    ],
    exports     : [
        PaginationComponent,
        PaginationItemDirective,
        PaginationableListDirective,
    ],
    providers   : [
        PaginationService,
    ]
})
export class PaginationableModule {
}