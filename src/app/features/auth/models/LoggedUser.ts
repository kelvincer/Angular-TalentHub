export type Role = 'ADMIN' | 'RECRUITER' | 'CANDIDATE';

export interface LoggedUser {
    email: string,
    password: string,
    role: Role
}