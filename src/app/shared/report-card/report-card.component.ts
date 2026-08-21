import { Component, input } from '@angular/core';
import { Information } from '../../features/dashboard/models/ReportData';

@Component({
  selector: 'app-report-card',
  templateUrl: './report-card.component.html',
  styleUrl: './report-card.component.css',
})
export class ReportCardComponent {

  readonly data = input.required<Information>()
}
