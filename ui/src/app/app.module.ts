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
import { UsersModule } from './users/users.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './common/shared/jwt-interceptor';
import { ChartsPageModule } from './charts-page/charts-page.module';

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
        HttpClientModule,
        AuthModule,
        DataSourcesModule,
        UsersModule,
        ChartsPageModule
    ],
    providers   : [
        SpinnersService,
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
    ],
    bootstrap   : [AppComponent]
})
export class AppModule {
}