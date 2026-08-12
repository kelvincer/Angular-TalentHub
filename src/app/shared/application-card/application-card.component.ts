import { Component, computed, input } from '@angular/core';
import { Application } from '../../features/dashboard/models/Application';
import { APPLICATION_STATUS_LABELS } from '../../features/dashboard/utils/label';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-application-card',
  imports: [DatePipe],
  templateUrl: './application-card.component.html',
  styleUrl: './application-card.component.css',
})
export class ApplicationCardComponent {
  application = input.required<Application>();
  vacancyTitle = input.required<string>();
  statusLabel = computed(() => APPLICATION_STATUS_LABELS[this.application().status]);
  appliedAt = computed(() => this.application().appliedAt);
}
