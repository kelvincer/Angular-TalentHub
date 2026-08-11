export type Role = 'ADMIN' | 'RECRUITER' | 'CANDIDATE';

interface LoggedUser {
    email: string,
    password: string,
    role: Role
}