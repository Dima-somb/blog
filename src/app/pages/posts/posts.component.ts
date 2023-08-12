import {Component, Input, OnInit} from '@angular/core';
import {Post, PostsService} from "../../services/posts.service";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {AppState} from "../../index";
import {Store} from "@ngrx/store";
import {PostActions} from "../../store/action-types";
import {selectPostsStore} from "../../store/selectors/posts.selector";
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit{

  @Input() postsList!: Post[] | null;
  // posts$!: Observable<Post[]>;

  postList$: Observable<Post[]> = this.store.select(selectPostsStore);

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute,
    private store: Store<AppState>
    ) {
  }

  ngOnInit() {

    this.route.queryParams.subscribe((data) => {
      this.store.dispatch(PostActions.loadAllPosts(data))
    })



    // this.reloadPosts();

    // TODO: Fix get data using queryParams by NgRx
    // this.route.queryParams.subscribe((data) => {
    //   this.reloadPosts(data);
    // })
  }


  // reloadPosts(paramsList?: Params) {
  //   this.posts$ = this.postsService.loadAllPosts(paramsList);
  // }
}
