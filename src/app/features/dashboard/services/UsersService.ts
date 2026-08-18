import { computed, inject, Injectable, signal } from '@angular/core';
import { User } from '../models/User';
import { HttpClient } from '@angular/common/http';
import { API_URL, SESSION_KEY } from '../utils/config';

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  private api = `${API_URL}/users`
  private http = inject(HttpClient)
  readonly currentUser = signal<User | undefined>(undefined)
  readonly isAdmin = computed(() => this.currentUser()?.role === 'ADMIN')
  readonly isRecruiter = computed(() => this.currentUser()?.role === 'RECRUITER')
  readonly isCanditate = computed(() => this.currentUser()?.role === 'CANDIDATE')

  constructor() {
    const raw = localStorage.getItem(SESSION_KEY)
    if (raw) {
      try {
        this.currentUser.set(JSON.parse(raw) as User)
      } catch {
        localStorage.removeItem(SESSION_KEY)
      }
    }
  }

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

  saveUser(user: User | undefined) {
    this.currentUser.set(user)
    localStorage.setItem(SESSION_KEY, JSON.stringify(user))
  }

  removeSessionKey() {
    localStorage.removeItem(SESSION_KEY)
  }
}
