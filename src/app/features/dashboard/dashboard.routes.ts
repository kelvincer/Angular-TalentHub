import { Routes } from "@angular/router";
import { DashboardLayoutComponent } from "../../layout/dashboard/DashboardLayout.component/DashboardLayout.component";
import { initialDashboardRouteGuard } from "./guards/initialDashboardRouteGuard";

const dashboardRoutes: Routes = [

    {
        path: ':userId',
        component: DashboardLayoutComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                canActivate: [initialDashboardRouteGuard],
                loadComponent: () => import("./pages/empty-page/Empty.component/Empty.component")
            },
            {
                path: 'user-manager',
                loadComponent: () => import("./pages/user-manager-page/user-manager-page.component/user-manager-page.component")
            },
            {
                path: 'visualize-report',
                loadComponent: () => import("./pages/visualize-report-page/visualize-report-page.component/visualize-report-page.component")
            },
            {
                path: 'manage-vacancy',
                loadComponent: () => import("./pages/manage-vancancy-page/manage-vacancy.component/manage-vacancy.component")
            },
            {
                path: 'create-vacancy',
                loadComponent: () => import("./pages/create-vacancy-page/CreateVacancy.component/CreateVacancy.component")
            },
            {
                path: 'manage-candidate',
                loadComponent: () => import("./pages/manage-candidates-page/ManageCandidate.component/ManageCandidate.component")
            },
            {
                path: 'manage-interview',
                loadComponent: () => import("./pages/manage-interview-page/ManageInterview.component/ManageInterview.component")
            },
            {
                path: 'edit-profile',
                loadComponent: () => import("./pages/edit-profile-page/EditProfile.component/EditProfile.component")
            },
            {
                path: 'upload-cv',
                loadComponent: () => import("./pages/upload-cv-page/UploadCV.component/UploadCV.component")
            },
            {
                path: 'apply-vacancy',
                loadComponent: () => import("./pages/apply-vacancy-page/ApplyVacancy.component/ApplyVacancy.component")
            }
        ]
    }
]

export default dashboardRoutes
