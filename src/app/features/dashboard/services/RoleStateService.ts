import { Injectable, signal } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class RoleStateService {
    role = signal<'Administrador' | 'Reclutador' | 'Candidato' | undefined>(undefined);

    setRole(role: 'Administrador' | 'Reclutador' | 'Candidato') {
        this.role.set(role);
    }
}