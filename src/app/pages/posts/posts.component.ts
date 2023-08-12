import {Component, Input, OnInit} from '@angular/core';
import {Post, PostsService} from "../../services/posts.service";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit{

  @Input() postsList!: Post[] | null;
  // posts$!: Observable<Post[]>;

  constructor(private postsService: PostsService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    console.log('postsList', this.postsList);
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
