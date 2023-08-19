import {Component, Input, OnInit} from '@angular/core';
import {Post, PostsService} from "../../services/posts.service";
import {ActivatedRoute} from "@angular/router";
import {Observable, of} from "rxjs";
import {AppState} from "../../index";
import {Store} from "@ngrx/store";
import {PostActions} from "../../store/action-types";
import {selectPostsByName, selectPostsStore} from "../../store/selectors/posts.selector";
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit{

  postList!: Post[];

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute,
    private store: Store<AppState>
    ) {
  }

  ngOnInit() {
    this.store.dispatch(PostActions.loadAllPosts());

    this.route.queryParams.subscribe(({user}) => {
      this.getPosts(user);
    })
  }

  getPosts(username: string) {
      if(username) {
        this.store.select(selectPostsByName(username))
          .subscribe(posts => this.postList = posts)
      } else {
        this.store.select(selectPostsStore)
            .subscribe(posts => this.postList = posts);
      }
  }
}
