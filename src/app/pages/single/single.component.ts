import {Component, OnInit} from '@angular/core';
import {Post} from "../../services/posts.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss']
})
export class SingleComponent implements OnInit{

  post!: Post;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.post = this.route.snapshot.data["post"];
  }

}
