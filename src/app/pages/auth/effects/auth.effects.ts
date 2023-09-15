import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthActions } from "../action-types";
import {catchError, map, mergeMap, of, switchMap, tap, withLatestFrom} from "rxjs";
import { Router } from "@angular/router";
import {PostActions} from "../../../store/action-types";
import {selectPostsStore} from "../../../store/selectors/posts.selector";
import {Auth} from "../services/auth";
import {AppState} from "../../../index";
import {Store} from "@ngrx/store";
import {getUserSuccess} from "../actions/auth.actions";

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private router: Router, private authService: Auth, private store: Store<AppState>) {}

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


  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.getUser),
      switchMap((action) => {
        return this.authService.getUser(action.user).pipe(
            map(user => AuthActions.getUserSuccess({ user })),
            catchError(error => of(AuthActions.getUserFailure({ error })))
          );
      })
    ),
  );
}
