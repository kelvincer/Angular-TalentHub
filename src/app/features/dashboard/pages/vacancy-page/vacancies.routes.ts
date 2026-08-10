import { Routes } from "@angular/router";
import VacancyListComponent from "./vacancy-list.component";
import VancancyFormComponent from "./vancancy-form.component";

const VACANCIES_ROUTES: Routes = [
    { path: '', component: VacancyListComponent },
    { path: 'new-vacancy', component: VancancyFormComponent },
    //{ path: ':id', component: VacancyDetailComponent },
    //{ path: ':id/editar', component: VacancyFormComponent },
];

export default VACANCIES_ROUTES