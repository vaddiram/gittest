import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _jwtHelperService: JwtHelperService,
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // get token from local storage or state management
      const token = localStorage.getItem("access_token");

      if (token) {
        const allowedRole = next.data.allowedRole;

        // decode token to read the payload details
        const decodeToken = this._jwtHelperService.decodeToken(token);
      
        // check if it was decoded successfully, if not the token is not valid, deny access
        if (!decodeToken) {
          console.log("Inavlid Token");
          return false;
        }
      
        // check if the user roles is in the list of allowed roles, return true if allowed and false if not allowed
        if(allowedRole !== decodeToken.role)
          this._router.navigate(['/accessdenied']);

        return allowedRole === decodeToken.role;
      }

      this._router.navigate(["login"]);
      return false;
  }
  
}
