import { Component, inject, OnInit, signal } from '@angular/core';
import { KeyValuePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MODALITY_LABELS, VACANCY_STATUS_LABELS } from '../../utils/label';
import { Modality, Vacancy, VacancyStatus } from '../../models/Vacancy';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VancancyService } from '../../services/VancancyService';
import { UsersService } from '../../services/UsersService';

@Component({
  selector: 'app-vancancy-form.component',
  imports: [KeyValuePipe, RouterLink, ReactiveFormsModule],
  templateUrl: './vancancy-form.component.html',
  styleUrl: './vancancy-form.component.css',
})
export default class VancancyFormComponent implements OnInit {

  private route = inject(ActivatedRoute)
  private readonly router = inject(Router);
  private vacanciesService = inject(VancancyService)
  private userService = inject(UsersService)
  readonly isEditing = signal(false)
  readonly modalityLabels = MODALITY_LABELS
  readonly vacancyLabels = VACANCY_STATUS_LABELS
  readonly toastVisible = signal<boolean>(false)
  readonly toastMessage = signal<string>('')
  readonly toastType = signal<'alert-success' | 'alert-error'>('alert-success')
  readonly vacancyForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(4)]),
    description: new FormControl('', Validators.required),
    requirements: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    modality: new FormControl<Modality | string>('Selecciona una modalidad', Validators.required),
    department: new FormControl('', Validators.required),
    salaryMin: new FormControl<number | null>(null),
    salaryMax: new FormControl<number | null>(null),
    status: new FormControl<VacancyStatus | string>('Selecciona un estado', Validators.required),
  })

  ngOnInit(): void {
    const vacancyId = this.route.snapshot.paramMap.get('vacancyId');
    if (!vacancyId)
      return
    this.isEditing.set(true)
    this.vacanciesService.getById(vacancyId).subscribe({
      next: (vacancy) => {
        this.vacancyForm.patchValue({
          title: vacancy.title,
          department: vacancy.department,
          location: vacancy.location,
          modality: vacancy.modality,
          salaryMin: vacancy.salaryMin,
          salaryMax: vacancy.salaryMax,
          status: vacancy.status,
          description: vacancy.description,
          requirements: vacancy.requirements,
        });
      },
      error: (error) => console.log(error)
    })
  }

  showToast(message: string, type: 'alert-success' | 'alert-error') {
    this.toastMessage.set(message)
    this.toastType.set(type)
    this.toastVisible.set(true)
    setTimeout(() => {
      this.toastVisible.set(false)
    }, 3000)
  }

  submit() {
    console.log("title", this.vacancyForm.value.title)
    if (this.vacancyForm.invalid) {
      this.showToast('Completa los campos requeridos.', 'alert-error')
      return
    }

    const raw = this.vacancyForm.getRawValue()
    const payload = {
      title: raw.title ?? '',
      department: raw.department ?? '',
      location: raw.location ?? '',
      modality: raw.modality as Modality,
      salaryMin: raw.salaryMin ?? 0,
      salaryMax: raw.salaryMax ?? 0,
      status: raw.status as VacancyStatus,
      description: raw.description ?? '',
      requirements: raw.requirements ?? '',
    }

    if (this.isEditing()) {
      const id = this.route.snapshot.paramMap.get('vacancyId') ?? '';
      this.vacanciesService.update(id, payload).subscribe({
        next: () => {
          this.showToast('Vacante actualizada correctamente.', 'alert-success')
          setTimeout(() => {
            this.router.navigate(['../'], { relativeTo: this.route });
          }, 2000)
        }
      })
    } else {
      this.vacanciesService.create({ ...payload, createdBy: this.userService.currentUser()!.id })
        .subscribe({
          next: () => {
            this.showToast('Vacante creada correctamente.', 'alert-success')
            setTimeout(() => {
              this.router.navigate(['../'], { relativeTo: this.route });
            }, 2000)
          },
          error: (error) => console.log(error)
        })
    }
  }
}
