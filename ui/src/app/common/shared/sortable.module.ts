import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SortableColumnComponent } from '../../sortable-table/sortable-column/sortable-column.component';
import { SortableTableDirective } from '../../sortable-table/sortable-table.directive';
import { SortService } from '../services/sort-service.service';

@NgModule({
    imports     : [
        CommonModule,
    ],
    declarations: [
        SortableColumnComponent,
        SortableTableDirective,
    ],
    exports     : [
        SortableColumnComponent,
        SortableTableDirective,
    ],
    providers   : [
        SortService,
    ],
})
export class SortableModule {
}