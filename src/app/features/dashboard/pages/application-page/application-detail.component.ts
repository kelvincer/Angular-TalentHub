import { Component, computed, inject, input, model, OnInit, signal } from '@angular/core';
import { DatePipe, KeyValuePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Application, Status } from '../../models/Application';
import { forkJoin } from 'rxjs';
import { ApplicationsService } from '../../services/ApplicationsService';
import { CandidateService } from '../../services/CandidatesService';
import { Candidate } from '../../models/Candidate';
import { VancancyService } from '../../services/VancancyService';
import { Vacancy } from '../../models/Vacancy';
import { APPLICATION_STATUS_LABELS, applicationBadge, INTERVIEW_TYPE_LABELS } from '../../utils/label';
import { UsersService } from '../../services/UsersService';
import { User } from '../../models/User';
import { FormControl, FormGroup, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { ToastService } from '../../services/ToastService';
import { InterviewService } from '../../services/InterviewService';
import { Interview, InterviewType } from '../../models/Interview';
import { InterviewCardComponent } from "../../../../shared/interview-card/interview-card.component";

@Component({
  selector: 'app-application-detail',
  imports: [RouterLink, KeyValuePipe, DatePipe, ɵInternalFormsSharedModule, ReactiveFormsModule, InterviewCardComponent],
  templateUrl: './application-detail.component.html',
  styleUrl: './application-detail.component.css',
})
export default class ApplicationDetailComponent implements OnInit {

  private route = inject(ActivatedRoute)
  private router = inject(Router)
  private applicationsService = inject(ApplicationsService)
  private candidatesService = inject(CandidateService)
  private vacanciesService = inject(VancancyService)
  private interviewsService = inject(InterviewService)
  private usersService = inject(UsersService)
  private toastService = inject(ToastService)
  readonly notes = signal('')
  readonly application = signal<Application>(undefined!)
  readonly candidate = signal<Candidate>(undefined!)
  readonly vacancy = signal<Vacancy>(undefined!)
  readonly users = signal<User[]>([])
  readonly interviews = signal<Interview[]>(undefined!)
  readonly interviewers = computed(() => this.users().filter((u) => u.role !== 'CANDIDATE'))
  readonly interviewTypeLabels = INTERVIEW_TYPE_LABELS
  readonly applicationTypeLabels = APPLICATION_STATUS_LABELS
  readonly applicationBadge = applicationBadge;
  readonly interviewForm = new FormGroup({
    type: new FormControl(null, [Validators.required]),
    dateTime: new FormControl(null, [Validators.required]),
    interviewer: new FormControl(null, [Validators.required]),
    notes: new FormControl('')
  })

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('applicationId')
    if (!id)
      return

    forkJoin({
      application: this.applicationsService.getById(id),
      users: this.usersService.getUsers()
    }).subscribe({
      next: ({ application, users }) => {

        this.application.set(application)
        this.users.set(users)

        forkJoin({
          candidate: this.candidatesService.getCandidateById(application.candidateId),
          vacancy: this.vacanciesService.getById(application.vacancyId),
          interviews: this.interviewsService.getByApplication(application.id)
        }).subscribe({
          next: ({ candidate, vacancy, interviews }) => {
            this.candidate.set(candidate)
            this.vacancy.set(vacancy)
            this.interviews.set(interviews)
          },
          error: (error) => console.log(error)
        })
      },
      error: (error) => console.log(error)
    })
  }

  saveNotes() {

    console.log("save note", this.notes())

    this.applicationsService.update(this.application().id, {
      notes: this.notes()
    }).subscribe({
      next: (data) => {
        this.application.set(data)
        console.log('save data notes')
      }
    })
  }

  onVacancyClick() {
    const id = this.usersService.currentUser()?.id
    if (!id)
      return
    this.router.navigate(['/dashboard', id, 'vacancy', this.vacancy().id])
  }

  onCandidateNameClick() {
    const id = this.usersService.currentUser()?.id
    if (!id)
      return
    this.router.navigate(['/dashboard', id, 'candidates', this.candidate().id])
  }

  onStatusChange(newStatus: string) {
    console.log(newStatus)
    this.applicationsService.update(this.application().id, { status: newStatus as Status }).subscribe({
      next: (updated) => {
        this.application.set(updated);
        this.toastService.show('Estado de la postulación actualizado.');
      },
      error: (error) => console.log(error),
    });
  }

  scheduleInterview() {
    if (this.interviewForm.invalid) {
      this.toastService.show('Completa tipo, fecha y entrevistador.', 'alert-error')
      return

    }

    const raw = this.interviewForm.getRawValue()

    this.interviewsService.create({
      applicationId: this.application().id,
      type: raw.type! as InterviewType,
      scheduledAt: new Date().toISOString(),
      status: 'PENDING',
      interviewerId: raw.interviewer!,
      notes: raw.notes ?? ''
    }).subscribe({
      next: () => {
        this.toastService.show('Entrevista Agendada', 'alert-success')
        this.interviewsService.getByApplication(this.application().id).subscribe({
          next: (data) => this.interviews.set(data),
          error: (error) => console.log(error)
        })
      },
      error: (error) => console.log(error)
    })

    console.log(this.interviewForm.getRawValue())
  }

  updateInterviews() {
    this.interviewsService.getByApplication(this.application().id).subscribe({
      next: (data) => this.interviews.set(data),
      error: (error) => console.log(error)
    })
  }
}
