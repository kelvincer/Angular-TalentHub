import { Component, computed, inject, input } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { Vacancy } from '../../features/dashboard/models/Vacancy';
import { MODALITY_LABELS } from '../../features/dashboard/utils/label';
import { Router } from '@angular/router';
import { UsersService } from '../../features/dashboard/services/UsersService';

@Component({
  selector: 'tr[app-vacancy-row]',
  imports: [DatePipe, DecimalPipe],
  templateUrl: './vacancy-row.component.html',
  styleUrl: './vacancy-row.component.css',
})
export class VacancyRowComponent {

  private readonly router = inject(Router)
  private usersService = inject(UsersService)
  vacancy = input.required<Vacancy>();
  applicantCount = input(0);
  modalityLabel = computed(() => MODALITY_LABELS[this.vacancy().modality]);

  seeVacancyDetail() {
    const userId = this.usersService.currentUser()?.id

    if (!userId)
      return

    this.router.navigate(['/dashboard', userId, 'vacancy', this.vacancy().id])
  }
}
