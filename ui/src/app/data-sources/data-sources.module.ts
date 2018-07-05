import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../common/shared/shared.module';
import { DataSourcesComponent } from './data-sources.component';
import { SortableColumnComponent } from '../sortable-table/sortable-column/sortable-column.component';
import { SortableTableDirective } from '../sortable-table/sortable-table.directive';

@NgModule({
    imports     : [
        CommonModule,
        SharedModule
    ],
    declarations: [
        DataSourcesComponent,
        SortableColumnComponent,
        SortableTableDirective,
    ],
    exports     : [
        DataSourcesComponent,
    ],
})
export class DataSourcesModule {
}
