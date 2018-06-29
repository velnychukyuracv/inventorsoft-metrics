import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { CreateGroupComponent } from './sidebar/create-group/create-group.component';

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
        path     : 'add-group',
        component: CreateGroupComponent
    },
    {
        path      : '**',
        redirectTo: '/login'
    }
];