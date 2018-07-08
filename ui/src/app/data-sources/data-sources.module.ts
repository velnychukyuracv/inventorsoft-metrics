import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../common/shared/shared.module';
import { DataSourcesComponent } from './data-sources.component';
import { PaginationableListDirective } from '../pagination/paginationable-list.directive';
import { PaginationComponent } from '../pagination/pagination.component';
import { PaginationItemDirective } from '../pagination/pagination-item.directive';
import { PaginationService } from '../common/services/pagination.service';
import { SortableModule } from '../common/shared/sortable.module';

@NgModule({
    imports     : [
        CommonModule,
        SharedModule,
        SortableModule,
    ],
    declarations: [
        DataSourcesComponent,
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
