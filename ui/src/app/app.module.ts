import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { APP_ROUTES } from './app.routes';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { SpinnersComponent } from './spinners/spinners.component';
import { SpinnersService } from './spinners/spinners.service';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [
        AppComponent,
        SpinnersComponent
    ],
    imports: [
        RouterModule.forRoot(
            APP_ROUTES
        ),
        BrowserModule,
        AuthModule,
        HttpClientModule
    ],
    providers: [
        SpinnersService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}