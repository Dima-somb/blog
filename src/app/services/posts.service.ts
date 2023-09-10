import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, shareReplay} from "rxjs";
import {Params} from "@angular/router";
import {Category, Post} from "../models/models";


@Injectable({
  providedIn: 'root'
})
export class PostsService {

  baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }


  loadAllPosts(paramsList?: Params): Observable<Post[]> {

    let params = new HttpParams();

    if(paramsList) {
      Object.entries(paramsList).forEach(([key, value]) => {
        params = params.append(key, value as string);
      })

    }
    return this.http.get<Post[]>(`${this.baseUrl}/posts`, {params})
      .pipe(
        shareReplay()
      )
  }


  loadPostById(id: string | null): Observable<Post> {
    return this.http.get<Post>(`${this.baseUrl}/posts/${id}`)
      .pipe(
        shareReplay()
      )
  }

  loadCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/categories`)
      .pipe(
        shareReplay()
      )
  }


  createNewPost(postData: any): Observable<Post> {
    return this.http.post<Post>(`${this.baseUrl}/posts/`,  postData);
  }

  updateExistingPost(username: string, {title, desc, _id}: any): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/posts/${_id}`,{
        username: username,
        title,
        desc
    });
  }

  uploadPhotoForEachPost(file: any): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/upload`, file);
  }

  deletePost(username: string,id: string) {
    return this.http.delete<void>(`${this.baseUrl}/posts/${id}`, {
      body: {username: username}
    });
  }

}
