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
        case 'ADMIN':
            return router.createUrlTree(['dashboard', userId, 'vacancy']);
        case 'RECRUITER':
            return router.createUrlTree(['dashboard', userId, 'vacancy']);
        case 'CANDIDATE':
            return router.createUrlTree(['dashboard', userId, 'vacancy']);
        default:
            return router.createUrlTree(['dashboard', userId, 'vacancy']);
    }
};