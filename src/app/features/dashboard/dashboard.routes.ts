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
                loadComponent: () => import("./pages/manage-vancancy-page/manage-vacancy.component")
            },
            {
                path: 'create-vacancy',
                loadComponent: () => import("./pages/create-vacancy-page/create-vacancy.component")
            },
            {
                path: 'manage-candidate',
                loadComponent: () => import("./pages/manage-candidates-page/manage-candidate.component")
            },
            {
                path: 'manage-interview',
                loadComponent: () => import("./pages/manage-interview-page/manage-interview.component")
            },
            {
                path: 'edit-profile',
                loadComponent: () => import("./pages/edit-profile-page/edit-profile.component")
            },
            {
                path: 'upload-cv',
                loadComponent: () => import("./pages/upload-cv-page/upload-cv.component")
            },
            {
                path: 'apply-vacancy',
                loadComponent: () => import("./pages/apply-vacancy-page/apply-vacancy.component")
            }
        ]
    }
]

export default dashboardRoutes
