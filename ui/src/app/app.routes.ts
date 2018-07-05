import { Routes } from '@angular/router';
import { AuthGuard } from './common/services/auth-guard.service';
import { LoginComponent } from './auth/login/login.component';
import { DataSourcesComponent } from './data-sources/data-sources.component';
import { UsersComponent } from './users/users/users.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { ChartsPageComponent } from './charts-page/charts-page.component';

export const APP_ROUTES: Routes = [
    {
        path      : '',
        redirectTo: 'login',
        pathMatch : 'full'
    },
    {
        path     : 'login',
        component: LoginComponent
    },
    {
        path       : 'data-sources',
        component  : DataSourcesComponent,
        canActivate: [AuthGuard]
    },
    {
        path       : 'users',
        component  : UsersComponent,
        canActivate: [AuthGuard]
    },
    {
        path       : 'edit-user/:id',
        component  : EditUserComponent,
        canActivate: [AuthGuard]
    },
    {
        path       : 'add-user',
        component  : AddUserComponent,
        canActivate: [AuthGuard]
    },
    {
        path      : '**',
        redirectTo: 'login'
    },
    {
        path     : 'chart-management',
        component: ChartsPageComponent
    }
];