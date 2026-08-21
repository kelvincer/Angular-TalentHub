import { Routes } from "@angular/router";
import { roleGuard } from "./guards/role.guard";

const dashboardRoutes: Routes = [
    {
        path: ':userId',
        loadComponent: () => import('../../layout/dashboard/dashboard-layout.component'),
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'vacancy' },
            {
                path: 'visualize-report',
                canActivate: [roleGuard(['ADMIN'])],
                loadComponent: () => import("./pages/visualize-report-page/visualize-report-page.component")
            },
            {
                path: 'manage-user',
                canActivate: [roleGuard(['ADMIN'])],
                loadComponent: () => import("./pages/user-manager-page/user-manager-page.component")
            },
            {
                path: 'vacancy',
                canActivate: [roleGuard(['ADMIN', 'RECRUITER', 'CANDIDATE'])],
                loadChildren: () => import("./pages/vacancy-page/vacancies.routes")
            },
            {
                path: 'candidates',
                canActivate: [roleGuard(['ADMIN', 'RECRUITER'])],
                loadChildren: () => import("./pages/candidates-list-page/candidates.routes")
            },
            {
                path: 'applications',
                canActivate: [roleGuard(['ADMIN', 'RECRUITER', 'CANDIDATE'])],
                loadChildren: () => import("./pages/application-page/applications.routes")
            },
            {
                path: 'my-profile',
                canActivate: [roleGuard(['CANDIDATE'])],
                loadComponent: () => import("./pages/candidate-profile-page/candidate-profile.component")
            },
            { path: '**', redirectTo: 'vacancy' }
        ]
    }
]

export default dashboardRoutes
