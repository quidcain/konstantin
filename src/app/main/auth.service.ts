import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class AuthService {

  constructor() { }

  attemptLogin() {
      console.log("login");
  }

  attemptRegister() {
      console.log("register");
  }
}
