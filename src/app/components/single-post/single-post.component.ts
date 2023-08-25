import {Component, Input} from '@angular/core';
import {Post} from "../../services/posts.service";



@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent {
  @Input() post!: Post;

}
