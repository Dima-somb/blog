import {createFeatureSelector, createSelector} from "@ngrx/store";
import {PostState} from "../reducers/post.reducer";


const selectPostsState = createFeatureSelector<PostState>('posts');

export const selectPostsStore = createSelector(selectPostsState, state => state.posts);

export const selectPostByIdStore = createSelector(selectPostsState, state => state.selectedPost);


