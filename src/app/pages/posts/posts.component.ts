import {Component, OnInit} from '@angular/core';
import {Post, PostsService} from "../../services/posts.service";
import {ActivatedRoute} from "@angular/router";
import {AppState} from "../../index";
import {Store} from "@ngrx/store";
import {PostActions} from "../../store/action-types";
import {
  selectPostByCategoryName,
  selectPostsByName,
  selectPostsStore
} from "../../store/selectors/posts.selector";


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

    this.route.queryParams.subscribe(({user, cat}) => {
      this.getPostsByUsername(user);
      this.getPostsByCategoryName(cat)
    })
  }

  getPostsByUsername(username: string) {
      if(username) {
        this.store.select(selectPostsByName(username))
          .subscribe(posts => this.postList = posts)
      } else {
        this.store.select(selectPostsStore)
            .subscribe(posts => this.postList = posts);
      }
  }

  getPostsByCategoryName(cat: string) {
    if(cat) {
    this.store.select(selectPostByCategoryName(cat))
        .subscribe(posts => {
          this.postList = posts
        })
    }
  }
}
