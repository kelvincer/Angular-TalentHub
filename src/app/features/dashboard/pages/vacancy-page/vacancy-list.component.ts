import { Component, computed, inject, model, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VancancyService } from '../../services/VancancyService';
import { Vacancy } from '../../models/Vacancy';
import { ApplicationsService } from '../../services/ApplicationsService';
import { Application } from '../../models/Application';
import { RouterLink } from "@angular/router";
import { VacancyCardComponent } from '../../../../shared/vancancy-card/vacancy-card.component';
import { VacancyRowComponent } from '../../../../shared/vacancy-table-row/vacancy-row.component';
import { UsersService } from '../../services/UsersService';

@Component({
  selector: 'app-vacancy-list.component',
  imports: [RouterLink, VacancyCardComponent, VacancyRowComponent, FormsModule],
  templateUrl: './vacancy-list.component.html',
  styleUrl: './vacancy-list.component.css',
})
export default class VacancyListComponent implements OnInit {

  private vacanciesService = inject(VancancyService)
  private applicationsService = inject(ApplicationsService)
  private usersService = inject(UsersService)
  readonly vacancies = signal<Vacancy[]>([])
  readonly applications = signal<Application[]>([])
  readonly isStaff = computed(() => this.usersService.isAdmin() || this.usersService.isRecruiter())
  readonly isCandidate = this.usersService.isCanditate
  readonly searchText = model('')
  readonly filteredVacancies = computed(() => {
    const search = this.searchText().toLocaleLowerCase()
    return this.vacancies().filter((v) => v.title.toLocaleLowerCase().includes(search)
      || v.description.toLocaleLowerCase().includes(search)
      || v.department.toLocaleLowerCase().includes(search))
  })
  readonly applicantCount = (vacancyId: string) => {
    return this.applications().filter((v) => v.vacancyId === vacancyId).length
  }

  ngOnInit(): void {

    console.log("ngOnInit", this.usersService.currentUser())
    this.vacanciesService.getVacancies().subscribe({
      next: (data) => this.vacancies.set(data),
      error: (error) => console.log(error)
    })

    this.applicationsService.getApplications().subscribe({
      next: (data) => this.applications.set(data),
      error: (error) => console.log(error)
    })
  }



}
