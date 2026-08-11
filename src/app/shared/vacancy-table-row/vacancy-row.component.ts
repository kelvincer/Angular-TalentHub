import { Component, computed, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Vacancy } from '../../features/dashboard/models/Vacancy';
import { MODALITY_LABELS } from '../../features/dashboard/utils/label';

@Component({
  selector: 'tr[app-vacancy-row]',
  imports: [DatePipe],
  templateUrl: './vacancy-row.component.html',
  styleUrl: './vacancy-row.component.css',
})
export class VacancyRowComponent {
  vacancy = input.required<Vacancy>();
  applicantCount = input(0);
  modalityLabel = computed(() => MODALITY_LABELS[this.vacancy().modality]);
}
