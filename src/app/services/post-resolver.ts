import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Post, PostsService} from "./posts.service";
import {Observable, of} from "rxjs";

@Injectable()
export class PostResolver implements Resolve<Post> {

  constructor(private postsService: PostsService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Post> | Promise<Post> | Post {

    const postId = route.paramMap.get("id");

    return this.postsService.loadPostById(postId);
  }

}
