import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { VancancyService } from '../../services/VancancyService';
import { Vacancy } from '../../models/Vacancy';
import { MODALITY_LABELS, VACANCY_STATUS_LABELS } from '../../utils/label';
import { ApplicationsService } from '../../services/ApplicationsService';
import { forkJoin } from 'rxjs';
import { CandidateService } from '../../services/CandidatesService';
import { UsersService } from '../../services/UsersService';
import { Candidate } from '../../models/Candidate';
import { NewApplication } from '../../models/Application';
import { DeleteVacancyComponent } from "./modals/delete-vacancy/delete-vacancy.component";

@Component({
  selector: 'app-vacancy-detail',
  imports: [RouterLink, DecimalPipe, DeleteVacancyComponent],
  templateUrl: './vacancy-detail.component.html',
  styleUrl: './vacancy-detail.component.css',
})
export default class VacancyDetailComponent implements OnInit {

  private route = inject(ActivatedRoute)
  private vacanciesService = inject(VancancyService)
  private applicationsService = inject(ApplicationsService)
  private candidatesService = inject(CandidateService)
  private usersService = inject(UsersService)
  private readonly router = inject(Router)
  readonly candidate = signal<Candidate | null>(null)
  readonly vacancy = signal<Vacancy | null>(null)
  readonly loading = signal<boolean>(true)
  readonly hasApplied = signal(false)
  readonly toastVisible = signal<boolean>(false)
  readonly toastMessage = signal<string>('')
  readonly isStaff = computed(() => this.usersService.isAdmin() || this.usersService.isRecruiter())
  readonly toastType = signal<'alert-success' | 'alert-error'>('alert-success')
  readonly modalityLabel = computed(() => {
    const modality = this.vacancy()?.modality
    return modality ? MODALITY_LABELS[modality] : ''
  })
  readonly statusLabel = computed(() => {
    const status = this.vacancy()?.status
    return status ? VACANCY_STATUS_LABELS[status] : ''
  })
  readonly isActive = computed(() => this.vacancy()?.status === 'ACTIVE')
  readonly openDeleteVacancyModel = signal(false)

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('vacancyId')
    if (id === null)
      return

    this.loading.set(true)
    forkJoin({
      vacancies: this.vacanciesService.getVacancies(),
      applications: this.applicationsService.getApplications(),
      candidate: this.candidatesService.getCandidateByUserId(this.usersService.currentUser()?.id ?? '')
    }).subscribe({
      next: ({ applications, vacancies, candidate }) => {
        this.vacancy.set(vacancies.find((v) => v.id === id) ?? null)
        this.candidate.set(candidate)
        this.hasApplied.set(applications.filter((v) =>
          v.vacancyId === this.vacancy()?.id && v.candidateId === candidate?.id).length !== 0)
      },
      error: (error) => {
        console.error(error);
        this.loading.set(false);
      },
      complete: () => {
        this.loading.set(false);
      }
    })
  }

  apply() {
    const candidate = this.candidate()
    if (!candidate) {
      this.showToast('Completa tu perfil para poder postular a vacantes.', 'alert-error')
      setTimeout(() => {
        this.router.navigate(['/dashboard', this.usersService.currentUser()?.id, 'my-profile'])
      }, 2000)
      return
    }

    const application: NewApplication = {
      candidateId: candidate.id,
      vacancyId: this.vacancy()?.id ?? '',
      status: 'PENDING',
      notes: ''
    }

    this.applicationsService.create(application).subscribe({
      next: () => {
        this.hasApplied.set(true)
        this.showToast('Postulación enviada correctamente.', 'alert-success')
      },
      error: (error) => console.log(error)
    })
  }

  onEdit() {
    const vacancyId = Number(this.route.snapshot.paramMap.get('vacancyId'));
    this.router.navigate(['/dashboard', this.usersService.currentUser()?.id, 'vacancy', vacancyId, 'edit'])
  }

  onDelete() {
    this.openDeleteVacancyModel.set(true)
  }

  closeDeleteVacancyModal() {
    this.openDeleteVacancyModel.set(false)
  }

  vacancyDeleted(id: string) {
    this.showToast('Vacante eliminada.', 'alert-success')
    setTimeout(() => {
      this.router.navigate(['../'], { relativeTo: this.route });
    }, 2000)
  }

  showToast(message: string, type: 'alert-success' | 'alert-error') {
    this.toastMessage.set(message)
    this.toastType.set(type)
    this.toastVisible.set(true)
    setTimeout(() => {
      this.toastVisible.set(false)
    }, 2000)
  }
}
