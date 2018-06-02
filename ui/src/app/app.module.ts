import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AuthModule } from "./auth/auth.module";
import { AuthService } from "./common/services/auth.service";
import { AuthGuardService } from "./common/services/auth-guard.service";

import { HttpClientModule } from "@angular/common/http";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports     : [
        BrowserModule,
        AuthModule,
        HttpClientModule
    ],
    providers   : [
        AuthService,
        AuthGuardService
    ],
    bootstrap   : [AppComponent]
})
export class AppModule {
}
