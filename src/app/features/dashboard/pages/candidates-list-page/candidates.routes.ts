import { Routes } from "@angular/router";
import CandidateListComponent from "./candidate-list.component";
import CandidateDetailComponent from "./candidate-detail.component";
import CandidateFormComponent from "./candidate-form.component";

export const CANDIDATES_ROUTES: Routes = [
    { path: '', component: CandidateListComponent },
    { path: 'new', component: CandidateFormComponent },
    { path: ':candidateId', component: CandidateDetailComponent },
];

export default CANDIDATES_ROUTES