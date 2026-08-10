import { Component } from '@angular/core';
import { KeyValuePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MODALITY_LABELS, VACANCY_STATUS_LABELS } from '../../utils/label';
import { Modality, VacancyStatus } from '../../models/Vacancy';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-vancancy-form.component',
  imports: [KeyValuePipe, RouterLink, ReactiveFormsModule],
  templateUrl: './vancancy-form.component.html',
  styleUrl: './vancancy-form.component.css',
})
export default class VancancyFormComponent {
  readonly modalityLabels = MODALITY_LABELS
  readonly vacancyLabels = VACANCY_STATUS_LABELS
  readonly createVacancyForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(4)]),
    description: new FormControl('', Validators.required),
    requirements: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    modality: new FormControl<Modality | string>('Selecciona una modalidad', Validators.required),
    department: new FormControl('', Validators.required),
    salaryMin: new FormControl(null),
    salaryMax: new FormControl(null),
    status: new FormControl<VacancyStatus | string>('Selecciona un estado', Validators.required),
  })

  submit() {
    console.log("title", this.createVacancyForm.value.title)
  }
}
