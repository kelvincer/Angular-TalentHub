import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Application } from '../models/Application';

@Injectable({
  providedIn: 'root',
})
export class ApplicationsService {

  private api = 'http://localhost:3001/applications';
  http = inject(HttpClient)

  getApplications() {
    return this.http.get<Application[]>(this.api) 
   }
}
