import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../common/shared/shared.module';
import { ChartsPageComponent } from './charts-page.component';
import { SortableModule } from '../common/shared/sortable.module';
import { PaginationableModule } from '../common/shared/paginationable.module';

@NgModule({
    imports     : [
        CommonModule,
        SharedModule,
        SortableModule,
        PaginationableModule
    ],
    declarations: [ChartsPageComponent],
    exports     : [ChartsPageComponent]
})
export class ChartsPageModule {
}
