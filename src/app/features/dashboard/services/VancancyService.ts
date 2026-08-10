import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Vacancy } from '../models/Vacancy';

@Injectable({
  providedIn: 'root',
})
export class VancancyService {

  private api = 'http://localhost:3001/vacancies';
  http = inject(HttpClient)

  getVacancies() {
    return this.http.get<Vacancy[]>(this.api);
  }
}
