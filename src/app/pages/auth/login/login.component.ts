import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Auth} from "../services/auth";
import {noop, tap} from "rxjs";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {AppState} from "../../../reducers";
import {login} from "../actions/auth.actions";
import {AuthActions} from "../action-types";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: Auth,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['' , [Validators.required]],
      password: ['' , [Validators.required]],
    });
  }

  login() {

    console.log('click')
    const value = this.loginForm.value;

    this.auth.authLogin(value)
      .pipe(
        tap(user => {

          this.store.dispatch(AuthActions.login({user}))


          this.router.navigate(['/'])
        })
      )
      .subscribe(
        noop,
        () => console.log('Login Failed')
      )
  }
}
