import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Auth} from "../auth/services/auth";
import {Router} from "@angular/router";
import {filter, takeUntil} from "rxjs";
import {ClearObservable} from "../../services/clear-observable";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends ClearObservable implements OnInit {

  registerFormGroup!: FormGroup;
  errorRegistration = false;

  constructor(
    private fb: FormBuilder,
    private auth: Auth,
    private router: Router
  ) {
    super();
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

    this.auth.authRegister(val)
      .pipe(
        filter(Boolean),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
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
