import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { APP_ROUTES } from './app.routes';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { SpinnersComponent } from './spinners/spinners.component';
import { SpinnersService } from './spinners/spinners.service';
import { DataSourcesModule } from './data-sources/data-sources.module';

import { HttpClientModule } from '@angular/common/http';
import { SidebarModule } from './sidebar/sidebar.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';



@NgModule({
    declarations: [
        AppComponent,
        SpinnersComponent
    ],
    imports     : [
        RouterModule.forRoot(
            APP_ROUTES
        ),
        BrowserModule,
        FormsModule,
        NgbModule.forRoot(),
        AuthModule,
        SidebarModule,
        HttpClientModule,
        DataSourcesModule
    ],
    providers   : [
        SpinnersService,
    ],
    bootstrap   : [AppComponent]
})
export class AppModule {
}