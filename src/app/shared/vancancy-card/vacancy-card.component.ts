import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { Vacancy } from '../../features/dashboard/models/Vacancy';
import { MODALITY_LABELS } from '../../features/dashboard/utils/label';
import { DecimalPipe } from '@angular/common';
import { ApplicationsService } from '../../features/dashboard/services/ApplicationsService';
import { CandidateService } from '../../features/dashboard/services/CandidatesService';
import { Router } from '@angular/router';
import { Candidate } from '../../features/dashboard/models/Candidate';
import { NewApplication } from '../../features/dashboard/models/Application';
import { UsersService } from '../../features/dashboard/services/UsersService';
import { single } from 'rxjs';

@Component({
  selector: 'app-vacancy-card',
  imports: [DecimalPipe],
  templateUrl: './vacancy-card.component.html',
  styleUrl: './vacancy-card.component.css',
})
export class VacancyCardComponent implements OnInit {

  private applicationService = inject(ApplicationsService)
  private candidatesService = inject(CandidateService)
  private usersService = inject(UsersService)
  private readonly router = inject(Router);
  readonly userId = computed(() => this.usersService.currentUser()?.id ?? null)
  readonly candidate = signal<Candidate | null>(null)
  readonly toastVisible = signal<boolean>(false)
  readonly toastMessage = signal<string>('')
  readonly toastType = signal<'alert-success' | 'alert-error'>('alert-success')
  readonly appliedVacancyLoading = signal(false)
  vacancy = input.required<Vacancy>();
  modalityLabel = computed(() => MODALITY_LABELS[this.vacancy().modality]);
  readonly appliedVacancyIds = signal<Set<string>>(new Set())
  readonly hasApplied = computed(() => {
    return (vacancyId: string) => this.appliedVacancyIds().has(vacancyId)
  })

  ngOnInit(): void {
    const uId = this.userId()
    if (uId === null)
      return

    this.candidatesService.getCandidateByUserId(uId).subscribe({
      next: (data) => this.candidate.set(data),
      error: (error) => console.log(error)
    })

    this.getApplications()
  }

  apply(vacancy: Vacancy) {
    const candidate = this.candidate()
    if (!candidate) {
      this.showToast('Completa tu perfil para poder postular a vacantes.', 'alert-error')
      setTimeout(() => {
        this.router.navigate(['/dashboard', this.userId(), 'my-profile'])
      }, 2000)
      return
    }

    const application: NewApplication = {
      candidateId: candidate.id,
      vacancyId: vacancy.id,
      status: 'PENDING',
      notes: ''
    }

    this.applicationService.create(application).subscribe({
      next: () => {
        console.log('aplicacion creada')
        this.getApplications()
        this.showToast('Postulación enviada correctamente.', 'alert-success')
      },
      error: (error) => console.log(error)
    })
  }

  private getApplications() {
    this.appliedVacancyLoading.set(true)
    this.applicationService.getApplications().subscribe({
      next: (data) => {
        this.appliedVacancyIds.set(new Set(data.filter((v) => v.candidateId === this.candidate()?.id).map((v) => v.vacancyId)))
        this.appliedVacancyLoading.set(false)
        console.log('vacancyIds', this.appliedVacancyIds())
      },
      error: (error) => console.log(error)
    })
  }

  seeVacancyDetail() {
    this.router.navigate(['/dashboard', this.userId(), 'vacancy', this.vacancy().id])
  }

  showToast(message: string, type: 'alert-success' | 'alert-error') {
    this.toastMessage.set(message)
    this.toastType.set(type)
    this.toastVisible.set(true)
    setTimeout(() => {
      this.toastVisible.set(false)
    }, 3000)
  }
}