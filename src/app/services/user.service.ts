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
    return this._http.post(this.baseURL + "getAllClaims", { user });
  }

  addClaim(claimData: Claim): Observable<any> {
    return this._http.post(this.baseURL + "addClaim", claimData);
  }

  getSingleClaim(id: string): Observable<any> {
    return this._http.get(this.baseURL + "singleClaim/" + id);
  }

  updateClaim(id: string, claimData: Claim): Observable<any> {
    return this._http.put(this.baseURL + "updateClaim/" + id, claimData);
  }

  searchClaims(searchData: any): Observable<any> {
    return this._http.post(this.baseURL + "search", searchData);
  }

  deleteClaim(id: string): Observable<any> {
    return this._http.put(this.baseURL + "delete/" + id, { deleted: 1 });
  }

  getActionHistory(id: string): Observable<any> {
    return this._http.get(this.baseURL + "get-action-history/" + id);
  }
}
