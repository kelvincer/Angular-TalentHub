export interface Application {
    id: string;
    candidateId: string;
    vacancyId: string;
    status: 'PENDING' | 'REVIEWED' | 'INTERVIEW' | 'ACCEPTED' | 'REJECTED';
    appliedAt: Date;
    notes: string;
}
