import { ActivatedRoute, CanActivateFn, Router } from "@angular/router";
import { Role } from "../../auth/models/LoggedUser";
import { inject } from "@angular/core";
import { UsersService } from "../services/UsersService";

export function roleGuard(allowed: Role[]): CanActivateFn {
    return () => {
        const userService = inject(UsersService)
        const router = inject(Router)
        if (!userService.isAuthenticated()) return router.createUrlTree(['/login'])
        if (allowed.includes(userService.currentUser()!.role)) return true
        return router.createUrlTree(['/dashboard', userService.currentUser()?.id, 'vacancy'])
    };
}