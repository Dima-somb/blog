import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Auth} from "../../services/auth";
import {LoginComponent} from "./login/login.component";
import {RouterModule} from "@angular/router";




@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: 'login', component: LoginComponent}]),
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
