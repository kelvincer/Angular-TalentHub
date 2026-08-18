import { Routes } from "@angular/router";
import ApplicationDetailComponent from "./application-detail.component";
import ApplicationListComponent from "./application-list.component";

const APPLICATIONS_ROUTES: Routes = [
    { path: '', component: ApplicationListComponent },
    { path: ':applicationId', component: ApplicationDetailComponent },
];

export default APPLICATIONS_ROUTES