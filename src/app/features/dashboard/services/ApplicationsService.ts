import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Application, NewApplication } from '../models/Application';
import { API_URL } from '../utils/config';
import { delay, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApplicationsService {

  private api = `${API_URL}/applications`;
  private http = inject(HttpClient)

  getApplications() {
    return this.http.get<Application[]>(this.api)
      .pipe(
        delay(1500),
        map(applications => applications.reverse())
      )
  }

  getById(id: string): Observable<Application> {
    return this.http.get<Application>(`${this.api}/${id}`)
  }

  create(data: NewApplication): Observable<Application> {
    const payload = { ...data, appliedAt: new Date() }
    return this.http.post<Application>(this.api, payload)
  }

  update(id: string, data: Partial<Application>): Observable<Application> {
    return this.http.patch<Application>(`${this.api}/${id}`, data)
  }
}
