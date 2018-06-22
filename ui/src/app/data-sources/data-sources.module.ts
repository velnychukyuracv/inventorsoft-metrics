import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../common/shared/shared.module';
import { DataSourcesComponent } from './data-sources.component';

@NgModule({
    imports     : [
        CommonModule,
        SharedModule
    ],
    declarations: [DataSourcesComponent],
    exports     : [DataSourcesComponent]
})
export class DataSourcesModule {
}
