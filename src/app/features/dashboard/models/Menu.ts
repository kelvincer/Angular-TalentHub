export interface Menu {
    role: 'Administrador' | 'Reclutador' | 'Candidato'
    link: string
    name: string
}

export const menu : Menu[] = [
    {
        role: 'Administrador',
        link: 'user-manager',
        name: 'Gestionar Usuarios'
    },
    {
        role: 'Administrador',
        link: 'visualize-report',
        name: 'Visualizar Reportes'
    },
    {
        role: 'Administrador',
        link: 'manage-vacancy',
        name: 'Administrar Vacantes'
    },
    {
        role: 'Reclutador',
        link: 'create-vacancy',
        name: 'Crear vacantes '
    },
    {
        role: 'Reclutador',
        link: 'manage-candidate',
        name: 'Gestionar candidatos'
    },
    {
        role: 'Reclutador',
        link: 'manage-interview',
        name: 'Gestionar entrevistas'
    },
    {
        role: 'Candidato',
        link: 'edit-profile',
        name: 'Editar perfil'
    },
    {
        role: 'Candidato',
        link: 'upload-cv',
        name: 'Subir CV'
    },
    {
        role: 'Candidato',
        link: 'apply-vacancy',
        name: 'Postular a vacantes'
    },

]