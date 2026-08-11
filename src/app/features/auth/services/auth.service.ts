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
  readonly currentUser = signal<User | undefined>(undefined)
  readonly isAdmin = computed(() => this.currentUser()?.role === 'ADMIN')
  readonly isRecruiter = computed(() => this.currentUser()?.role === 'RECRUITER')
  readonly isCanditate = computed(() => this.currentUser()?.role === 'CANDIDATE')

  constructor() {
    const raw = localStorage.getItem(SESSION_KEY);
    if (raw) {
      try {
        this.currentUser.set(JSON.parse(raw) as User);
      } catch {
        localStorage.removeItem(SESSION_KEY);
      }
    }
  }

  getUsers() {
    return this.http.get<LoggedUser[]>(this.api).pipe(delay(3000));
  }

  saveUser(user: User | undefined) {
    this.currentUser.set(user)
    localStorage.setItem(SESSION_KEY, JSON.stringify(user))
  }
}
