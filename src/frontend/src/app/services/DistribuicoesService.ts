import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DistribuicoesService {

  private apiUrl = 'http://localhost:8080/distribuitions/';

  constructor(private http: HttpClient) { }

  u: any[] = [];

  getDistributionsById(id: string): Observable<any[]> {
    return this.http.get<any>(`http://localhost:8080/researches/${id}`).pipe(
      map(response => {
        this.u = response;
        this.u = (this.u as any).distribution_list as any[];
        console.log('u', this.u);
        return this.u;
      })
    );
  } 
}