export interface User {
    id: string;
    name: string;
    email: string;
    role: 'Administrador' | 'Reclutador' | 'Candidato';
    status: 'Activo' | 'Inactivo';
    createdAt: Date;
}