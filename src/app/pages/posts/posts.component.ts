import {Component, OnInit} from '@angular/core';
import {Post, PostsService} from "../../services/posts.service";
import {Observable, tap} from "rxjs";
import {ActivatedRoute, Params} from "@angular/router";
import {arrRemove} from "rxjs/internal/util/arrRemove";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit{

  posts$!: Observable<Post[]>;

  constructor(private postsService: PostsService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    // this.reloadPosts();

    this.route.queryParams.subscribe((data) => {
      this.reloadPosts(data);
    })
  }


  reloadPosts(paramsList?: Params) {
    this.posts$ = this.postsService.loadAllPosts(paramsList);
  }
}
