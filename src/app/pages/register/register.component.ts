import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Auth} from "../../services/auth";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerFormGroup!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: Auth
  ) {

  }


  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.registerFormGroup = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }


  submitForm() {
    console.log('click');
    const val = this.registerFormGroup.value;

    // this.auth.authRegister(val);
  }

}
