import {Component, OnInit} from '@angular/core';
import {Post, PostsService} from "../../services/posts.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit{

  posts$!: Observable<Post[]>;

  constructor(private postsService: PostsService) {
  }

  ngOnInit() {
    this.reloadPosts();
  }


  reloadPosts() {
    this.posts$ = this.postsService.loadAllPosts();
  }
}
