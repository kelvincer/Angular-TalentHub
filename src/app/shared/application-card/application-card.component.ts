import { Component, computed, inject, input } from '@angular/core';
import { Application } from '../../features/dashboard/models/Application';
import { APPLICATION_STATUS_LABELS } from '../../features/dashboard/utils/label';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { UsersService } from '../../features/dashboard/services/UsersService';

@Component({
  selector: 'app-application-card',
  imports: [DatePipe],
  templateUrl: './application-card.component.html',
  styleUrl: './application-card.component.css',
})
export class ApplicationCardComponent {

  private readonly router = inject(Router);
  private userService = inject(UsersService)
  application = input.required<Application>();
  vacancyTitle = input.required<string>();
  vacancyId = input.required<string>()
  statusLabel = computed(() => APPLICATION_STATUS_LABELS[this.application().status]);
  appliedAt = computed(() => this.application().appliedAt);

  seeVacancyDetail() {

    const userId = this.userService.currentUser()?.id
    if (!userId)
      return

    this.router.navigate(['/dashboard', userId, 'vacancy', this.vacancyId()])
  }
}
