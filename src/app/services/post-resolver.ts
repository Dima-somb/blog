import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Post, PostsService} from "./posts.service";
import {filter, first, map, Observable, of, tap} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "../index";
import {PostActions} from "../store/action-types";
import {selectPostByIdStore} from "../store/selectors/posts.selector";

@Injectable()
export class PostResolver implements Resolve<Post> {

  constructor(private postsService: PostsService, private store: Store<AppState>) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Post> {

    const postId = route.paramMap.get("id");

    this.store.dispatch(PostActions.loadPostByID({id: postId}));

     return this.store.select(selectPostByIdStore).pipe(
       first(),
       filter(post => post !== null),
       map(post => post!)
     );
  }

}
