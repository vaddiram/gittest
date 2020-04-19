import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatTableDataSource, MatPaginator } from '@angular/material';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.css']
})
export class ClaimsComponent implements OnInit {
  public displayColumns: string[] = ["policyNo", "name", "totalExpenses", "currentStatus", "action"];
  public dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public searchForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _adminService: AdminService,
    private _snackBar: MatSnackBar
  ) {
    this.searchForm = this._fb.group({
      policyNo: ["", [Validators.required]],
      userEmail: ["", [Validators.required]]
    });
  }

  ngOnInit() {
    this.loadAllUsersClaims();
  }

  loadAllUsersClaims() {
    this._adminService.getAllUsersClaims().subscribe(
      claims => {
        // console.log(claims);
        this.dataSource = new MatTableDataSource<any>(claims);
        this.dataSource.paginator = this.paginator;
      },
      error => {
        this._snackBar.open("ERROR: In selecting claims", "", { duration: 3000 });
        console.error(error);
      }
    );
  }

  // onSearchFormSubmit(formDirective) {
  //   let searchData = {
  //     date: this.searchForm.value.creationDate.getMonth() + 1 + "-" + this.searchForm.value.creationDate.getDate() + "-" + this.searchForm.value.creationDate.getFullYear(),
  //     status: this.searchForm.value.status,
  //     name: this.searchForm.value.name,
  //     user: this._authService.currentUser
  //   }

  //   this._userService.searchClaims(searchData).subscribe(
  //     serachClaims => {
  //       this.dataSource = serachClaims;
  //     },
  //     error => {
  //       this._snackBar.open("ERROR: In searching claims", "", { duration: 3000 });
  //       console.error(error);
  //     }
  //   );

  //   formDirective.resetForm();
  //   this.searchForm.reset();
  // }
}
