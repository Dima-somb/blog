import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {Post} from "../../models/models";
import {Store} from "@ngrx/store";
import {AuthState} from "../../pages/auth/reducers";
import {getUser} from "../../pages/auth/selectors/auth.selectors";
import {Router} from "@angular/router";
import {PostsService} from "../../services/posts.service";
import {filter, takeUntil} from "rxjs";
import {ClearObservable} from "../../services/clear-observable";
import {PostActions} from "../../store/action-types";
import {FormControl} from "@angular/forms";
import {CustomErrorHandlingService} from "../../services/custom-error-handling.service";
import {configData} from "../../config/config";




@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent extends ClearObservable implements OnInit{
  @Input() post!: Post;
  userName!: string;

  isEditMode = false;

  titleControl: FormControl;
  descControl: FormControl;
  config = configData;

  constructor(
    private store: Store<AuthState>,
    private router: Router,
    private postsService: PostsService,
    private cdr: ChangeDetectorRef,
    private customErrorHandling: CustomErrorHandlingService
  ) {

    super();

    this.titleControl = new FormControl('');
    this.descControl = new FormControl('');
  }

  ngOnInit() {
    this.store.select(getUser)
      .pipe(
        filter(Boolean),
        takeUntil(this.destroy$)
      )
      .subscribe(user => this.userName = user.username);
  }

  removePost() {
    if (this.userName && this.userName === this.post.username) {
      this.postsService.deletePost(this.userName, this.post._id)
        .pipe(
          this.customErrorHandling.customErrorHandling(this.destroy$)
        )
        .subscribe(
          () => {
            this.store.dispatch(PostActions.resetPostsState());

            this.router.navigate(['/home']);
          });
    }
  }

  updatePost() {
    const formFields = {title: this.titleControl.value, desc: this.descControl.value};

    if (this.userName && this.userName === this.post.username) {
      if (
        formFields.title.trim() !== this.post.title.trim() ||
        formFields.desc.trim() !== this.post.desc.trim()
      ) {

        const updatedPostResult = Object.assign({}, this.post);

        updatedPostResult.title = formFields.title;
        updatedPostResult.desc = formFields.desc;


        this.postsService.updateExistingPost(this.userName, updatedPostResult)
          .pipe(
            this.customErrorHandling.customErrorHandling(this.destroy$)
          )
          .subscribe(
            () => {
              this.store.dispatch(PostActions.resetPostsState());

              this.post = updatedPostResult;

              this.router.navigate(['post/', this.post._id]);

              this.isEditMode = false;

              this.cdr.detectChanges();
            });
      }
    }
  }

  editPost() {
    this.isEditMode = !this.isEditMode;

    this.titleControl.setValue(this.post.title);
    this.descControl.setValue(this.post.desc);

    this.updatePost();

  }
}
