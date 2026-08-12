import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Application } from '../models/Application';
import { API_URL } from '../utils/config';

@Injectable({
  providedIn: 'root',
})
export class ApplicationsService {

  private api = `${API_URL}/applications`;
  private http = inject(HttpClient)

  getApplications() {
    return this.http.get<Application[]>(this.api) 
   }
}
