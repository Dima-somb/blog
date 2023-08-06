import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Auth} from "./services/auth";
import {LoginComponent} from "./login/login.component";
import {RouterModule} from "@angular/router";
import {StoreModule} from "@ngrx/store";
import {authReducer} from "./reducers";
import {ReactiveFormsModule} from "@angular/forms";




@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([{path: 'login', component: LoginComponent}]),
    StoreModule.forFeature(
      'auth',
      authReducer,
    )
  ],
  exports: [LoginComponent]
})
export class AuthModule {
  static forRoot(): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [
        Auth
      ]
    }
  }
}
