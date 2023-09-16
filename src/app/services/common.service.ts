import { Injectable } from '@angular/core';
import {finalize, mergeMap, Observable} from "rxjs";
import {PostsService} from "./posts.service";


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
      private postsService: PostsService,
  ) { }

  makeApiCallAndUploadPhoto(serviceApiCall: Observable<any>, formData: any) {
    return serviceApiCall.pipe(
      mergeMap(() => this.postsService.uploadPhotoForEachPost(formData)),
      finalize(() => {
      })
    );
  }
}
