import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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

  @ViewChild('myLinks', { static: false }) myLinks!: ElementRef;


  constructor(
    private store: Store<AppState>,
  ) {
  }

  ngOnInit() {
  }

  logout() {
    this.store.dispatch(logout());
  }


  toggleMyLinks() {
    const x = this.myLinks.nativeElement as HTMLElement;
    if (x.style.display === 'block') {
      x.style.display = 'none';
    } else {
      x.style.display = 'block';
    }
  }
}
