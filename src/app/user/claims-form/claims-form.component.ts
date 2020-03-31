import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

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
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ) { }

  ngOnInit() {
    
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
        hospitalizationDueTo: ["", [Validators.required]],
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

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  onClaimFormSubmit(){

  }

}
