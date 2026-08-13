import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Application, NewApplication } from '../models/Application';
import { API_URL } from '../utils/config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApplicationsService {

  private api = `${API_URL}/applications`;
  private http = inject(HttpClient)

  getApplications() {
    return this.http.get<Application[]>(this.api)
  }

  create(data: NewApplication): Observable<Application> {
    const payload = { ...data, appliedAt: new Date() }
    return this.http.post<Application>(this.api, payload)
  }
}
