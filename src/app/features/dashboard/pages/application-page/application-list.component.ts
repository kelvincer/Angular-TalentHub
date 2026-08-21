import { Component, computed, inject, model, OnInit, signal } from '@angular/core';
import { ApplicationsService } from '../../services/ApplicationsService';
import { Application } from '../../models/Application';
import { ApplicationCardComponent } from '../../../../shared/application-card/application-card.component';
import { VancancyService } from '../../services/VancancyService';
import { Vacancy } from '../../models/Vacancy';
import { forkJoin } from 'rxjs';
import { UsersService } from '../../services/UsersService';
import { Router, RouterLink } from '@angular/router';
import { CandidateService } from '../../services/CandidatesService';
import { ApplicationRowComponent } from "../../../../shared/application-row/application-row.component";
import { FormsModule } from '@angular/forms';
import { Candidate } from '../../models/Candidate';

@Component({
  selector: 'app-application-list',
  imports: [RouterLink, ApplicationCardComponent, ApplicationRowComponent, FormsModule],
  templateUrl: './application-list.component.html',
  styleUrl: './application-list.component.css',
})
export default class ApplicationListComponent implements OnInit {

  private router = inject(Router)
  private applicationsService = inject(ApplicationsService)
  private vacanciesService = inject(VancancyService)
  private candidatesService = inject(CandidateService)
  private userService = inject(UsersService)
  readonly myApplications = signal<Application[]>([])
  readonly staffApplications = signal<Application[]>([])
  readonly candidate = signal<Candidate | null>(null)
  readonly candidates = signal<Candidate[]>([])
  readonly vacancies = signal<Vacancy[]>([])
  readonly userId = computed(() => this.userService.currentUser()?.id)
  readonly isStaff = computed(() => this.userService.isAdmin() || this.userService.isRecruiter())
  readonly isLoading = signal(false)
  readonly search = model('')
  readonly vacancyTitle = (vacancyId: string) => {
    return this.vacancies().find((v) => v.id === vacancyId)?.title ?? ''
  }
  readonly candidateName = (candidateId: string) => {
    return this.candidates().find((c) => c.id === candidateId)?.fullName ?? 'Candidate'
  }
  readonly candidateTitle = (candidateId: string) => {
    return this.candidates().find((c) => c.id === candidateId)?.title ?? ''
  }
  readonly filteredItems = computed(() => {
    const search = this.search().toLocaleLowerCase()
    if (this.isStaff()) {
      return this.staffApplications().filter((sa) =>
        this.vacancyTitle(sa.vacancyId).toLocaleLowerCase().includes(search)
        || this.candidateName(sa.candidateId).toLocaleLowerCase().includes(search)
        || this.candidateTitle(sa.candidateId).toLocaleLowerCase().includes(search)
      )
    } else {
      return this.myApplications().filter((ma) =>
        this.vacancyTitle(ma.vacancyId).toLocaleLowerCase().includes(search)
      )
    }
  })

  ngOnInit(): void {
    this.isLoading.set(true)
    forkJoin({
      applications: this.applicationsService.getApplications(),
      vacancies: this.vacanciesService.getVacancies(),
      candidate: this.candidatesService.getCandidateByUserId(this.userService.currentUser()?.id ?? ''),
      candidates: this.candidatesService.getCandidates()
    }).subscribe({
      next: ({ applications, vacancies, candidate, candidates }) => {
        this.candidate.set(candidate)
        this.candidates.set(candidates)
        if (this.isStaff()) {
          this.staffApplications.set(applications)
        } else {
          if (candidate) {
            this.myApplications.set(applications.filter((apps) => apps.candidateId === candidate.id))
          }
        }
        this.vacancies.set(vacancies);
      },
      error: (error) => {
        console.error(error);
        this.isLoading.set(false);
      },
      complete: () => {
        this.isLoading.set(false);
      }
    })
  }

  manageApplication(applicationId: string) {
    if (!this.userId())
      return
    this.router.navigate(['/dashboard', this.userId(), 'applications', applicationId])
  }
}
