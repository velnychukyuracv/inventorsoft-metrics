import { Routes } from '@angular/router';
import { AuthGuard } from './common/services/auth-guard.service';
import { LoginComponent } from './auth/login/login.component';
import { DataSourcesComponent } from './data-sources/data-sources.component';
import { UsersComponent } from './users/users/users.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { ChartsComponent } from './charts/charts.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { ChartsPageComponent } from './charts-page/charts-page.component';
import { NoAuthLayoutComponent } from './layouts/no-auth-layout/no-auth-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

export const APP_ROUTES: Routes = [
    {
        path       : '',
        component  : AuthLayoutComponent,
        canActivate: [AuthGuard],
        children   : [
            {
                path      : '',
                redirectTo: 'users',
                pathMatch : 'full'
            },
            {
                path     : 'data-sources',
                component: DataSourcesComponent
            },
            {
                path     : 'chart-management',
                component: ChartsPageComponent
            },
            {
                path     : 'users',
                component: UsersComponent
            },
            {
                path     : 'edit-user/:id',
                component: EditUserComponent
            },
            {
                path     : 'add-user',
                component: AddUserComponent
            },
        ]
    },
    {
        path     : '',
        component: NoAuthLayoutComponent,
        children : [
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
                path     : 'forgot-password',
                component: ForgotPasswordComponent
            },
            {
                path     : 'reset-password',
                component: ResetPasswordComponent
            },
        ]
    },
    {
        path      : '**',
        redirectTo: ''
    }
];