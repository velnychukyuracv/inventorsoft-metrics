import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ChartsModule } from 'ng2-charts';
import  {AngularMultiSelectModule } from "angular2-multiselect-dropdown/multiselect.component";


import { APP_ROUTES } from './app.routes';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { ChartsComponent } from './charts/charts.component';
import { SpinnersComponent } from './spinners/spinners.component';
import { SpinnersService } from './spinners/spinners.service';
import { DataSourcesModule } from './data-sources/data-sources.module';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [
        AppComponent,
        SpinnersComponent,
        ChartsComponent
    ],
    imports     : [
        RouterModule.forRoot(
            APP_ROUTES
        ),
        BrowserModule,
        HttpClientModule,
        AuthModule,
        DataSourcesModule,
        ChartsModule,
        AngularMultiSelectModule,
        FormsModule,
    ],
    providers   : [
        SpinnersService,
    ],
    bootstrap   : [AppComponent]
})
export class AppModule {
}