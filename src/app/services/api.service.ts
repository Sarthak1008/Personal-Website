import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  

  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

   getRandomTravelQuote(): Observable<any> {
    return this.http.get(`https://api.quotable.io/random?tags=travel`);
  }

  // Example: POST request
  postMessage(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/message`, data);
  }
}
