import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatBottomSheet, MatSnackBar, MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { ClaimsFormComponent } from '../claims-form/claims-form.component';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { DeleteConfirmPopupComponent } from '../delete-confirm-popup/delete-confirm-popup.component';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
  public displayColumns: string[] = ["policyNo", "name", "totalExpenses", "currentStatus", "action"];
  public dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public searchForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _bottomSheet: MatBottomSheet,
    private _authService: AuthService,
    private _userService: UserService,
    private _snackBar: MatSnackBar,
    public _dialog: MatDialog
  ) {
    this.searchForm = this._fb.group({
      creationDate: ["", [Validators.required]],
      status: ["", [Validators.required]],
      name: ["", [Validators.required]]
    });
  }

  ngOnInit() {
    this.loadClaims();
  }

  openClaimsForm(id): void {
    this._bottomSheet.open(ClaimsFormComponent, {
      data: { id }
    });
  }

  openDeleteConfirm(id): void {
    const dialogRef = this._dialog.open(DeleteConfirmPopupComponent, {
      width: "300px",
      data: { id }
    });
  }

  loadClaims() {
    this._userService.getAllClaims(this._authService.currentUser).subscribe(
      claims => {
        this.dataSource = new MatTableDataSource<any>(claims);
        this.dataSource.paginator = this.paginator;
      },
      error => {
        this._snackBar.open("ERROR: In selecting claims", "", { duration: 3000 });
        console.error(error);
      }
    );
  }

  onSearchFormSubmit(formDirective) {
    let searchData = {
      date: this.searchForm.value.creationDate.getMonth() + 1 + "-" + this.searchForm.value.creationDate.getDate() + "-" + this.searchForm.value.creationDate.getFullYear(),
      status: this.searchForm.value.status,
      name: this.searchForm.value.name,
      user: this._authService.currentUser
    }

    this._userService.searchClaims(searchData).subscribe(
      serachClaims => {
        this.dataSource = serachClaims;
      },
      error => {
        this._snackBar.open("ERROR: In searching claims", "", { duration: 3000 });
        console.error(error);
      }
    );

    formDirective.resetForm();
    this.searchForm.reset();
  }

}
