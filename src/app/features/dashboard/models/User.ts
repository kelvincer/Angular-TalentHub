import { Role } from "../../auth/models/LoggedUser";

export type Status = 'ACTIVE' | 'INACTIVE'

export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    role: Role;
    status: Status;
    createdAt: Date;
}