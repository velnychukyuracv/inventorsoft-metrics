import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../common/shared/shared.module';
import { SortableModule } from '../common/shared/sortable.module';
import { PaginationableModule } from '../common/shared/paginationable.module';
import { SearchModule } from '../search/search.module';
import { ChartsListModule } from '../charts-list/charts-list.module';
import { ChartsPageComponent } from './charts-page.component';
import { PreviewComponent } from './preview/preview.component';

@NgModule({
    imports     : [
        CommonModule,
        SharedModule,
        SortableModule,
        PaginationableModule,
        SearchModule,
        ChartsListModule
    ],
    declarations: [ChartsPageComponent, PreviewComponent],
    exports     : [ChartsPageComponent, PreviewComponent]
})
export class ChartsPageModule {
}
