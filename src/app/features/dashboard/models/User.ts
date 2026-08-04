export interface User {
    id: number;
    name: string;
    email: string;
    role: 'Administrador' | 'Reclutador' | 'Candidato';
    status: 'Activo' | 'Inactivo';
    createdAt: string;
}