import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  readonly baseURL: string = "http://localhost:5000/admin/";

  constructor(private _http: HttpClient) { }
}
