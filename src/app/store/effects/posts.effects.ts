import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {PostsService} from "../../services/posts.service";
import {PostActions} from "../action-types";
import {catchError, concatMap, map, mergeMap, of, withLatestFrom} from "rxjs";
import {AppState} from "../../index";
import {Store} from "@ngrx/store";
import {selectPostsStore} from "../selectors/posts.selector";

@Injectable()
export class PostsEffects {

  constructor(
    private actions$: Actions,
    private postsService: PostsService,
    private store: Store<AppState>
  ) {}

  loadAllPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.loadAllPosts),
      withLatestFrom(this.store.select(selectPostsStore)),
      mergeMap(([action, posts]) => {
        if (posts.length > 0) {
          return of(); // No need to proceed, return an empty observable
        } else {
          return this.postsService.loadAllPosts().pipe(
            map(loadedPosts => PostActions.loadAllPostsSuccess({ posts: loadedPosts })),
            catchError(error => of(PostActions.loadAllPostsFailure({ error })))
          );
        }
      })
    )
  );

  loadAllPostById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.loadPostByID),
      mergeMap(({id}) =>
        this.postsService.loadPostById(id).pipe(
          map(post => PostActions.loadPostByIDSuccess({ post }))
        )
      )
    )
  );
}
