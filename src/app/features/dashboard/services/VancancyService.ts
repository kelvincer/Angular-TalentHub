import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Vacancy } from '../models/Vacancy';
import { API_URL } from '../utils/config';

@Injectable({
  providedIn: 'root',
})
export class VancancyService {

  private api = `${API_URL}/vacancies`;
  http = inject(HttpClient)

  getVacancies() {
    return this.http.get<Vacancy[]>(this.api);
  }
}
