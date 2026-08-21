export interface VacancyReportRow {
    vacancyId: string;
    title: string;
    count: number;
    statuses: Record<string, number>;
};

export interface Information {
    title: string,
    count: number,
    description: string
};

export interface ReportData {
    totalVacancies: number
    activeVacancies: number
    totalCandidates: number
    totalApplications: number
    informationSummary: Information[]
    applicationsByVacancy: VacancyReportRow[]
    applicationsByStatus: Record<string, number>
    vacanciesByDepartment: { department: string; count: number }[]
};