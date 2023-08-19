import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../services/posts.service";



@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit{



  @Input() post!: Post;

  constructor() {
  }

  ngOnInit() {

  }

  // filterPostsOnHomeComp() {
  //   this.store.select(selectPostByName(this.post.username)).subscribe();
  //   this.router.navigate(['/home']);
  // }
}
