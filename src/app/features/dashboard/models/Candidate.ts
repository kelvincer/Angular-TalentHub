export interface Candidate {
    id: string;
    userId: string | null;
    fullName: string;
    email: string;
    phone: string;
    location: string;
    title: string;
    summary: string;
    skills: string[];
    yearsExperience: number;
    education: string;
    cvUrl: string | null;
    createdAt: Date;
}
