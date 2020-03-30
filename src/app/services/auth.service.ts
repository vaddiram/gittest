import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Credentials } from '../interfaces/credentials';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly baseURL: string = "http://localhost:5000/auth/";

  constructor(private _http: HttpClient) { }

  signUp(newUser: Credentials): Observable<any> {
    return this._http.post(this.baseURL + "register", newUser);
  }

  signIn(userCredentials: Credentials): Observable<any> {
    return this._http.post<{ token: string }>(this.baseURL + "signin", userCredentials);
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('access_token') !== null);
  }

  public get currentUser(): string {
    try {
      let tokenInfo = jwt_decode(localStorage.getItem('access_token'));
      return tokenInfo.user;
    } catch(error){
      console.log(error);
    }
  }
}
