import { inject, Injectable } from "@angular/core"
import { API_URL } from "../utils/config"
import { HttpClient, HttpParams } from "@angular/common/http"
import { Interview, NewInterview } from "../models/Interview"
import { Observable } from "rxjs"

@Injectable({
    providedIn: 'root',
})
export class InterviewService {
    private api = `${API_URL}/interviews`
    private http = inject(HttpClient)

    create(data: NewInterview): Observable<Interview> {
        return this.http.post<Interview>(`${this.api}`, data)
    }

    getInterviews() {
        return this.http.get<Interview[]>(this.api);
    }

    getByApplication(applicationId: string): Observable<Interview[]> {
        //return this.http.get<Interview[]>(`${this.api}?applicationId=${applicationId}`);

        const params = new HttpParams()
            .set('_where', JSON.stringify({
                applicationId: {
                    eq: applicationId
                }
            }));
        return this.http.get<Interview[]>(this.api, { params })

    }

    update(id: string, data: Partial<Interview>): Observable<Interview> {
        return this.http.patch<Interview>(`${this.api}/${id}`, data);
    }

    remove(id: string): Observable<void> {
        return this.http.delete<void>(`${this.api}/${id}`)
    }

}