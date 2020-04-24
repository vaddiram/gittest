import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { UserHomeComponent } from '../user-home/user-home.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-delete-confirm-popup',
  templateUrl: './delete-confirm-popup.component.html',
  styleUrls: ['./delete-confirm-popup.component.css']
})
export class DeleteConfirmPopupComponent implements OnInit {

  constructor(
    public _dialogRef: MatDialogRef<UserHomeComponent>,
    @Inject(MAT_DIALOG_DATA) public _data: string,
    private _userService: UserService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this._dialogRef.close();
  }

  deleteClaim(claimId) {
    this._userService.deleteClaim(claimId).subscribe(
      res => {
        if(res.isDeleted) {
          this._snackBar.open(res.msg, "", { duration: 3000 });
          this._dialogRef.close();
        }
      },
      error => {
        this._snackBar.open("ERROR: In selecting claims", "", { duration: 3000 });
        console.error(error);
      }
    );
  }
}
