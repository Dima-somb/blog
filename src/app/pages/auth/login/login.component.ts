import { Component } from '@angular/core';
import {PostsService} from "../../../services/posts.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private auth: PostsService) {
  }

}
