import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, shareReplay, tap} from "rxjs";
import {Params} from "@angular/router";



export interface Post  {
  _id: string;
  title: string;
  desc: string;
  username: string;
  categories: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Category {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}


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

}
