import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterComponent} from "./pages/register/register.component";
import {HomeComponent} from "./pages/home/home.component";
import {PostResolver} from "./services/post-resolver";
import {SingleComponent} from "./pages/single/single.component";
import {AuthGuard} from "./pages/auth/services/auth-guard";

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'post/:id',
    component: SingleComponent,
    resolve: {
      post: PostResolver
    }
  },
  {path: 'register', component: RegisterComponent},
  {path: '', redirectTo: '/home', pathMatch: "full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [PostResolver, AuthGuard]
})
export class AppRoutingModule { }
