import {Component, OnInit} from '@angular/core';
import {AppState} from "./index";
import {Store} from "@ngrx/store";
import {login} from "./pages/auth/actions/auth.actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'blog';


  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {

    const userProfile = localStorage.getItem("user");

    if (userProfile) {
      this.store.dispatch(login({user: JSON.parse(userProfile), redirect: false}));
    }

  }
}
