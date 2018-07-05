import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../common/shared/shared.module';
import { DataSourcesComponent } from './data-sources.component';
import { SortableColumnComponent } from '../sortable-table/sortable-column/sortable-column.component';
import { SortableTableDirective } from '../sortable-table/sortable-table.directive';
import { PaginationableListDirective } from '../pagination/paginationable-list.directive';
import { PaginationComponent } from '../pagination/pagination.component';
import { PaginationItemDirective } from '../pagination/pagination-item.directive';
import { PaginationService } from '../common/services/pagination.service';

@NgModule({
    imports     : [
        CommonModule,
        SharedModule
    ],
    declarations: [
        DataSourcesComponent,
        SortableColumnComponent,
        SortableTableDirective,
        PaginationComponent,
        PaginationItemDirective,
        PaginationableListDirective,
    ],
    exports     : [
        DataSourcesComponent,
    ],
    providers: [
        PaginationService,
    ]
})
export class DataSourcesModule {
}
