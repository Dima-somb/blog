import {createAction, props} from "@ngrx/store";
import {Post} from "../../services/posts.service";


const LOAD_ALL_POSTS = '[Posts] loadAllPosts';
const LOAD_ALL_POSTS_SUCCESS = '[Posts] loadAllPostsSuccess';
const LOAD_ALL_POSTS_FAILURE = '[Posts] loadAllPostsFailure';



export const loadAllPosts = createAction(
  LOAD_ALL_POSTS
);

export const loadAllPostsSuccess = createAction(
  LOAD_ALL_POSTS_SUCCESS ,
  props<{posts: Post[]}>()
);

export const loadAllPostsFailure = createAction(
  LOAD_ALL_POSTS_FAILURE,
  props<{error: string}>()
);
