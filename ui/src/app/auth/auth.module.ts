import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import { SharedModule } from '../common/shared/shared.module';

import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


@NgModule({
    imports     : [
        CommonModule,
        SharedModule,
        RouterModule
    ],
    declarations: [LoginComponent, ForgotPasswordComponent, ResetPasswordComponent],
    exports     : [LoginComponent]
})
export class AuthModule {
}