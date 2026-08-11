import { Injectable, signal } from "@angular/core";
import { Role } from "../../auth/models/LoggedUser";

@Injectable({ providedIn: 'root' })
export class RoleStateService {
    role = signal<Role | undefined>(undefined);

    setRole(role: Role) {
        this.role.set(role);
    }
}