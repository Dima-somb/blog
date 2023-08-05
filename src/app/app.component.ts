import {Component, OnInit} from '@angular/core';
import {AppState} from "./reducers";
import {Store} from "@ngrx/store";
import {map, Observable} from "rxjs";

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

  }
}
