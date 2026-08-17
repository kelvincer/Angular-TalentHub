import { Component, inject, input, output } from '@angular/core';
import { VancancyService } from '../../../../services/VancancyService';
import { Vacancy } from '../../../../models/Vacancy';

@Component({
  selector: 'app-delete-vacancy',
  imports: [],
  templateUrl: './delete-vacancy.component.html',
  styleUrl: './delete-vacancy.component.css',
})
export class DeleteVacancyComponent {

  private vacancyService = inject(VancancyService)
  modalOpen = input(false);
  vacancy = input<Vacancy | null>()
  close = output<void>();
  deleted = output<string>();

  closeModal() {
    this.close.emit()
  }

  deleteVacancy() {
    const id = this.vacancy()?.id
    if (!id) {
      this.closeModal()
      return
    }

    this.vacancyService.deleteVacancy(id).subscribe({
      next: () => {
        this.deleted.emit(id)
        this.closeModal()
      },
      error: (error) => console.log(error)
    })
  }
}