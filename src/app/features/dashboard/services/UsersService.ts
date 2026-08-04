import { Injectable } from '@angular/core';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  loadUsers(): User[] {

    return [{
      id: 1,
      name: 'Jorge',
      email: 'mail@site.com',
      role: 'Administrador',
      status: 'Activo',
      createdAt: '12-09-2026'
    },
    {
      id: 2,
      name: 'Juan',
      email: 'mail@site.com',
      role: 'Administrador',
      status: 'Activo',
      createdAt: '12-09-2026'
    },
    {
      id: 3,
      name: 'Popeye',
      email: 'mail@site.com',
      role: 'Administrador',
      status: 'Activo',
      createdAt: '12-09-2026'
    },
    {
      id: 4,
      name: 'Oliva',
      email: 'mail@site.com',
      role: 'Candidato',
      status: 'Inactivo',
      createdAt: '12-09-2026'
    }];
  }
}
