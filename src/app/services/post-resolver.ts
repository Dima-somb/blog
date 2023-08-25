import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Post, PostsService} from "./posts.service";
import {map, Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "../index";
import {PostActions} from "../store/action-types";

@Injectable()
export class PostResolver implements Resolve<Post> {

  constructor(private postsService: PostsService, private store: Store<AppState>) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Post> {

    const postId = route.paramMap.get("id");

    return this.postsService.loadPostById(postId).pipe(
      map(post => {
          this.store.dispatch(PostActions.loadPostByIDSuccess({post}))
          return post;
        }
      ))
  }
}
