import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';

@Component({
  selector: 'app-claims-form',
  templateUrl: './claims-form.component.html',
  styleUrls: ['./claims-form.component.css']
})
export class ClaimsFormComponent implements OnInit {

  constructor(
    private bottomSheetRef: MatBottomSheetRef<ClaimsFormComponent>
  ) { }

  ngOnInit() {
  }

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

}
