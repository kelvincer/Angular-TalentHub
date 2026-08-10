import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { VancancyService } from '../../services/VancancyService';
import { Vacancy } from '../../models/Vacancy';
import { DatePipe } from '@angular/common';
import { ApplicationsService } from '../../services/ApplicationsService';
import { Application } from '../../models/Application';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-vacancy-list.component',
  imports: [DatePipe, RouterLink],
  templateUrl: './vacancy-list.component.html',
  styleUrl: './vacancy-list.component.css',
})
export default class VacancyListComponent implements OnInit {

  private vacanciesService = inject(VancancyService)
  private applicationsService = inject(ApplicationsService)
  readonly vacancies = signal<Vacancy[]>([])
  readonly applications = signal<Application[]>([])
  readonly applicantCount = (vacancyId: string) => {
    return this.applications().filter((v) => v.vacancyId === vacancyId).length
  }

  ngOnInit(): void {
    this.vacanciesService.getVacancies().subscribe({
      next: (data) => this.vacancies.set(data),
      error: (error) => console.log(error)
    })

    this.applicationsService.getApplications().subscribe({
      next: (data) => this.applications.set(data),
      error: (error) => console.log(error)
    })
  }



}
