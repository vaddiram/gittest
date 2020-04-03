import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Claim } from '../interfaces/claim';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly baseURL: string = "http://localhost:5000/user/";

  constructor(
    private _http: HttpClient
  ) { }

  getAllClaims(user: string): Observable<any> {
    console.log(user);
    return this._http.post(this.baseURL, { user });
  }

  addClaim(claimData: Claim): Observable<any> {
    console.log(claimData);
    return this._http.post(this.baseURL + "addClaim", claimData);
  }

  getSingleClaim(id: string): Observable<any> {
    return this._http.get(this.baseURL + "singleClaim/" + id);
  }
}
