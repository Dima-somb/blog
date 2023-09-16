import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../index";
import {getUser} from "../auth/selectors/auth.selectors";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Auth} from "../auth/services/auth";
import {Observable} from "rxjs";
import {PostsService} from "../../services/posts.service";
import {ClearObservable} from "../../services/clear-observable";
import {CustomErrorHandlingService} from "../../services/custom-error-handling.service";
import {Router} from "@angular/router";
import {User} from "../auth/reducers";
import {AuthActions} from "../auth/action-types";
import {CommonService} from "../../services/common.service";


@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent extends ClearObservable implements OnInit {

  userSetting$!: Observable<User | null>;
  userSettingData!: User | null;
  selectedPhoto!: File;
  updateUserForm!: FormGroup;
  url!: string;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private authService: Auth,
    private postsService: PostsService,
    private customErrorHandling: CustomErrorHandlingService,
    private router: Router,
    private commonService: CommonService
  ) {
    super();
  }

  ngOnInit() {
    this.initUserSettingData();
  }


  initUserSettingData() {
    this.store.select(getUser)
      .pipe(
        this.customErrorHandling.customErrorHandling(this.destroy$)
      )
      .subscribe(userData => {
        console.log('userData', userData)
        this.userSettingData = userData;

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

    this.setUpPropertyForFormField();
  }

  setUpPropertyForFormField() {
    if (this.userSettingData && this.userSettingData?._id || this.userSettingData?.userId) {
      this.updateUserForm.patchValue({
        profilePic: this.userSettingData?.profilePic || null,
        username: this.userSettingData?.username || null,
        email: this.userSettingData?.email || null,
        password: ''
      });
    }
  }

  onFileSelect(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      this.selectedPhoto = file;

      this.url = URL.createObjectURL(file);
    }
  }

  createUserObj() {
    return  {
      userId: this.userSettingData?._id || this.userSettingData?.userId,
      profilePic: this.selectedPhoto ? this.selectedPhoto.name : this.userSettingData?.profilePic,
      username: this.updateUserForm.get('username')?.value || this.userSettingData?.username,
      email: this.updateUserForm.get('email')?.value || this.userSettingData?.email,
      password: this.updateUserForm.get('password')?.value || ''
    };
  }

  onSubmit() {
    const userObj = this.createUserObj();
    const formData = new FormData();

    formData.append('file', this.selectedPhoto);

    this.updateUserAndUploadPhoto(userObj, formData)
      .pipe(
        this.customErrorHandling.customErrorHandling(this.destroy$)
      )
      .subscribe(
        () => {
          this.store.dispatch(AuthActions.getUser({user: userObj}));
          localStorage.setItem("user", JSON.stringify(userObj));

          this.router.navigate(['/home']);
        },

      );
  }

  updateUserAndUploadPhoto(userObj:any, formData:any) {
    return this.commonService.makeApiCallAndUploadPhoto(this.authService.updateSettingOfUser(userObj), formData)
  }

}
