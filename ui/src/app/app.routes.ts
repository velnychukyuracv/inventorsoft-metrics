import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DataSourcesComponent } from './data-sources/data-sources.component';

export const APP_ROUTES: Routes = [
    {
        path      : '',
        redirectTo: '/login',
        pathMatch : 'full'
    },
    {
        path     : 'login',
        component: LoginComponent
    },
    {
        path     : 'data-sources',
        component: DataSourcesComponent
    },
    {
        path      : '**',
        redirectTo: '/login'
    }

];