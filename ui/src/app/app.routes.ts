import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DataSourcesComponent } from './data-sources/data-sources.component';
import { ChartsComponent } from "./charts/charts.component";

export const APP_ROUTES:Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path     : 'data-sources',
        component: DataSourcesComponent
    },
    {
        path: 'charts',
        component: ChartsComponent
    },
    {
        path: '**',
        redirectTo: '/login'
    }

];