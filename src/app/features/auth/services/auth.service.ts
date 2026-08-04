import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  user = {
    name: 'Juan',
    role: 'ADMIN' // ADMIN | USER | EDITOR
  };

  getRole(): string {
    return this.user.role;
  }

  hasRole(role: string): boolean {
    return this.user.role === role;
  }
}
