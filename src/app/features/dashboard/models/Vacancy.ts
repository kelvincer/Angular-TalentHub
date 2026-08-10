export type Modality = 'PRESENCIAL' | 'REMOTO' | 'HIBRIDO';
export type VacancyStatus = 'ACTIVE' | 'PAUSED' | 'CLOSED';

export interface Vacancy {
    id: string;
    title: string;
    description: string;
    requirements: string;
    location: string;
    modality: Modality;
    department: string;
    salaryMin: number;
    salaryMax: number;
    status: VacancyStatus;
    createdBy: number;
    createdAt: Date;
}
