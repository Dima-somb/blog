import {Post} from "../../services/posts.service";
import {createReducer, on} from "@ngrx/store";
import {PostActions} from "../action-types";

export interface PostState {
  posts: Post[];
  error: string | null
}

export const initialState: PostState = {
  posts: [],
  error: null
}

export const postReducer = createReducer(
  initialState,

  on(PostActions.loadAllPosts, state => ({
    ...state,
  })),
  on(PostActions.loadAllPostsSuccess,  (state,{ posts }) => ({
    ...state,
    posts
  })),
  on(PostActions.loadAllPostsFailure,  (state, {error}) => ({
    ...state,
    error
  })),
);
