import { Injectable, signal } from "@angular/core";
import { Role } from "../../auth/models/LoggedUser";

const ROLE_KEY = 'talenthub_role';

@Injectable({ providedIn: 'root' })
export class RoleStateService {
    role = signal<Role | undefined>(this.restoreRole());

    setRole(role: Role | undefined) {
        this.role.set(role);
        if (role) {
            localStorage.setItem(ROLE_KEY, role);
        } else {
            localStorage.removeItem(ROLE_KEY);
        }
    }

    private restoreRole(): Role | undefined {
        const raw = localStorage.getItem(ROLE_KEY);
        if (raw === 'ADMIN' || raw === 'RECRUITER' || raw === 'CANDIDATE') {
            return raw;
        }
        return undefined;
    }
}