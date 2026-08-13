import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ApplicationsService } from '../../services/ApplicationsService';
import { Application } from '../../models/Application';
import { ApplicationCardComponent } from '../../../../shared/application-card/application-card.component';
import { VancancyService } from '../../services/VancancyService';
import { Vacancy } from '../../models/Vacancy';
import { forkJoin } from 'rxjs';
import { UsersService } from '../../services/UsersService';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-application.component',
  imports: [ApplicationCardComponent, RouterLink],
  templateUrl: './application.component.html',
  styleUrl: './application.component.css',
})
export default class ApplicationComponent implements OnInit {

  private applicationsService = inject(ApplicationsService)
  private vacanciesService = inject(VancancyService)
  private userService = inject(UsersService)
  readonly applications = signal<Application[]>([])
  readonly vacancies = signal<Vacancy[]>([])
  readonly loadingSignal = signal<boolean>(false)
  readonly userId = computed(() => this.userService.currentUser()?.id)
  readonly vacancyTitle = (vacancyId: String) => this.vacancies().find((v) => v.id === vacancyId)?.title ?? ''

  ngOnInit(): void {
    this.loadingSignal.set(true)
    forkJoin({
      applications: this.applicationsService.getApplications(),
      vacancies: this.vacanciesService.getVacancies()
    }).subscribe({
      next: ({ applications, vacancies }) => {
        this.applications.set(applications.filter((apps) => apps.candidateId === this.userService.currentUser()?.id));
        this.vacancies.set(vacancies);
      },
      error: (error) => {
        console.error(error);
        this.loadingSignal.set(false);
      },
      complete: () => {
        this.loadingSignal.set(false);
      }
    })
  }

}
