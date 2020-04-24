import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-claims-form',
  templateUrl: './claims-form.component.html',
  styleUrls: ['./claims-form.component.css']
})
export class ClaimsFormComponent implements OnInit {
  public claimForm: FormGroup;

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<ClaimsFormComponent>,
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _userService: UserService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ) {
    this.claimForm = this._fb.group({
      detailsOfPrimaryInsured: this._fb.group({
        policyNo: ["", [Validators.required]],
        certificateNo: ["", [Validators.required]],
        company: ["", [Validators.required]],
        name: ["", [Validators.required]],
        address: ["", [Validators.required]]
      }),
      detailsOfHospitalization: this._fb.group({
        nameOfHospital: ["", [Validators.required]],
        roomCategory: ["", [Validators.required]],
        hospitalizationDueTo: [""],
        injuryCause: ["", [Validators.required]]
      }),
      detailsOfClaim: this._fb.group({
        preHospitalizationExp: ["", [Validators.required]],
        postHospitalizationExp: ["", [Validators.required]],
        ambulanceCharges: ["", [Validators.required]],
        hospitalizationExp: ["", [Validators.required]]
      }),
      detailsOfPrimaryInsuredBankAccount: this._fb.group({
        pan: ["", [Validators.required]],
        accountNumber: ["", [Validators.required]],
        bankName: ["", [Validators.required]],
        cheque: ["", [Validators.required]],
        ifsc: ["", [Validators.required]]
      })
    });
  }

  ngOnInit() {
    if(this.data.id !== null) {
      this._userService.getSingleClaim(this.data.id).subscribe(
        claimData => {
          // console.log(claimData);
          this.claimForm.setValue(claimData);
        }
      );
    }
  }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    // event.preventDefault();
  }

  onClaimFormSubmit(){
    if(this.data.id === null) {
      let dt = new Date();
      // let dtStr = dt.getMonth() + 1 + "-" + dt.getDate() + "-" + dt.getFullYear();

      this._userService.addClaim({
        ...this.claimForm.value,
        creationDate: dt,
        status: "Pending",
        user: this._authService.currentUser
      }).subscribe(
        res => {
          if(res.inserted) {
            this._snackBar.open(res.msg, "", { duration: 3000 });
            this._bottomSheetRef.dismiss();
          }
        },
        error => {
          this._snackBar.open("ERROR: In saving claim", "", { duration: 3000 });
          console.error(error);
        }
      );
    } else {
      this._userService.updateClaim(this.data.id, this.claimForm.value).subscribe(
        res => {
          if(res.isUpdated) {
            this._snackBar.open(res.msg, "", { duration: 3000 });
            this._bottomSheetRef.dismiss();
          }
        },
        error => {
          this._snackBar.open("ERROR: In saving claim", "", { duration: 3000 });
          console.error(error);
        }
      );
    }
  }

}
