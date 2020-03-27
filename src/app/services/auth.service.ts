import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Credentials } from '../interfaces/credentials';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly baseURL: string = "http://localhost:5000/auth/";

  constructor(private _http: HttpClient) { }

  signUp(userCredentials: Credentials): Observable<any> {
    return this._http.post(this.baseURL + "register", userCredentials);
  }
}
