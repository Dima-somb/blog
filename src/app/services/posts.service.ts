import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, shareReplay} from "rxjs";



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


@Injectable({
  providedIn: 'root'
})
export class PostsService {

  baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  loadAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}/posts`)
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
}
