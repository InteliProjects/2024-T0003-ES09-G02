import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class UserActivityService {
    activeUsersCount: number = 0;

   constructor(private http: HttpClient) {}


  addUser(): void {
    this.activeUsersCount += 1;
    console.log("ACTIVE USERS COUNT = " + this.activeUsersCount);
    this.sendActiveUsersValue(this.activeUsersCount);
  }

  removeUser(): void {
    this.activeUsersCount -= 1;
    this.sendActiveUsersValue(this.activeUsersCount);
  }

  sendActiveUsersValue(value: number): void {
    this.http.post<any>('http://localhost:9100/updateActiveUsersMetric', { value }).subscribe(response => {
      console.log('activeUsers value sent successfully');
    }, error => {
      console.error('Error sending activeUsers value:', error);
    });
  }
}