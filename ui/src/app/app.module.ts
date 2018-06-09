import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';

import { HttpClientModule } from '@angular/common/http';
import { SidebarModule } from './sidebar/sidebar.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports     : [
        BrowserModule,
        NgbModule.forRoot(),
        AuthModule,
        SidebarModule,
        HttpClientModule
    ],
    providers   : [],
    bootstrap   : [AppComponent]
})
export class AppModule {
}
