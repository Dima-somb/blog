import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {map, Observable, tap} from "rxjs";
import {AppState} from "../../reducers";
import {isLoggedIn, isLoggedOut} from "../../pages/auth/selectors/auth.selectors";
import {logout} from "../../pages/auth/actions/auth.actions";
import {Router} from "@angular/router";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{

  isLoggedIn$: Observable<boolean> = this.store.select(isLoggedIn);

  isLoggedOut$: Observable<boolean> = this.store.select(isLoggedOut);


  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  logout() {
    this.store.dispatch(logout());

    this.router.navigate(['/login']);
  }
}
