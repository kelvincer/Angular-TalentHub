import { Routes } from "@angular/router";
import VacancyListComponent from "./vacancy-list.component";
import VancancyFormComponent from "./vancancy-form.component";
import VacancyDetailComponent from "./vacancy-detail.component";

const VACANCIES_ROUTES: Routes = [
    { path: '', component: VacancyListComponent },
    { path: 'new-vacancy', component: VancancyFormComponent },
    { path: ':vacancyId', component: VacancyDetailComponent },
    //{ path: ':id/editar', component: VacancyFormComponent },
];

export default VACANCIES_ROUTES