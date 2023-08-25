import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AppState} from "../../index";
import {Store} from "@ngrx/store";
import {selectPostByIdStore} from "../../store/selectors/posts.selector";
import {filter, takeUntil} from "rxjs";
import {ClearObservable} from "../../services/clear-observable";
import {Post} from "../../models/models";

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss']
})
export class SingleComponent extends ClearObservable implements OnInit  {

  post!: Post;

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {
    super()
  }

  ngOnInit(): void {

    this.store.select(selectPostByIdStore)
      .pipe(
        filter(Boolean),
        takeUntil(this.destroy$)
      )
      .subscribe((p) => {
        this.post = p;
    });
  }

}
