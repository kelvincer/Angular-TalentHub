import { inject, Injectable } from '@angular/core';
import { API_URL } from '../utils/config';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Candidate } from '../models/Candidate';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CandidateService {
  private api = `${API_URL}/candidates`;
  private http = inject(HttpClient);

  getCandidates() {
    return this.http.get<Candidate[]>(this.api).pipe(map((candidates) => candidates.reverse()));
  }

  getCandidateById(id: string) {
    return this.http.get<Candidate>(`${this.api}/${id}`);
  }

  getCandidateByUserId(userId: string) {
    const params = new HttpParams().set(
      '_where',
      JSON.stringify({
        userId: {
          eq: userId,
        },
      }),
    );
    return this.http
      .get<Candidate[]>(this.api, { params })
      .pipe(map((candidates) => candidates[0]));
  }

  updateCandidate(id: string, candidate: Candidate) {
    return this.http.put<Candidate>(`${this.api}/${id}`, candidate);
  }

  createCandidate(candidate: Candidate) {
    return this.http.post<Candidate>(this.api, candidate);
  }
}
