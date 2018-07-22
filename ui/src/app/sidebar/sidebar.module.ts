import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsComponent } from './groups/groups.component';
import { MenuComponent } from './menu/menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../common/shared/shared.module';
import { RouterModule } from '@angular/router';
import { APP_ROUTES } from '../app.routes';

@NgModule({
    imports     : [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        RouterModule.forRoot(
            APP_ROUTES
        )
    ],
    declarations: [GroupsComponent, MenuComponent],
    exports     : [GroupsComponent, MenuComponent],
})
export class SidebarModule {
}
