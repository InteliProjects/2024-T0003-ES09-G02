import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AnswersService {

  private apiUrl = 'http://localhost:8080/answers/';
  private metricsUrl = 'http://localhost:9100/updateSearchResponseTimeMetric';

  constructor(private http: HttpClient) { }

  public createAnswers(phoneNumber: string, elapsedTime: number, finished: boolean, started: boolean, answer:string, id_distribution: string): Observable<any> {
    const body = {
        phoneNumber: phoneNumber,
        Time: elapsedTime,
        finished: finished,
        started: started,
        answer: answer,
        distribution_id: id_distribution
    };
  
    return this.http.post(this.apiUrl, body);
  }

  public updateSearchResponseTimeMetric(responseTime: number): Observable<any> {
    const body = {
        responseTime: (responseTime)
    };
  
    return this.http.post(this.metricsUrl, body);
  }
}