import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Auth} from "../../services/auth";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerFormGroup!: FormGroup;
  errorRegistration = false;

  constructor(
    private fb: FormBuilder,
    private auth: Auth,
    private router: Router
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
    const val = this.registerFormGroup.value;

    this.auth.authRegister(val).subscribe(() => {
      this.registerFormGroup.reset();
      this.router.navigate(['/login']);

    }, error => {
        if (error.status === 500) {
          this.errorRegistration = true;


          this.registerFormGroup.reset();

          setTimeout(() => {
            this.errorRegistration = false;
          }, 3000)

          this.router.navigate(['/register']);
        }
    });
  }

}
