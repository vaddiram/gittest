import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  logout() {
    this._authService.logout();
    this._router.navigate(["login"]);
  }

}
