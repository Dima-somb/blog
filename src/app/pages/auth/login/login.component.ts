import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Auth} from "../services/auth";
import {filter, noop, takeUntil, tap} from "rxjs";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {AppState} from "../../../index";
import {AuthActions} from "../action-types";
import {ClearObservable} from "../../../services/clear-observable";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends ClearObservable implements OnInit {

  loginForm!: FormGroup;
  errorMessage = "";

  constructor(
    private fb: FormBuilder,
    private auth: Auth,
    private router: Router,
    private store: Store<AppState>
  ) {
    super()
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['' , [Validators.required]],
      password: ['' , [Validators.required]],
    });
  }

  login() {

    const value = this.loginForm.value;

    this.auth.authLogin(value)
      .pipe(
        filter(Boolean),
        takeUntil(this.destroy$),
        tap(user =>
            this.store.dispatch(AuthActions.login({user, redirect: true}))
        )
      )
      .subscribe(
        noop,
        () => {
          this.errorMessage = "Invalid username or password";
          this.loginForm.reset();

          setTimeout(() => {
            this.errorMessage = '';
          }, 2000)
        }
      )
  }
}
