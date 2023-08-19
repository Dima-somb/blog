import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Category} from "../../services/posts.service";
import {AppState} from "../../index";
import {Store} from "@ngrx/store";
import {selectCategories} from "../../store/selectors/posts.selector";
import {PostActions} from "../../store/action-types";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  categories$: Observable<Category[] | null> = this.store.select(selectCategories);

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(PostActions.loadAllCategories());
  }
}
