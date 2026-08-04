import { Routes } from "@angular/router";
import { DashboardLayoutComponent } from "../../layout/dashboard/DashboardLayout.component/DashboardLayout.component";
import { UserManagerPageComponent } from "./pages/user-manager-page/user-manager-page.component/user-manager-page.component";
import { VisualizeReportPageComponent } from "./pages/visualize-report-page/visualize-report-page.component/visualize-report-page.component";
import { ManageVacancyComponent } from "./pages/manage-vancancy-page/manage-vacancy.component/manage-vacancy.component";

const dashboardRoutes: Routes = [

    {
        path: '',
        component: DashboardLayoutComponent,
        children: [
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
                path: '**',
                redirectTo: 'user-manager',
            },
        ]
    }
]

export default dashboardRoutes