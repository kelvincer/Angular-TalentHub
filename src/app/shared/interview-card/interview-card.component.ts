import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import { Interview, InterviewStatus } from '../../features/dashboard/models/Interview';
import { INTERVIEW_STATUS_LABELS, INTERVIEW_TYPE_LABELS, interviewBadge } from '../../features/dashboard/utils/label';
import { DatePipe } from '@angular/common';
import { UsersService } from '../../features/dashboard/services/UsersService';
import { forkJoin } from 'rxjs';
import { User } from '../../features/dashboard/models/User';
import { InterviewService } from '../../features/dashboard/services/InterviewService';
import { ToastService } from '../../features/dashboard/services/ToastService';

@Component({
  selector: 'app-interview-card',
  imports: [DatePipe],
  templateUrl: './interview-card.component.html',
  styleUrl: './interview-card.component.css',
})
export class InterviewCardComponent implements OnInit {

  private usersService = inject(UsersService)
  private interviewsService = inject(InterviewService)
  private toastService = inject(ToastService)
  readonly interview = input.required<Interview>()
  readonly updateInterview = output<void>()
  readonly users = signal<User[]>([])
  readonly typeOptions = INTERVIEW_TYPE_LABELS
  readonly interviewBadge = interviewBadge
  readonly interviewStatusOptions = INTERVIEW_STATUS_LABELS;
  readonly interviewerName = (id: string) =>
    this.users().find((u) => u.id === id)?.name ?? `Usuario ${id}`;

  ngOnInit(): void {
    forkJoin({
      users: this.usersService.getUsers(),
    }).subscribe({
      next: ({ users }) => {
        this.users.set(users)
      }
    })
  }

  setInterviewStatus(interview: Interview, status: InterviewStatus): void {
    this.interviewsService.update(interview.id, { status }).subscribe({
      next: (updated) => {
        this.toastService.show('Entrevista actualizada.');
        this.updateInterview.emit()
      },
      error: (error) => console.log(error),
    });
  }

  deleteInterview(interview: Interview) {
    if (!window.confirm('¿Eliminar esta entrevista?')) return
    this.interviewsService.remove(interview.id).subscribe({
      next: () => {
        this.toastService.show('Entrevista eliminada.')
         this.updateInterview.emit()
      },
      error: (error) => console.log(error)
    });
  }
}
