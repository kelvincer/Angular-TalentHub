import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from "@angular/router";
import { CandidateService } from '../../services/CandidatesService';
import { Candidate } from '../../models/Candidate';

@Component({
  selector: 'app-candidate-profile.component',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './candidate-profile.component.html',
  styleUrl: './candidate-profile.component.css',
})
export default class CandidateProfileComponent implements OnInit {

  private route = inject(ActivatedRoute)
  private candidateService = inject(CandidateService)
  readonly userId = signal<string | null>(null)
  readonly candidate = signal<Candidate | null>(null)
  readonly toastVisible = signal<boolean>(false)
  candidateForm = new FormGroup({
    fullName: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    location: new FormControl(''),
    title: new FormControl(''),
    summary: new FormControl(''),
    skills: new FormControl<string>(''),
    yearsExperience: new FormControl<number | null>(null),
    education: new FormControl(''),
    cvUrl: new FormControl<string | null>(null),
    createdAt: new FormControl('')
  })

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe(params => {
      const userId = params.get("userId")
      this.userId.set(userId)

      if (!userId) return

      this.candidateService.getCandidateByUserId(userId).subscribe({
        next: (data) => {
          console.log("data", data)
          this.candidate.set(data)
          if (data) {
            this.candidateForm.patchValue({
              fullName: data.fullName,
              email: data.email,
              phone: data.phone,
              location: data.location,
              title: data.title,
              summary: data.summary,
              skills: data.skills.join(', '),
              yearsExperience: data.yearsExperience,
              education: data.education,
              cvUrl: data.cvUrl,
              createdAt: String(data.createdAt),
            })
          }
        },
        error: (error) => console.log(error)
      })
    })
  }

  submit() {
    const c: Candidate = {
      id: this.candidate()?.id ?? '',
      userId: this.candidate()?.userId ?? '',
      fullName: this.candidateForm.value.fullName ?? '',
      email: this.candidateForm.value.email ?? '',
      phone: this.candidateForm.value.phone ?? '',
      location: this.candidateForm.value.location ?? '',
      title: this.candidateForm.value.title ?? '',
      summary: this.candidateForm.value.summary ?? '',
      skills: (this.candidateForm.value.skills ?? '').split(', '),
      yearsExperience: Number(this.candidateForm.value.yearsExperience) ?? 0,
      education: this.candidateForm.value.education ?? '',
      cvUrl: this.candidateForm.value.cvUrl ?? null,
      createdAt: new Date()
    }

    this.candidateService.updateCandidate(c.id, c).subscribe({
      next: () => {
        this.showToast()
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  showToast() {
    this.toastVisible.set(true);
    setTimeout(() => {
      this.toastVisible.set(false);
    }, 3000);
  }

}
