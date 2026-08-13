import { Routes } from '@angular/router';
import { AuthComponent } from './features/auth/auth.component';
import { authGuard } from './features/auth/guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: AuthComponent
    },
    {
        path: 'dashboard',
        canActivate: [authGuard],
        loadChildren: () => import('./features/dashboard/dashboard.routes')
    },
    {
        path: '**',
        redirectTo: '',
    },
];
