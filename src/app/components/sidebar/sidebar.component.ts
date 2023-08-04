import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Category, PostsService} from "../../services/posts.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  categories$!: Observable<Category[]>;

  constructor(private postsServices: PostsService) {
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.categories$ = this.postsServices.loadCategories();
  }

}
