import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public signupForm: FormGroup;
  public serverError: string;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _snackBar: MatSnackBar,
    private _router: Router
  ) { }

  ngOnInit() {
    this.signupForm = this._fb.group({
      email: ["", [Validators.email, Validators.required]],
      password: ["", [Validators.required]],
      cpassword: ["", [Validators.required]]
    }, {validator: isPasswordsMatch});
  }

  onRegistrationFormSubmit() {
    const userCredentials = {
      email: this.signupForm.value.email,
      password: this.signupForm.value.password
    }

    this._authService.signUp(userCredentials).subscribe(
      (res) => {
        if (res.isRegistered) {
          this._snackBar.open(res.msg, "", { duration: 3000 });
          this.signupForm.reset();
          this._router.navigate(['/login']);
        } else {
          this._snackBar.open(res.msg, "", { duration: 3000 });
        }
      },
      (error) => {
        this._snackBar.open("ERROR: In connecting to the server", "", { duration: 2000 });
        console.error(error);
      }
    );
  }
}

function isPasswordsMatch(control: AbstractControl): {[key: string]: boolean} | null {
  const password = control.get("password");
  const confirmPassword = control.get("cpassword");

  if(password.pristine || confirmPassword.pristine)
    return null;

  if(password && confirmPassword && password.value !== confirmPassword.value)
    return { "misMatch": true }
  else
    return null;
}
