import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';

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
        path      : '**',
        redirectTo: '/login'
    }
];