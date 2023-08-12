import {Post} from "../../services/posts.service";
import {createReducer, on} from "@ngrx/store";
import {PostActions} from "../action-types";
import {state} from "@angular/animations";

export interface PostState {
  posts: Post[];
  selectedPost: Post | null;
  error: string | null
}

export const initialState: PostState = {
  posts: [],
  selectedPost: null,
  error: null
}

export const postReducer = createReducer(
  initialState,

  //GET POSTS
  on(PostActions.loadAllPosts, state => ({
    ...state,
  })),
  on(PostActions.loadAllPostsSuccess,  (state,{ posts }) => ({
    ...state,
    posts
  })),
  on(PostActions.loadAllPostsFailure,  (state, { error }) => ({
    ...state,
    error
  })),

  //GET POST BY ID

  on(PostActions.loadPostByID, state => ({
    ...state,
  })),
  on(PostActions.loadPostByIDSuccess, (state, { post }) => ({
    ...state,
    selectedPost: post
  })),on(PostActions.loadPostByIDFailure, (state, { error }) => ({
    ...state,
    error
  })),

);
