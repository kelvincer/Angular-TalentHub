import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { VancancyService } from '../../services/VancancyService';
import { CandidateService } from '../../services/CandidatesService';
import { ApplicationsService } from '../../services/ApplicationsService';
import { forkJoin } from 'rxjs';
import { Vacancy } from '../../models/Vacancy';
import { Candidate } from '../../models/Candidate';
import { Application, ApplicationStatus } from '../../models/Application';
import { ReportCardComponent } from '../../../../shared/report-card/report-card.component';
import { UsersService } from '../../services/UsersService';
import { InterviewService } from '../../services/InterviewService';
import { Interview } from '../../models/Interview';
import { User } from '../../models/User';
import { ReportData, VacancyReportRow } from '../../models/ReportData';
import { APPLICATION_STATUS_LABELS, applicationBadge } from '../../utils/label';
import { KeyValuePipe } from '@angular/common';

@Component({
  selector: 'app-visualize-report-page.component',
  imports: [ReportCardComponent, KeyValuePipe],
  templateUrl: './visualize-report-page.component.html',
  styleUrl: './visualize-report-page.component.css',
})
export default class VisualizeReportPageComponent implements OnInit {

  private vacanciesService = inject(VancancyService)
  private candidatesService = inject(CandidateService)
  private applicationsService = inject(ApplicationsService)

  readonly reportData = signal<ReportData>(undefined!)
  readonly isLoading = signal<boolean>(false)
  readonly maxApplicationsByVacancy = computed(() => {
    const data = this.reportData();
    if (!data.applicationsByVacancy)
      return 1
    return Math.max(...data.applicationsByVacancy.map((row) => row.count), 1);
  })
  readonly maxByDepartment = computed(() => {
    const data = this.reportData()
    if (!data.vacanciesByDepartment)
      return 1
    return Math.max(...data.vacanciesByDepartment.map((row) => row.count), 1)
  })
  readonly statusKeys = (record: Record<string, number>) => Object.keys(record)
  readonly appBadge = (status: string) => applicationBadge(status as ApplicationStatus);
  readonly appStatusLabel = (status: string) =>
    APPLICATION_STATUS_LABELS[status as ApplicationStatus] ?? status

  ngOnInit(): void {
    this.isLoading.set(true)
    forkJoin({
      vacancies: this.vacanciesService.getVacancies(),
      candidates: this.candidatesService.getCandidates(),
      applications: this.applicationsService.getApplications(),
    }).subscribe({
      next: ({ vacancies, candidates, applications }) => {
        this.reportData.set(this.computeInfo({
          vacancies: vacancies,
          candidates: candidates,
          applications: applications
        }))
        this.isLoading.set(false)
      },
      error: (error) => console.log(error),
      complete: () => this.isLoading.set(false)
    })
  }

  private computeInfo(
    source: {
      vacancies: Vacancy[];
      candidates: Candidate[];
      applications: Application[];
    }): ReportData {

    const { vacancies, candidates, applications } = source;

    const applicationsByVacancy: VacancyReportRow[] = vacancies.map((vacancy) => {
      const apps = applications.filter((application) => application.vacancyId === vacancy.id)
      const statuses: Record<string, number> = {};
      for (const app of apps) {
        statuses[app.status] = (statuses[app.status] ?? 0) + 1;
      }
      return {
        vacancyId: vacancy.id,
        title: vacancy.title,
        count: apps.length,
        statuses: statuses
      }
    })

    let applicationsByStatus: Record<string, number> = {}
    for (const app of applications) {
      applicationsByStatus[app.status] = (applicationsByStatus[app.status] ?? 0) + 1
    }

    const deptMap = new Map<string, number>();
    for (const vacancy of vacancies) {
      deptMap.set(vacancy.department, (deptMap.get(vacancy.department) ?? 0) + 1);
    }
    const vacanciesByDepartment = [...deptMap.entries()]
      .map(([department, count]) => ({ department, count }))
      .sort((a, b) => b.count - a.count);


    return {
      totalVacancies: vacancies.length,
      activeVacancies: vacancies.filter((v) => v.status === 'ACTIVE').length,
      totalCandidates: candidates.length,
      totalApplications: applications.length,
      informationSummary: this.getInformationSummary(vacancies, candidates, applications),
      applicationsByVacancy: applicationsByVacancy,
      applicationsByStatus: applicationsByStatus,
      vacanciesByDepartment: vacanciesByDepartment
    }
  }

  getInformationSummary(vacancies: Vacancy[], candidates: Candidate[], applications: Application[]) {
    return [
      {
        title: 'Vacantes Totales',
        count: vacancies.length,
        description: `${vacancies.filter((v) => v.status === 'ACTIVE').length} activas`
      },
      {
        title: 'Candidatos',
        count: candidates.length,
        description: 'Banco de talento'
      },
      {
        title: 'Postulaciones',
        count: applications.length,
        description: 'Total registradas'
      }

    ]
  }


}
