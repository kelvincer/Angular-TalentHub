import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { delay, map } from 'rxjs';
import { API_URL } from '../../dashboard/utils/config';
import { User } from '../../dashboard/models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private api = `${API_URL}/users`;
  http = inject(HttpClient)

  authenticated(email: string, password: string) {
    const params = new HttpParams()
      .set('email', email)
      .set('password', password)

    return this.http.get<User[]>(this.api, { params })
    .pipe(delay(3000))
    .pipe(map(users => users[0]))
  }
}
