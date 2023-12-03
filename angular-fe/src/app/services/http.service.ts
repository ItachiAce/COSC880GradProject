// http.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpService {
  private baseUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) {}

  
  getDoctors(): Observable<any> {
    const url = `${this.baseUrl}/api/doctors`; 
    return this.http.get(url);
  }
  addDoctor(doctorData: any): Observable<any> {
    const url = `${this.baseUrl}/api/doctors`;
    return this.http.post(url, doctorData);
  }
  getPatients(): Observable<any> {
    const url = `${this.baseUrl}/api/patients`; 
    return this.http.get(url);
  }
  addPatient(patientData: any): Observable<any> {
    const url = `${this.baseUrl}/api/patients`;
    return this.http.post(url, patientData);
  }
  getAdmins(): Observable<any> {
    const url = `${this.baseUrl}/api/admin`; 
    return this.http.get(url);
  }
  addAdmin(adminData: any): Observable<any> {
    const url = `${this.baseUrl}/api/admin`;
    return this.http.post(url, adminData);
  }
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth/login'; 

  constructor(private http: HttpClient) { }

  login(username: string, password: string, role: string): Observable<any> {
    const body = { username, password, role };
    return this.http.post(this.apiUrl, body);
  }
}