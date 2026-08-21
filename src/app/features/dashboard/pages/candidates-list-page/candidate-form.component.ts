import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CandidateService } from '../../services/CandidatesService';
import { UsersService } from '../../services/UsersService';
import { Candidate } from '../../models/Candidate';
import { ToastService } from '../../services/ToastService';

@Component({
  selector: 'app-candidate-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './candidate-form.component.html',
  styleUrl: './candidate-form.component.css',
})
export default class CandidateFormComponent {

  private candidateService = inject(CandidateService)
  private usersService = inject(UsersService)
  private toastService = inject(ToastService)
  private readonly router = inject(Router)
  readonly candidateForm = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl(''),
    location: new FormControl(''),
    title: new FormControl(''),
    summary: new FormControl(''),
    skills: new FormControl(''),
    yearsExperience: new FormControl<number | null>(null),
    education: new FormControl(''),
  })

  submit() {
    if (this.candidateForm.invalid) {
      this.toastService.show('Completa los campos obligatorios.', 'alert-error')
      return
    }

    const candidate: Candidate = {
      id: '',
      userId: null,
      fullName: this.candidateForm.value.fullName ?? '',
      email: this.candidateForm.value.email ?? '',
      phone: this.candidateForm.value.phone ?? '',
      location: this.candidateForm.value.location ?? '',
      title: this.candidateForm.value.title ?? '',
      summary: this.candidateForm.value.summary ?? '',
      skills: (this.candidateForm.value.skills ?? '').split(',').map((s) => s.trim()).filter((s) => s.length > 0),
      yearsExperience: this.candidateForm.value.yearsExperience ?? 0,
      education: this.candidateForm.value.education ?? '',
      cvUrl: null,
      createdAt: new Date()
    }

    this.candidateService.createCandidate(candidate).subscribe({
      next: () => {
        const userId = this.usersService.currentUser()?.id
        if (userId)
          this.router.navigate(['/dashboard', userId, 'candidates'])
      },
      error: (error) => console.log(error)
    })
  }
}
