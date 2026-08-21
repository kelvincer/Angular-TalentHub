import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { KeyValuePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MODALITY_LABELS, VACANCY_STATUS_LABELS } from '../../utils/label';
import { Modality, VacancyStatus } from '../../models/Vacancy';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VancancyService } from '../../services/VancancyService';
import { UsersService } from '../../services/UsersService';
import { ToastService } from '../../services/ToastService';

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
  private readonly toastService = inject(ToastService)
  readonly userId = computed(() => this.userService.currentUser()?.id)
  readonly isEditing = signal(false)
  readonly modalityLabels = MODALITY_LABELS
  readonly vacancyLabels = VACANCY_STATUS_LABELS
  readonly vacancyForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(4)]),
    description: new FormControl('', Validators.required),
    requirements: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    modality: new FormControl<Modality | string>('', Validators.required),
    department: new FormControl('', Validators.required),
    salaryMin: new FormControl<number | null>(null),
    salaryMax: new FormControl<number | null>(null),
    status: new FormControl<VacancyStatus | string>('', Validators.required),
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

  submit() {
    if (this.vacancyForm.invalid) {
      this.toastService.show('Completa los campos requeridos.', 'alert-error')
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
          this.toastService.show('Vacante actualizada correctamente.', 'alert-success')
          setTimeout(() => {
            this.router.navigate(['../'], { relativeTo: this.route });
          }, 2000)
        }
      })
    } else {
      const id = this.userService.currentUser()?.id
      if (!id)
        return

      this.vacanciesService.create({ ...payload, createdBy: id })
        .subscribe({
          next: () => {
            this.toastService.show('Vacante creada correctamente.', 'alert-success')
            setTimeout(() => {
              this.router.navigate(['../'], { relativeTo: this.route });
            }, 2000)
          },
          error: (error) => console.log(error)
        })
    }
  }
}
