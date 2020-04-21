import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  readonly baseURL: string = "http://localhost:5000/admin/";

  constructor(
    private _http: HttpClient
  ) { }

  getAllUsersClaims(): Observable<any> {
    return this._http.get(this.baseURL + "getAllUsersClaims");
  }

  searchClaims(searchData: any): Observable<any> {
    return this._http.post(this.baseURL + "search", searchData);
  }

  approveClaim(claimId): Observable<any> {
    return this._http.put(this.baseURL + "approve/" + claimId, { status: "Approved" });
  }

  declineClaim(claimId): Observable<any> {
    return this._http.put(this.baseURL + "decline/" + claimId, { status: "Rejected" });
  }
}
