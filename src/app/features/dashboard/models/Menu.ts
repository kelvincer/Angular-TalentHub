import { Role } from "../../auth/models/LoggedUser"

export interface Menu {
    role: Role
    link: string
    name: string
}

export const menu : Menu[] = [
    {
        role: 'ADMIN',
        link: 'user-manager',
        name: 'Gestionar Usuarios'
    },
    {
        role: 'ADMIN',
        link: 'visualize-report',
        name: 'Visualizar Reportes'
    },
    {
        role: 'ADMIN',
        link: 'manage-vacancy',
        name: 'Administrar Vacantes'
    },
    {
        role: 'RECRUITER',
        link: 'vacancy',
        name: 'Vacantes'
    },
    {
        role: 'RECRUITER',
        link: 'manage-candidate',
        name: 'Gestionar candidatos'
    },
    {
        role: 'RECRUITER',
        link: 'manage-interview',
        name: 'Gestionar entrevistas'
    },
    {
        role: 'CANDIDATE',
        link: 'edit-profile',
        name: 'Editar perfil'
    },
    {
        role: 'CANDIDATE',
        link: 'upload-cv',
        name: 'Subir CV'
    },
    {
        role: 'CANDIDATE',
        link: 'apply-vacancy',
        name: 'Postular a vacantes'
    },

]