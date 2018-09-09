import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({providedIn: 'root'})
export class AuthService {
  private apiUrl = '/api/users';

  constructor(private http: HttpClient) { }

  attemptLogin(email: string, password: string): Observable<any> {
    const body = {email, password};
    return this.http.post(`${this.apiUrl}/login`, body, httpOptions);
  }

  attemptRegister(email: string, name: string, password: string): Observable<any> {
    const body = {email, name, password};
    return this.http.post(`${this.apiUrl}/register`, body, httpOptions);
  }
}
