import { Routes } from "@angular/router";
import { initialDashboardRouteGuard } from "./guards/initialDashboardRouteGuard";

const dashboardRoutes: Routes = [

    {
        path: ':userId',
        loadComponent: () => import('../../layout/dashboard/dashboard-layout.component'),
        children: [
            {
                path: '',
                pathMatch: 'full',
                canActivate: [initialDashboardRouteGuard],
                loadComponent: () => import("./pages/empty-page/empty.component")
            },
            {
                path: 'user-manager',
                loadComponent: () => import("./pages/user-manager-page/user-manager-page.component")
            },
            {
                path: 'visualize-report',
                loadComponent: () => import("./pages/visualize-report-page/visualize-report-page.component")
            },
            {
                path: 'manage-vacancy',
                loadComponent: () => import("./pages/user-manager-page/user-manager-page.component")
            },
            {
                path: 'vacancy',
                loadChildren: () => import("./pages/vacancy-page/vacancies.routes")
            },
            {
                path: 'candidates',
                loadChildren: () => import("./pages/candidates-list-page/candidates.routes")
            },
            {
                path: 'applications',
                loadChildren: () => import("./pages/application-page/applications.routes")
            },
            {
                path: 'my-profile',
                loadComponent: () => import("./pages/candidate-profile-page/candidate-profile.component")
            }
        ]
    }
]

export default dashboardRoutes
