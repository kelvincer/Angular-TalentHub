import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { RoleStateService } from "../services/RoleStateService";

export const initialDashboardRouteGuard: CanActivateFn = (route) => {
    const router = inject(Router);
    const roleService = inject(RoleStateService)

    console.log("initial", roleService.role())
    const userId = route.parent!.paramMap.get('userId');
    console.log("userid", userId)

    switch (roleService.role()) {
        case 'Administrador':
            return router.createUrlTree(['dashboard', userId, 'user-manager']);
        case 'Reclutador':
            return router.createUrlTree(['dashboard', userId, 'create-vacancy']);
        case 'Candidato':
            return router.createUrlTree(['dashboard', userId, 'edit-profile']);
        default:
            return router.createUrlTree(['dashboard', userId, 'user-manager']);
    }
};