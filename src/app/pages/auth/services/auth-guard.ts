import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {map, Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "../../../reducers";
import {isLoggedIn} from "../selectors/auth.selectors";

@Injectable()
export class AuthGuard implements CanActivate {

  isLoggedIn$: Observable<boolean> = this.store.select(isLoggedIn);

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree>{
     return this.isLoggedIn$
       .pipe(
         map((loggedIn) => {
           return loggedIn ? true : this.router.parseUrl('/login')
         })
       )
  }

}
