import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../models/models";
import {Store} from "@ngrx/store";
import {AuthState} from "../../pages/auth/reducers";
import {getUser} from "../../pages/auth/selectors/auth.selectors";
import {Router} from "@angular/router";
import {PostsService} from "../../services/posts.service";
import {catchError, filter, takeUntil, throwError} from "rxjs";
import {ClearObservable} from "../../services/clear-observable";
import {PostActions} from "../../store/action-types";




@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent extends ClearObservable implements OnInit{
  @Input() post!: Post;
  userName!: string;

  constructor(
    private store: Store<AuthState>,
    private router: Router,
    private postsService: PostsService
  ) {

    super();
  }

  ngOnInit() {
    this.store.select(getUser)
      .pipe(
        filter(Boolean),
        takeUntil(this.destroy$)
      )
      .subscribe(user => this.userName = user.username);
  }

  removePost() {
    console.log('this.userName', this.userName);
    console.log('this.post._id', this.post._id);
    if (this.userName && this.userName === this.post.username) {
      this.postsService.deletePost(this.userName, this.post._id)
        .pipe(
          takeUntil(this.destroy$),
          catchError((error) => {
            console.log('An error occurred: ', error);
            return throwError(error);
          })
        )
        .subscribe(
          () => {
            this.store.dispatch(PostActions.resetPostsState());

            this.router.navigate(['/home']);
          });
    }
  }
}
