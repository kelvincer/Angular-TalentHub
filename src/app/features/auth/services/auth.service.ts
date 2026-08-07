import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private api = 'http://localhost:3000/loggedUsers';
  http = inject(HttpClient)

  getUsers() {
    return this.http.get<LoggedUser[]>(this.api);
  }
}
