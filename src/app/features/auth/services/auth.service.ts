import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { delay } from 'rxjs';
import { API_URL, SESSION_KEY } from '../../dashboard/utils/config';
import { LoggedUser } from '../models/LoggedUser';
import { User } from '../../dashboard/models/User';

const CURRENT_USER_KEY = 'talenthub_current_user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private api = `${API_URL}/loggedUsers`;
  http = inject(HttpClient)

  getUsers() {
    return this.http.get<LoggedUser[]>(this.api).pipe(delay(3000));
  }

  isAuthenticated(): boolean {
    return localStorage.getItem(SESSION_KEY) !== null
  }
}
