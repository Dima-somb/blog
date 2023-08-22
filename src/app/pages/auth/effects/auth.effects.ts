import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthActions } from "../action-types";
import { tap } from "rxjs";
import { Router } from "@angular/router";

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private router: Router) {}

  login$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.login),
        tap(({user, redirect}) => {
          localStorage.setItem("user", JSON.stringify(user));

          if(redirect) {
             this.router.navigate(["/home"]);
          }
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      tap((action) => {
        localStorage.removeItem("user");
        this.router.navigate(["/login"]);
      })
    ),
    { dispatch: false }
  );
}
