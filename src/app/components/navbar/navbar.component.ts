import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {AppState} from "../../index";
import {getUser, isLoggedIn, isLoggedOut} from "../../pages/auth/selectors/auth.selectors";
import {logout} from "../../pages/auth/actions/auth.actions";
import {User} from "../../pages/auth/reducers";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{

  isLoggedIn$: Observable<boolean> = this.store.select(isLoggedIn);
  isLoggedOut$: Observable<boolean> = this.store.select(isLoggedOut);

  user$: Observable<User | null> = this.store.select(getUser);


  constructor(
    private store: Store<AppState>,
  ) {
  }

  ngOnInit() {
  }

  logout() {
    this.store.dispatch(logout());
  }
}
