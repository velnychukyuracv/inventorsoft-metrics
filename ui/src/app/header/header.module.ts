import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../common/shared/shared.module';

import { HeaderComponent } from './header/header.component';
import { SidebarModule } from '../sidebar/sidebar.module';

@NgModule({
    imports     : [
        CommonModule,
        SharedModule,
        SidebarModule
    ],
    declarations: [HeaderComponent],
    exports     : [HeaderComponent]
})
export class HeaderModule {
}
