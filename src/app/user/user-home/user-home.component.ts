import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatBottomSheet, MatSnackBar } from '@angular/material';
import { ClaimsFormComponent } from '../claims-form/claims-form.component';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

const CLAIMS_DATA: any[] = [
  {id: 1, policyNo: 111, name: "Prasad Babu", totalExpenses: 100, currentStatus: "Pending"},
  {id: 2, policyNo: 222, name: "Manikanta", totalExpenses: 400, currentStatus: "Aproved"},
  {id: 3, policyNo: 333, name: "Ravi Kiran", totalExpenses: 600, currentStatus: "Aproved"},
];

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
  public displayColumns: string[] = ["policyNo", "name", "totalExpenses", "currentStatus", "action"];
  public dataSource: any[] = [];
  public searchForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _bottomSheet: MatBottomSheet,
    private _authService: AuthService,
    private _userService: UserService,
    private _snackBar: MatSnackBar
  ) {
    this.searchForm = this._fb.group({
      email: [null, [Validators.email, Validators.required]]
    });
  }

  ngOnInit() {
    this._userService.getAllClaims(this._authService.currentUser).subscribe(
      claims => {
        this.dataSource = claims;
      },
      error => {
        this._snackBar.open("ERROR: In selecting claims", "", { duration: 3000 });
        console.error(error);
      }
    );
  }

  openClaimsForm(id): void {
    this._bottomSheet.open(ClaimsFormComponent, {
      data: { id }
    });
  }

}
