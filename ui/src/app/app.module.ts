import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { APP_ROUTES } from './app.routes';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { DataSourcesModule } from './data-sources/data-sources.module';
import { ChartsModule } from './charts/charts.module';
import { SpinnersComponent } from './spinners/spinners.component';
import { SpinnersService } from './spinners/spinners.service';


@NgModule({
    declarations: [
        AppComponent,
        SpinnersComponent,
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
        FormsModule,
    ],
    providers   : [
        SpinnersService,
    ],
    bootstrap   : [AppComponent]
})
export class AppModule {
}