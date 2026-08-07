import { Routes } from "@angular/router";
import { DashboardLayoutComponent } from "../../layout/dashboard/DashboardLayout.component/DashboardLayout.component";
import { UserManagerPageComponent } from "./pages/user-manager-page/user-manager-page.component/user-manager-page.component";
import { VisualizeReportPageComponent } from "./pages/visualize-report-page/visualize-report-page.component/visualize-report-page.component";
import { ManageVacancyComponent } from "./pages/manage-vancancy-page/manage-vacancy.component/manage-vacancy.component";
import { CreateVacancyComponent } from "./pages/create-vacancy-page/CreateVacancy.component/CreateVacancy.component";
import { ManageInterviewComponent } from "./pages/manage-interview-page/ManageInterview.component/ManageInterview.component";
import { initialDashboardRouteGuard } from "./guards/initialDashboardRouteGuard";
import { EditProfileComponent } from "./pages/edit-profile-page/EditProfile.component/EditProfile.component";
import { UploadCVComponent } from "./pages/upload-cv-page/UploadCV.component/UploadCV.component";
import { ApplyVacancyComponent } from "./pages/apply-vacancy-page/ApplyVacancy.component/ApplyVacancy.component";
import { EmptyComponent } from "./pages/empty-page/Empty.component/Empty.component";

const dashboardRoutes: Routes = [

    {
        path: ':userId',
        component: DashboardLayoutComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                canActivate: [initialDashboardRouteGuard],
                component: EmptyComponent
            },
            {
                path: 'user-manager',
                component: UserManagerPageComponent
            },
            {
                path: 'visualize-report',
                component: VisualizeReportPageComponent
            },
            {
                path: 'manage-vacancy',
                component: ManageVacancyComponent
            },
            {
                path: 'create-vacancy',
                component: CreateVacancyComponent
            },
            {
                path: 'manage-vacancy',
                component: ManageVacancyComponent
            },
            {
                path: 'manage-interview',
                component: ManageInterviewComponent
            },
            {
                path: 'edit-profile',
                component: EditProfileComponent
            },
            {
                path: 'upload-cv',
                component: UploadCVComponent
            },
            {
                path: 'apply-vacancy',
                component: ApplyVacancyComponent
            }
            /*  {
                 path: '**',
                 redirectTo: 'user-manager',
             }, */
        ]
    }
]

export default dashboardRoutes