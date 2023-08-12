import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../index";
import {Observable} from "rxjs";
import {Post} from "../../services/posts.service";
import {selectPostsStore} from "../../store/selectors/posts.selector";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  postList$: Observable<Post[]> = this.store.select(selectPostsStore);

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    // this.store.dispatch(PostActions.loadAllPosts({data: null}));
  }

}
