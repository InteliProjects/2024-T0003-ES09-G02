import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PesquisasService {

  private apiUrl = 'http://localhost:8080/researches/';

  constructor(private http: HttpClient) { }

  getAllResearches(): Observable<any> {
    console.log(this.http.get<any>(this.apiUrl))
    return this.http.get<any>(this.apiUrl);
  }

  getResearchById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}