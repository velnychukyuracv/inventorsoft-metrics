import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { SharedModule } from '../common/shared/shared.module';
import { RouterModule } from '@angular/router';
import { APP_ROUTES } from '../app.routes';
import { SearchModule } from '../search/search.module';
import { ModalsComponent } from './modals/modals.component';

@NgModule({
    imports     : [
        CommonModule,
        SharedModule,
        RouterModule.forRoot(
            APP_ROUTES
        ),
        SearchModule
    ],
    declarations: [UsersComponent, ModalsComponent]
})
export class UsersModule {
}
