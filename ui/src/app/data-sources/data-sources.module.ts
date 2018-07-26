import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../common/shared/shared.module';
import { DataSourcesComponent } from './data-sources.component';
import { SearchModule } from '../search/search.module';
import { DataSourceFormComponent } from './modal/data-source-form.component';

@NgModule({
    imports     : [
        CommonModule,
        SharedModule,
        SearchModule
    ],
    declarations: [
        DataSourcesComponent,
        DataSourceFormComponent
    ],
    exports     : [
        DataSourcesComponent,
    ],
})
export class DataSourcesModule {
}
