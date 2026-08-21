import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from "@angular/router";
import { CandidateService } from '../../services/CandidatesService';
import { Candidate } from '../../models/Candidate';
import { UsersService } from '../../services/UsersService';
import { ToastService } from '../../services/ToastService';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-candidate-profile.component',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './candidate-profile.component.html',
  styleUrl: './candidate-profile.component.css',
})
export default class CandidateProfileComponent implements OnInit {

  private route = inject(ActivatedRoute)
  private candidateService = inject(CandidateService)
  private usersService = inject(UsersService)
  private readonly toastService = inject(ToastService)
  readonly userId = signal<string | null>(null)
  readonly candidate = signal<Candidate | null>(null)
  fileUrl?: SafeResourceUrl
  readonly fileName = signal('')
  readonly sanitizer = inject(DomSanitizer)
  candidateForm = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
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
          } else {
            this.candidateForm.patchValue({
              fullName: this.usersService.currentUser()?.name,
              email: this.usersService.currentUser()?.email
            })
          }
        },
        error: (error) => console.log(error)
      })
    })
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.fileName.set(input.files[0].name);
      this.candidateForm.patchValue({ cvUrl: input.files[0].name })
      const url = URL.createObjectURL(input.files[0]);
      this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
  }

  submit() {

    if (this.candidateForm.invalid) {
      this.toastService.show('Completa los campos obligatorios para guardar tu perfil.', 'alert-error')
      return
    }

    const candidate = this.candidate()

    const c: Candidate = {
      id: this.candidate()?.id ?? '',
      userId: this.userId(),
      fullName: this.candidateForm.value.fullName ?? '',
      email: this.candidateForm.value.email ?? '',
      phone: this.candidateForm.value.phone ?? '',
      location: this.candidateForm.value.location ?? '',
      title: this.candidateForm.value.title ?? '',
      summary: this.candidateForm.value.summary ?? '',
      skills: (this.candidateForm.value.skills ?? '').split(', '),
      yearsExperience: Number(this.candidateForm.value.yearsExperience) || 0,
      education: this.candidateForm.value.education ?? '',
      cvUrl: this.candidateForm.value.cvUrl ?? null,
      createdAt: new Date()
    }

    if (candidate) {
      this.candidateService.updateCandidate(c.id, c).subscribe({
        next: () => this.toastService.show('Perfil guardado correctamente.', 'alert-success'),
        error: (error) => console.log(error)

      })
    } else {
      this.candidateService.createCandidate(c).subscribe({
        next: () => this.toastService.show('Perfil guardado correctamente.', 'alert-success'),
        error: (error) => console.log(error)
      })
    }
  }

}
