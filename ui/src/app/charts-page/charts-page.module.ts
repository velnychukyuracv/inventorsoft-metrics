import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../common/shared/shared.module';
import { ChartsPageComponent } from './charts-page.component';

@NgModule({
    imports     : [
        CommonModule,
        SharedModule
    ],
    declarations: [ChartsPageComponent]
})
export class ChartsPageModule {
}
