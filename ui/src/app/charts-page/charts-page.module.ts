import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../common/shared/shared.module';
import { ChartsPageComponent } from './charts-page.component';
import { SortableModule } from '../common/shared/sortable.module';
import { PaginationableModule } from '../common/shared/paginationable.module';
import { SearchModule} from '../search/search.module';
import { ChartsModule } from '../charts/charts.module';



@NgModule({
    imports     : [
        CommonModule,
        SharedModule,
        SortableModule,
        PaginationableModule,
        SearchModule,
        ChartsModule
    ],
    declarations: [ChartsPageComponent],
    exports     : [ChartsPageComponent]
})
export class ChartsPageModule {
}
