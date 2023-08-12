import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {PostsService} from "../../services/posts.service";
import {PostActions} from "../action-types";
import {catchError, map, mergeMap, of} from "rxjs";

@Injectable()
export class PostsEffects {

  constructor(private actions$: Actions, private postsService: PostsService) {}

  loadAllPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.loadAllPosts),
      mergeMap(() =>
        this.postsService.loadAllPosts().pipe(
          map(posts => PostActions.loadAllPostsSuccess({ posts } )),
          catchError(error => of(PostActions.loadAllPostsFailure({ error })))
        )
      )
    )
  );
}
