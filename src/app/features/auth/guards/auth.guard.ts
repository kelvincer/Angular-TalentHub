import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { UsersService } from "../../dashboard/services/UsersService";

export const authGuard: CanActivateFn = () => {
    const usersService = inject(UsersService)
    const router = inject(Router)
    if (usersService.isAuthenticated()) {
        return true
    }
    return router.createUrlTree(['']);
}