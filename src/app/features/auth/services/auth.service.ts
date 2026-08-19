import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { delay, map } from 'rxjs';
import { API_URL, SESSION_KEY } from '../../dashboard/utils/config';
import { User } from '../../dashboard/models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private api = `${API_URL}/users`;
  http = inject(HttpClient)

  getUsers() {
    return this.http.get<User[]>(this.api).pipe(delay(3000));
  }

  authenticated(email: string, password: string) {
    const params = new HttpParams()
      .set('_where', JSON.stringify({
        email: {
          eq: email
        },
        password: {
          eq: password
        }
      }))

    return this.http.get<User[]>(this.api, { params })
    .pipe(delay(3000))
    .pipe(map(users => users[0]))
  }

  isAuthenticated(): boolean {
    return localStorage.getItem(SESSION_KEY) !== null
  }
}
