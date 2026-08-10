import { inject, Injectable } from '@angular/core';
import { User } from '../models/User';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  private api = 'http://localhost:3001/users';
  http = inject(HttpClient)

  getUsers() {
    return this.http.get<User[]>(this.api);
  }

  create(user: User) {
    return this.http.post<User>(this.api, user);
  }

  update(id: string, user: User) {
    return this.http.put<User>(`${this.api}/${id}`, user);
  }

  delete(id: string) {
    return this.http.delete(`${this.api}/${id}`);
  }
}
