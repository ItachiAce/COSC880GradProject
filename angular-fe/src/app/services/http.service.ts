// http.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpService {
  private baseUrl = 'http://localhost:3000'; // Replace with actual backend API URL

  constructor(private http: HttpClient) {}

  // Example method to get data from the server
  getDoctors(): Observable<any> {
    const url = `${this.baseUrl}/api/doctors`; // Replace with your actual API endpoint
    return this.http.get(url);
  }
  addDoctor(doctorData: any): Observable<any> {
    const url = `${this.baseUrl}/api/doctors`;
    return this.http.post(url, doctorData);
  }
  // Add more methods for other types of HTTP requests (POST, PUT, DELETE, etc.)
}
