export type ApplicationStatus = 'PENDING' | 'REVIEWED' | 'INTERVIEW' | 'ACCEPTED' | 'REJECTED';

export interface Application {
    id: string;
    candidateId: string;
    vacancyId: string;
    status: ApplicationStatus
    appliedAt: Date;
    notes: string;
}

export type NewApplication = Omit<Application, 'id' | 'appliedAt'>;
