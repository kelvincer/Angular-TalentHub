import { Role } from "../../auth/type/Role"

export interface Menu {
    role: Role
    link: string
    name: string
}

export const menu: Menu[] = [
    {
        role: 'ADMIN',
        link: 'vacancy',
        name: 'Vacantes'
    },
    {
        role: 'ADMIN',
        link: 'candidates',
        name: 'Candidatos'
    },
    {
        role: 'ADMIN',
        link: 'applications',
        name: 'Postulaciones'
    },
    {
        role: 'ADMIN',
        link: 'visualize-report',
        name: 'Reportes'
    },
    {
        role: 'ADMIN',
        link: 'manage-user',
        name: 'Usuarios'
    },
    {
        role: 'RECRUITER',
        link: 'vacancy',
        name: 'Vacantes'
    },
    {
        role: 'RECRUITER',
        link: 'candidates',
        name: 'Candidatos'
    },
    {
        role: 'RECRUITER',
        link: 'applications',
        name: 'Postulaciones'
    },
    {
        role: 'CANDIDATE',
        link: 'vacancy',
        name: 'Vacantes'
    },
    {
        role: 'CANDIDATE',
        link: 'applications',
        name: 'Postulaciones'
    },
    {
        role: 'CANDIDATE',
        link: 'my-profile',
        name: 'Mi perfil'
    },
]