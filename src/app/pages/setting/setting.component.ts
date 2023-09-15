import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../index";
import {getUser} from "../auth/selectors/auth.selectors";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Auth} from "../auth/services/auth";
import {filter, finalize, mergeMap, Observable} from "rxjs";
import {PostsService} from "../../services/posts.service";
import {ClearObservable} from "../../services/clear-observable";
import {CustomErrorHandlingService} from "../../services/custom-error-handling.service";
import {Router} from "@angular/router";
import {User} from "../auth/reducers";
import {AuthActions} from "../auth/action-types";

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent extends ClearObservable implements OnInit {

  userSetting$!: Observable<User | null>;
  userSettingData!: any;
  selectedPhoto: any;
  updateUserForm!: FormGroup;
  url: any;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private authService: Auth,
    private postsService: PostsService,
    private customErrorHandling: CustomErrorHandlingService,
    private router: Router
  ) {
    super();
  }

 ngOnInit() {

  this.store.select(getUser)
     .pipe(
       filter(Boolean)
     )
     .subscribe(userData => {
       console.log('userData', userData)
       this.userSettingData = userData
       this.initializeForm();
     });
  }

  initializeForm() {
    this.updateUserForm = this.fb.group({
      profilePic: [null],
      username: [null],
      email: [null],
      password: [null]
    });

    if (this.userSettingData && this.userSettingData.userId) {
      this.updateUserForm.patchValue({
        profilePic: this.userSettingData.profilePic || null,
        username: this.userSettingData.username || null,
        email: this.userSettingData.email || null,
        password: ''
      });
    }
  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.selectedPhoto = file;

      this.url = URL.createObjectURL(file);
    }
  }

  onSubmit() {

    const userObj = {
      userId: this.userSettingData.userId,
      profilePic: this.selectedPhoto ? this.selectedPhoto.name : this.userSettingData.profilePic,
      username: this.updateUserForm.get('username')?.value || this.userSettingData.username,
      email: this.updateUserForm.get('email')?.value || this.userSettingData.email,
      password: this.updateUserForm.get('password')?.value || ''
    };

    const formData = new FormData();
    formData.append('file', this.selectedPhoto);


    this.updateUserAndUploadPhoto(userObj, formData)
      .pipe(
        this.customErrorHandling.customErrorHandling(this.destroy$)
      )
      .subscribe(
        () => {
           this.store.dispatch(AuthActions.getUser({user: userObj}))
           localStorage.setItem("user", JSON.stringify(userObj));
           this.router.navigate(['/home']);
        },

      );
  }


  updateUserAndUploadPhoto(userObj:any, formData:any):Observable<any> {
    return this.authService.updateSettingOfUser(userObj)
      .pipe(
        mergeMap(() => this.postsService.uploadPhotoForEachPost(formData)),
        finalize(() => {
        })
      );
  }

}
