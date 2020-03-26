import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public signupForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      email: ["", [Validators.email, Validators.required]],
      password: ["", [Validators.required]],
      cpassword: ["", [Validators.required]]
    }, {validator: isPasswordsMatch});
  }

  onRegistrationFormSubmit() {
    console.log(this.signupForm.value);
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
