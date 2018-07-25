import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { APP_ROUTES } from './app.routes';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { DataSourcesModule } from './data-sources/data-sources.module';
import { ChartsListModule } from './charts-list/charts-list.module';
import { SpinnersComponent } from './spinners/spinners.component';
import { SpinnersService } from './spinners/spinners.service';

import { SharedModule } from './common/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { SidebarModule } from './sidebar/sidebar.module';
import { FormsModule } from '@angular/forms';
import { UsersModule } from './users/users.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderModule } from './header/header.module';
import { ChartsPageModule } from './charts-page/charts-page.module';
import { NotificationComponent } from './notification/notification.component';
import { SearchModule } from './search/search.module';
import { NotificationService } from './common/services/notification.service';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { NoAuthLayoutComponent } from './layouts/no-auth-layout/no-auth-layout.component';
import { JwtInterceptor } from './auth/jwt-interceptor';

@NgModule({
    declarations: [
        AuthLayoutComponent,
        NoAuthLayoutComponent,
        AppComponent,
        SpinnersComponent,
        NotificationComponent
    ],
    imports     : [
        RouterModule.forRoot(
            APP_ROUTES
        ),
        BrowserModule,
        FormsModule,
        AuthModule,
        SidebarModule,
        HttpClientModule,
        DataSourcesModule,
        UsersModule,
        ChartsListModule,
        SharedModule,
        HeaderModule,
        ChartsPageModule,
        SearchModule,
    ],
    exports     : [RouterModule],
    providers   : [
        SpinnersService,
        NotificationService,
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
    ],
    bootstrap   : [AppComponent]
})
export class AppModule {
}