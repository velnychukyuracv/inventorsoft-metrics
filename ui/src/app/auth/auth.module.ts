import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../common/shared/shared.module';

@NgModule({
    imports     : [
        CommonModule,
        SharedModule
    ],
    declarations: [LoginComponent],
    exports     : [LoginComponent]
})
export class AuthModule {
}