import {createAction, props} from "@ngrx/store";
import {Post} from "../../services/posts.service";


const LOAD_ALL_POSTS = '[Posts] loadAllPosts';
const LOAD_ALL_POSTS_SUCCESS = '[Posts] loadAllPostsSuccess';
const LOAD_ALL_POSTS_FAILURE = '[Posts] loadAllPostsFailure';

const LOAD_POST_BY_ID = '[Post] load post by ID';
const LOAD_POST_BY_ID_SUCCESS = '[Post] load post by ID success';
const LOAD_POST_BY_ID_FAILURE = '[Post] load post by ID failure';


const LOAD_ALL_CATEGORIES = '[Categories] load all categories';
const LOAD_ALL_CATEGORIES_SUCCESS = '[Categories] load all categories success';
const LOAD_ALL_CATEGORIES_FAILURE = '[Categories] load all categories failure';



export const loadAllPosts = createAction(
  LOAD_ALL_POSTS,
);

export const loadAllPostsSuccess = createAction(
  LOAD_ALL_POSTS_SUCCESS ,
  props<{posts: Post[]}>()
);

export const loadAllPostsFailure = createAction(
  LOAD_ALL_POSTS_FAILURE,
  props<{error: string}>()
);

export const loadPostByID = createAction(
  LOAD_POST_BY_ID,
  props<{id: string | null}>()
);

export const loadPostByIDSuccess = createAction(
  LOAD_POST_BY_ID_SUCCESS,
  props<{post: Post}>()
);

export const loadPostByIDFailure = createAction(
  LOAD_POST_BY_ID_FAILURE,
  props<{error: string}>()
);

export const loadAllCategories = createAction(
  LOAD_ALL_CATEGORIES,
);

export const loadAllCategoriesSuccess = createAction(
  LOAD_ALL_CATEGORIES_SUCCESS,
  props<{categories: any}>()
);

export const loadAllCategoriesFailure = createAction(
  LOAD_ALL_CATEGORIES_FAILURE,
  props<{error: string}>()
);
