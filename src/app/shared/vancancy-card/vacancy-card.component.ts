import { Component, computed, input } from '@angular/core';
import { Vacancy } from '../../features/dashboard/models/Vacancy';
import { MODALITY_LABELS } from '../../features/dashboard/utils/label';

@Component({
  selector: 'app-vacancy-card',
  imports: [],
  templateUrl: './vacancy-card.component.html',
  styleUrl: './vacancy-card.component.css',
})
export class VacancyCardComponent {
  vacancy = input.required<Vacancy>();
  modalityLabel = computed(() => MODALITY_LABELS[this.vacancy().modality]);
}
