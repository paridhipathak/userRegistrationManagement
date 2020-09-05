import { Injectable } from '@angular/core';
import { User } from './../../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public getUser(): User {
    return JSON.parse(localStorage.getItem('user'));
  }

  public registerUser(userDetails: User) {
    localStorage.setItem('user', JSON.stringify(userDetails));
  }

  public setSession() {
    sessionStorage.setItem('isLoggedin', 'true');
  }
}
