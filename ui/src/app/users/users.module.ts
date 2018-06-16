import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { AddUserComponent } from './add-user/add-user.component';
import {SharedModule} from '../common/shared/shared.module';

@NgModule({
    imports     : [
        CommonModule,
        SharedModule
    ],
    declarations: [UsersComponent, EditUserComponent, AddUserComponent]
})
export class UsersModule {
}
