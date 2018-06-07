import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';


import { HttpClientModule } from '@angular/common/http';
import { SidebarModule } from './sidebar/sidebar.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports     : [
        BrowserModule,
        AuthModule,
        SidebarModule,
        HttpClientModule
    ],
    providers   : [],
    bootstrap   : [AppComponent]
})
export class AppModule {
}
