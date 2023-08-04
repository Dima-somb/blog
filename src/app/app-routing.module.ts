import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterComponent} from "./pages/register/register.component";
import {HomeComponent} from "./pages/home/home.component";
import {PostResolver} from "./services/post-resolver";
import {SingleComponent} from "./pages/single/single.component";

const routes: Routes = [
  { path: '', component: HomeComponent},
  {
    path: 'post/:id',
    component: SingleComponent,
    resolve: {
      post: PostResolver
    }
  },
  // {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [PostResolver]
})
export class AppRoutingModule { }
