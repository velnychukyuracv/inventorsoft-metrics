import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../common/shared/shared.module';

import { HeaderComponent } from './header/header.component';

@NgModule({
    imports     : [
        CommonModule,
        SharedModule
    ],
    declarations: [HeaderComponent],
    exports     : [HeaderComponent]
})
export class HeaderModule {
}
