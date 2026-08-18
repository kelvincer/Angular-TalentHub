import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { NewVacancy, Vacancy } from '../models/Vacancy';
import { API_URL } from '../utils/config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VancancyService {

  private api = `${API_URL}/vacancies`;
  http = inject(HttpClient)

  getVacancies() {
    return this.http.get<Vacancy[]>(this.api);
  }

  getById(id: string): Observable<Vacancy> {
    return this.http.get<Vacancy>(`${this.api}/${id}`);
  }

  create(data: NewVacancy): Observable<Vacancy> {
    const payload = { ...data, createdAt: new Date() };
    return this.http.post<Vacancy>(`${this.api}`, payload);
  }

  update(id: string, data: Partial<Vacancy>): Observable<Vacancy> {
    return this.http.patch<Vacancy>(`${this.api}/${id}`, data);
  }

  deleteVacancy(id: string) {
    return this.http.delete(`${this.api}/${id}`);
  }
}