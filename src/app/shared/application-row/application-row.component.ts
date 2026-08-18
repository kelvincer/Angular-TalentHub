import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import { Application } from '../../features/dashboard/models/Application';
import { CandidateService } from '../../features/dashboard/services/CandidatesService';
import { Candidate } from '../../features/dashboard/models/Candidate';
import { forkJoin } from 'rxjs';
import { VancancyService } from '../../features/dashboard/services/VancancyService';
import { Vacancy } from '../../features/dashboard/models/Vacancy';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'tr[app-application-row]',
  imports: [DatePipe],
  templateUrl: './application-row.component.html',
  styleUrl: './application-row.component.css',
})
export class ApplicationRowComponent implements OnInit {

  private candidateService = inject(CandidateService)
  private vacanciesService = inject(VancancyService)
  readonly application = input.required<Application>()
  readonly manageApp = output<string>()
  readonly candidates = signal<Candidate[]>([])
  readonly vacancies = signal<Vacancy[]>([])

  candidateName = (candidateId: string) => {
    return this.candidates().find((c) => c.id === candidateId)?.fullName ?? 'Candidate'
  }
  candidateTitle = (candidateId: string) => {
    return this.candidates().find((c) => c.id === candidateId)?.title ?? ''
  }
  vacancyTitle = (vacancyId: string) => {
    return this.vacancies().find((v) => v.id === vacancyId)?.title ?? ''
  }

  ngOnInit(): void {
    forkJoin({
      candidates: this.candidateService.getCandidates(),
      vacancies: this.vacanciesService.getVacancies(),
    }).subscribe({
      next: ({ candidates, vacancies }) => {
        this.candidates.set(candidates)
        this.vacancies.set(vacancies)
      },
      error: (error) => console.error(error)
    })
  }

  manageApplication(id: string) {
    this.manageApp.emit(id)
  }
}
