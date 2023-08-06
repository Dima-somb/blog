import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PostsComponent } from './pages/posts/posts.component';
import { PostComponent } from './components/post/post.component';
import { SingleComponent } from './pages/single/single.component';
import { SinglePostComponent } from './components/single-post/single-post.component';
import { WriteComponent } from './pages/write/write.component';
import { SettingComponent } from './pages/setting/setting.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {AuthModule} from "./pages/auth/auth.module";
import {metaReducers, reducers} from "./reducers";
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    HeaderComponent,
    SidebarComponent,
    PostsComponent,
    PostComponent,
    SingleComponent,
    SinglePostComponent,
    WriteComponent,
    SettingComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AuthModule.forRoot(),
    StoreModule.forRoot(reducers, {metaReducers}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
