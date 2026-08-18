export type InterviewType = 'FONO' | 'TECNICA' | 'RRHH' | 'FINAL';
export type InterviewStatus = 'PENDING' | 'DONE' | 'CANCELLED';

export interface Interview {
    id: string;
    applicationId: string;
    type: InterviewType;
    scheduledAt: string;
    status: InterviewStatus;
    interviewerId: string;
    notes: string;
}

export type NewInterview = Omit<Interview, 'id'>;