import { Role } from "../../auth/models/LoggedUser";

export interface User {
    id: string;
    name: string;
    email: string;
    role: Role;
    status: 'Activo' | 'Inactivo';
    createdAt: Date;
}