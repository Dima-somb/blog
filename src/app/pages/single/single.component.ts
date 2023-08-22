import {Component, OnInit} from '@angular/core';
import {Post} from "../../services/posts.service";
import {ActivatedRoute} from "@angular/router";
import {AppState} from "../../index";
import {Store} from "@ngrx/store";
import {selectPostByIdStore} from "../../store/selectors/posts.selector";
import {filter} from "rxjs";

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss']
})
export class SingleComponent implements OnInit{

  post!: Post;

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {
  }

  ngOnInit(): void {
    // this.post = this.route.snapshot.data["post"];


    this.store.select(selectPostByIdStore).pipe(
      filter(Boolean)
    ).subscribe((p) => {
      this.post = p;
    });
  }

}
