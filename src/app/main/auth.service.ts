import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({providedIn: 'root'})
export class AuthService {
  private url = '/api/users/login';

  constructor(private http: HttpClient) { }

  attemptLogin(email: string, password: string): Observable<any> {
    const body = {email, password};
    return this.http.post(this.url, body, httpOptions);
  }

  attemptRegister(): void {
      console.log('register');
  }
}
