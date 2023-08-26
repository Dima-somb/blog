import {Component, OnInit} from '@angular/core';
import {PostsService} from "../../services/posts.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AuthState} from "../auth/reducers";
import {getUser} from "../auth/selectors/auth.selectors";
import {ClearObservable} from "../../services/clear-observable";
import {catchError, filter, finalize, mergeMap, Observable, takeUntil, throwError} from "rxjs";
import {PostActions} from "../../store/action-types";
import {Router} from "@angular/router";
import {AppState} from "../../index";
import {PostResolver} from "../../services/post-resolver";


@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.scss']
})
export class WriteComponent extends ClearObservable implements OnInit{

  uploadPostForm!: FormGroup;
  selectedFile!: any;
  url: any;
  username!: string;

  constructor(
    private postsService:PostsService,
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router,
  ) {
    super()
  }

  ngOnInit() {
    this.uploadPostForm = this.fb.group({
      imgFile: [''],
      title: [''],
      description: [''],
    });

    this.store.select(getUser)
      .pipe(
        takeUntil(this.destroy$),
        filter(Boolean)
      )
      .subscribe((user) => this.username = user.username)
  }


  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.selectedFile = file;

      console.log('this.selectedFile', this.selectedFile)
      this.url = URL.createObjectURL(file);
    }
  }

  onSubmit() {
    const postData = {
      username: this.username,
      title: this.uploadPostForm.get('title')?.value,
      desc: this.uploadPostForm.get('description')?.value,
      imgname: this.selectedFile.name
    };

    const formData = new FormData();
    formData.append('file', this.selectedFile);


    this.createPostAndUploadPhoto(postData, formData)
      .pipe(
        filter(Boolean),
        takeUntil(this.destroy$),
        catchError((error) => {
          console.log('An error occurred: ', error);
          return throwError(error);
        })
      )
      .subscribe(
        () => {
          this.store.dispatch(PostActions.resetPostsState());
          this.router.navigate(['/home']);
        },

      );
  }

  createPostAndUploadPhoto(postData:any, formData:any):Observable<any> {
    return this.postsService.createNewPost(postData)
      .pipe(
        mergeMap(() => this.postsService.uploadPhotoForEachPost(formData)),
        finalize(() => {
        })
      );
  }
}

