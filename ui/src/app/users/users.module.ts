import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { AddUserComponent } from './add-user/add-user.component';
import {SharedModule} from '../common/shared/shared.module';

import { RouterModule } from '@angular/router';
import { APP_ROUTES } from '../app.routes';

@NgModule({
    imports     : [
        CommonModule,
        SharedModule,
        RouterModule.forRoot(
            APP_ROUTES
        )
    ],
    declarations: [UsersComponent, EditUserComponent, AddUserComponent]
})
export class UsersModule {
}
