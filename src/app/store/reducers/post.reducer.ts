import {Post} from "../../services/posts.service";
import {createReducer} from "@ngrx/store";

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

  on()
);
