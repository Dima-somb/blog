import {Component, OnInit} from '@angular/core';
import {PostsService} from "../../services/posts.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AuthState} from "../auth/reducers";
import {getUser} from "../auth/selectors/auth.selectors";
import {ClearObservable} from "../../services/clear-observable";
import {filter, takeUntil} from "rxjs";

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
    private store: Store<AuthState>
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

    //Send new post

    this.postsService.createNewPost(postData)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe();

    // Send image

   const formData = new FormData();
    formData.append('file', this.selectedFile);
    this.postsService.uploadPhotoForEachPost(formData).subscribe()
  }
}

