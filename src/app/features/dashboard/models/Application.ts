export type Status = 'PENDING' | 'REVIEWED' | 'INTERVIEW' | 'ACCEPTED' | 'REJECTED';

export interface Application {
    id: string;
    candidateId: string;
    vacancyId: string;
    status: Status
    appliedAt: Date;
    notes: string;
}

export type NewApplication = Omit<Application, 'id' | 'appliedAt'>;
