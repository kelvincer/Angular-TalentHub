import { CanActivateFn, Router } from "@angular/router";
import { Role } from "../../auth/type/Role";
import { inject } from "@angular/core";
import { UsersService } from "../services/UsersService";

export function roleGuard(allowed: Role[]): CanActivateFn {
    return () => {
        const userService = inject(UsersService)
        const router = inject(Router)
        const user = userService.currentUser()
        if (!user) return router.createUrlTree([''])
        if (!userService.isAuthenticated()) return router.createUrlTree([''])
        if (allowed.includes(user.role)) return true
        return router.createUrlTree(['/dashboard', user.id, 'vacancy'])
    };
}