import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { GroupsComponent } from './sidebar/menu/groups/groups.component';

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
        component: GroupsComponent
    },
    {
        path      : '**',
        redirectTo: '/login'
    }
];