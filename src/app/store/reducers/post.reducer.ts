import {createReducer, on} from "@ngrx/store";
import {PostActions} from "../action-types";
import {Category, Post} from "../../models/models";
import {resetPostsState} from "../actions/post-actions";

export interface PostState {
  posts: Post[];
  categories: Category[] | null;
  selectedPost: Post | null;
  error: string | null,
  isFetching: boolean;
}

export const initialState: PostState = {
  posts: [],
  selectedPost: null,
  categories: null,
  error: null,
  isFetching: false,
}

export const postReducer = createReducer(
  initialState,

  //GET POSTS
  on(PostActions.loadAllPosts, state => ({
    ...state,
  })),
  on(PostActions.loadAllPostsSuccess,  (state,{ posts }) => ({
    ...state,
    posts,
    isFetching: true
  })),
  on(PostActions.loadAllPostsFailure,  (state, { error }) => ({
    ...state,
    error
  })),
  on(PostActions.resetPostsState, state => ({ ...state, posts: initialState.posts })),

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


  //GET Categories
  on(PostActions.loadAllCategories, state => ({
    ...state,
  })),
  on(PostActions.loadAllCategoriesSuccess,  (state,{ categories }) => ({
    ...state,
    categories,
    isFetching: true
  })),
  on(PostActions.loadAllCategoriesFailure,  (state, { error }) => ({
    ...state,
    error
  })),
);
